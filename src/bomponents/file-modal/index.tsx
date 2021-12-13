import React, { FC, useRef } from 'react';
import { Modal, Button, Tabs, List } from 'antd';
import { useImmer } from 'use-immer';
import ModalViewUtils from '../uitls/modelViewUtils';
import { InfiniteScrollList } from '@/components';
import request from '@/utils/request';
import { getPage } from '@/services/photo';
import Upload from '../upload/index';

import type { PaginationParams } from '@/typing';
import type { InfiniteScrollListRef } from '@/components/infinite-scroll-list';
import styles from './index.less';

const { TabPane } = Tabs;
export interface IModalViewProps extends IViewProps {
  title?: string;
  onCancel?: () => void;
}

// view 组件的具体逻辑
const ModalView: FC<IModalViewProps> = (props) => {
  // const { title, onCancel, ...otherProps } = props;

  const ref = React.useRef<InfiniteScrollListRef>();
  const requestPhotoList = async (params: PaginationParams) => {
    return await getPage(params.pageIndex, 20, 2);
  };

  const onUploadSuccess = () => {
    console.log('upload success');
    ref.current?.reload();
  };

  return (
    <div>
      <Tabs tabPosition="left">
        <TabPane tab="个人空间" key="1">
          <Upload onUploadSuccess={onUploadSuccess} />
          <InfiniteScrollList
            ref={ref}
            request={requestPhotoList}
            renderItem={(item) => {
              return (
                <img className={styles.img} key={item.path} src={item.path} />
              );
            }}
          ></InfiniteScrollList>
        </TabPane>
        <TabPane tab="系统空间" key="2">
          Content of Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

// 实例化工具类，传入对用的组件
export default new ModalViewUtils(ModalView);
