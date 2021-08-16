import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';

import styles from './bgPanel.less';

const image1 = [
  '/bg1/1.jpeg',
  '/bg1/2.jpeg',
  '/bg1/3.jpeg',
  '/bg1/4.jpeg',
  '/bg1/5.jpeg',
  '/bg1/6.jpeg',
  '/bg1/7.jpeg',
  '/bg1/8.jpeg',
  '/bg1/9.jpeg',
  '/bg1/10.jpeg',
];
const image2 = [
  '/bg2/1.jpeg',
  '/bg2/2.jpeg',
  '/bg2/3.jpeg',
  '/bg2/4.jpeg',
  '/bg2/5.jpeg',
  '/bg2/6.jpeg',
  '/bg2/7.jpeg',
  '/bg2/8.jpeg',
  '/bg2/9.jpeg',
  '/bg2/10.jpeg',
];

export interface IBGPanelProps {}

const BGPanel: FC<IBGPanelProps> = (props) => {
  const { changeCanvasModelDataItem, nodes, width, height } =
    useModel(canvasDataModel);

  const addBg = (item: string) => {
    const bg = nodes[0];
    changeCanvasModelDataItem({
      id: bg.id,
      width,
      height,
      type: 'bg-image',
      url: item,
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.left}>
        {image1.map((item) => {
          return <img onClick={() => addBg(item)} key={item} src={item} />;
        })}
      </div>
      <div className={styles.right}>
        {image2.map((item) => {
          return <img onClick={() => addBg(item)} key={item} src={item} />;
        })}
      </div>
    </div>
  );
};

export default BGPanel;
