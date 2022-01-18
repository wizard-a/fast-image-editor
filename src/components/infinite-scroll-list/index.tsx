import React, {
  FC,
  useEffect,
  useRef,
  useImperativeHandle,
  ReactElement,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useImmer } from 'use-immer';
import classnames from 'classnames';
import { Spin, Empty } from 'antd';
import type {
  PaginationParams,
  IInfiniteScrollListResponseData,
} from '@/typing';

import styles from './index.less';

const EmptyCpt = () => (
  <Empty
    description="暂无数据"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
);

export type InfiniteScrollListRef = {
  reload: () => void;
};
export interface IInfiniteScrollListProps {
  style?: React.CSSProperties;
  className?: string;
  request: (
    params: PaginationParams,
  ) => Promise<IInfiniteScrollListResponseData>;
  endMessage?: React.ReactNode;
  renderItem?: (item: Record<string, any>) => React.ReactNode;
  children?: React.ReactElement | ((data: Array<any>) => ReactElement);
}

const InfiniteScrollList = React.forwardRef(
  (props: IInfiniteScrollListProps, ref) => {
    const { request, renderItem, style, className, children } = props;

    const pageIndexRef = useRef<number>(1);
    const [state, setState] = useImmer({
      loading: false,
      data: [],
      hasMore: true,
    } as any);

    useImperativeHandle(
      ref,
      () => {
        return {
          reload: () => {
            setState((draft: Record<string, any>) => {
              draft.loading = false;
              draft.data = [];
              draft.hasMore = true;
            });
            pageIndexRef.current = 1;
            loadMoreData();
          },
        };
      },
      [],
    );

    const loadMoreData = async () => {
      if (state.loading) {
        return;
      }
      const res = await request({
        pageIndex: pageIndexRef.current,
      } as PaginationParams);

      pageIndexRef.current += 1;
      // console.log('res=>12312', res);
      setState((draft: any) => {
        const newData = [...state.data, ...res.rows];
        draft.data = newData;
        draft.hasMore = newData.length < res.count;
      });
    };

    useEffect(() => {
      loadMoreData();
    }, []);

    const classNames = classnames(styles.list, className);
    console.log('hasMOre=>', state.hasMore);

    return (
      <div
        id="scrollableDiv"
        className={classNames}
        style={{
          height: '100%',
          overflow: 'auto',
          padding: '0',
          width: '100%',
          // position: 'relative',
          ...style,
        }}
      >
        <InfiniteScroll
          // style={{background: '#ccc'}}
          dataLength={state.data.length}
          next={loadMoreData}
          hasMore={state.hasMore}
          loader={
            state.hasMore ? (
              <div className={styles.loading}>
                <Spin tip="加载中..." size="small" />
              </div>
            ) : (
              ''
            )
          }
          endMessage={
            state.data.length === 0 ? (
              <EmptyCpt />
            ) : (
              <div className={styles.loadingSuccess}>已经加载到底了！</div>
            )
          }
          scrollableTarget="scrollableDiv"
        >
          {typeof children === 'function' ? (
            children(state.data)
          ) : (
            <div>
              {state.data.map((item: any) => {
                return renderItem?.(item);
              })}
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  },
);

export default InfiniteScrollList;
