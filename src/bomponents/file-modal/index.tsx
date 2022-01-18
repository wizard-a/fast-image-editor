import React, { FC, useRef } from 'react';
import { Modal, Button, Tabs, List } from 'antd';
import { useImmer } from 'use-immer';
import ModalViewUtils from '../uitls/modelViewUtils';
import { InfiniteScrollList, WaterfallFlow } from '@/components';
import request from '@/utils/request';
import { getPage } from '@/services/photo';
import Upload from '../upload/index';

import type { PaginationParams } from '@/typing';
import type { InfiniteScrollListRef } from '@/components/infinite-scroll-list';
import type { ImageItem } from '@/components/waterfall-flow';
import styles from './index.less';

const { TabPane } = Tabs;

export interface IModalViewProps extends IViewProps {
  title?: string;
  onCancel?: () => void;
}

// view 组件的具体逻辑
const ModalView: FC<IModalViewProps> = (props) => {
  const ref = React.useRef<InfiniteScrollListRef>();
  const requestPhotoList = async (params: PaginationParams) => {
    return await getPage(params.pageIndex, 35, 2);
  };

  const requestPhotoListSystem = async (params: PaginationParams) => {
    return await getPage(params.pageIndex, 35, 1);
  };

  const onUploadSuccess = () => {
    console.log('upload success');
    ref.current?.reload();
  };

  const onImageClick = (
    e: React.MouseEvent<HTMLImageElement>,
    data: ImageItem,
  ) => {
    console.log('e', e, data);
  };

  return (
    <div>
      <Tabs tabPosition="left">
        <TabPane tab="个人空间" key="1">
          <Upload onUploadSuccess={onUploadSuccess} />
          <InfiniteScrollList
            className={styles.fileList}
            ref={ref}
            style={{
              height: 500,
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
            request={requestPhotoList}
          >
            {(data) => {
              return (
                <WaterfallFlow
                  onClick={onImageClick}
                  size={100}
                  type="horizontal"
                  data={data}
                ></WaterfallFlow>
              );
            }}
          </InfiniteScrollList>
        </TabPane>
        <TabPane tab="系统空间" key="2">
          <InfiniteScrollList
            className={styles.fileList}
            style={{
              height: 532,
              border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
            ref={ref}
            request={requestPhotoListSystem}
          >
            {(data) => {
              return (
                <WaterfallFlow
                  onClick={onImageClick}
                  size={100}
                  type="horizontal"
                  data={data}
                ></WaterfallFlow>
              );
            }}
          </InfiniteScrollList>
        </TabPane>
      </Tabs>
    </div>
  );
};

// 实例化工具类，传入对用的组件
export default new ModalViewUtils(ModalView);
