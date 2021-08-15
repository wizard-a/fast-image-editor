import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';

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
];

export interface IPanelPanelProps {}

const ImagePanel: FC<IPanelPanelProps> = (props) => {
  const { addImage } = useModel(canvasDataModel);

  return (
    <div className={styles.panel}>
      <div className={styles.left}>
        {image1.map((item) => {
          return <img onClick={() => addImage(item)} key={item} src={item} />;
        })}
      </div>
      <div className={styles.right}>
        {image2.map((item) => {
          return <img onClick={() => addImage(item)} key={item} src={item} />;
        })}
      </div>
    </div>
  );
};

export default ImagePanel;
