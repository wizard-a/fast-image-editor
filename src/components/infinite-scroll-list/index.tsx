import React, { FC, useEffect, useRef, useImperativeHandle } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useImmer } from 'use-immer';
import classnames from 'classnames';
import type {
  PaginationParams,
  IInfiniteScrollListResponseData,
} from '@/typing';

import styles from './index.less';

export interface IInfiniteScrollListProps {
  style?: React.CSSProperties;
  className?: string;
  request: (
    params: PaginationParams,
  ) => Promise<IInfiniteScrollListResponseData>;
  endMessage?: React.ReactNode;
  renderItem: (item: Record<string, any>) => React.ReactNode;
}

const InfiniteScrollList = React.forwardRef(
  (props: IInfiniteScrollListProps, ref: any) => {
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
          aa: () => {},
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

      console.log('res=>12312', res);
      setState((draft: any) => {
        const newData = [...state.data, ...res.rows];
        draft.data = newData;
        draft.hasMore = res.count !== newData.length;
      });
    };

    useEffect(() => {
      loadMoreData();
    }, []);

    const classNames = classnames(styles.list, className);

    return (
      <InfiniteScroll
        dataLength={state.data.length}
        next={loadMoreData}
        hasMore={state.hasMore}
        loader={'loader...'}
        endMessage={'加载中...'}
        scrollableTarget="scrollableDiv"
      >
        <div style={style} className={classNames}>
          {state.data.map((item: any) => {
            return renderItem(item);
          })}
        </div>
      </InfiniteScroll>
    );
  },
);

export default InfiniteScrollList;
