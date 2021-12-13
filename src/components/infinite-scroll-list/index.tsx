import React, { FC, useEffect, useRef, useImperativeHandle } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useImmer } from 'use-immer';
import classnames from 'classnames';
import type {
  PaginationParams,
  IInfiniteScrollListResponseData,
} from '@/typing';

import styles from './index.less';

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
  renderItem: (item: Record<string, any>) => React.ReactNode;
  children: React.ReactNode;
}

const InfiniteScrollList = React.forwardRef(
  (props: IInfiniteScrollListProps, ref) => {
    const { request, renderItem, style, className } = props;

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
        style={{
          height: 500,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={state.data.length}
          next={loadMoreData}
          hasMore={state.hasMore}
          loader={state.hasMore ? 'loader...' : ''}
          endMessage={'已经加载到底了！'}
          scrollableTarget="scrollableDiv"
        >
          <div style={style} className={classNames}>
            {state.data.map((item: any) => {
              return renderItem(item);
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  },
);

export default InfiniteScrollList;
