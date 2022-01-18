import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import { InfiniteScrollList, WaterfallFlow } from '@/components';
import { getPage } from '@/services/photo';

import type { InfiniteScrollListRef } from '@/components/infinite-scroll-list';
import type { ImageItem } from '@/components/waterfall-flow';

import styles from './imagePanel.less';

const image1 = [
  '/image1/1.jpg',
  '/image1/2.jpg',
  '/image1/3.jpg',
  '/image1/4.jpg',
  '/image1/5.jpg',
  '/image1/6.jpg',
  '/image1/7.jpg',
  '/image1/8.jpg',
  '/image1/9.jpg',
  '/image1/10.jpg',
  '/image1/11.jpg',
  '/image1/12.jpg',
  '/image1/13.jpg',
  '/image1/14.png',
  '/image1/15.jpeg',
];
const image2 = [
  '/image2/1.jpg',
  '/image2/2.jpg',
  '/image2/3.jpg',
  '/image2/4.jpg',
  '/image2/5.jpg',
  '/image2/6.jpg',
  '/image2/7.jpg',
  '/image2/8.jpg',
  '/image2/9.jpg',
  '/image2/10.jpg',
  '/image2/11.jpg',
  '/image2/12.jpg',
  ,
  '/image2/13.jpeg',
  '/image2/14.jpeg',
];

export interface IPanelPanelProps {}

const ImagePanel: FC<IPanelPanelProps> = (props) => {
  const { canvasRef } = useModel(canvasModel);
  const ref = React.useRef<InfiniteScrollListRef>();

  const requestPhotoList = async (params: PaginationParams) => {
    return await getPage(params.pageIndex, 35, 2);
  };

  const onImageClick = (
    e: React.MouseEvent<HTMLImageElement>,
    data: ImageItem,
  ) => {
    console.log('e', e, data);
  };

  return (
    <div className={styles.panel}>
      <InfiniteScrollList
        className={styles.fileList}
        // style={{ height: 532 }}
        ref={ref}
        request={requestPhotoList}
      >
        {(data) => {
          return (
            <WaterfallFlow
              onClick={onImageClick}
              size={111}
              type="vertical"
              data={data}
            ></WaterfallFlow>
          );
        }}
      </InfiniteScrollList>
      {/* <div className={styles.left}>
        {image1.map((item) => {
          return (
            <img
              onClick={() => canvasRef?.addImage(item)}
              key={item}
              src={item}
            />
          );
        })}
      </div>
      <div className={styles.right}>
        {image2.map((item) => {
          return (
            <img
              onClick={() => canvasRef?.addImage(item)}
              key={item}
              src={item}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default ImagePanel;
