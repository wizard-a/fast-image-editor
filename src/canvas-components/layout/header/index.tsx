import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import { downloadURI } from '@/utils/util';
import styles from './header.less';

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = (props) => {
  const { stageRef } = useModel(canvasModel);

  const download = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 2 });
    console.log('dataURL', dataURL);
    downloadURI(dataURL, '画布图像.png');
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>图片编辑器</div>
      <div className={styles.right}>
        <Button type="primary" onClick={download}>
          下载
        </Button>
      </div>
    </div>
  );
};

export default Header;
