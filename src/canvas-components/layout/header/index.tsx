import React, { FC } from 'react';
import { Button, message } from 'antd';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import { downloadURI } from '@/utils/util';
import styles from './header.less';

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = (props) => {
  const { stageRef } = useModel(canvasModel);
  const { nodes } = useModel(canvasDataModel);

  const download = () => {
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 0.5 });
    console.log('dataURL', dataURL);
    downloadURI(dataURL, '画布图像.png');
  };

  const getTemplate = () => {
    console.log('节点内容=>', JSON.stringify(nodes));
    message.success('请在控制台查看JSON');
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>图片编辑器</div>
      <div className={styles.right}>
        <Button type="primary" onClick={download}>
          下载
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={getTemplate}
        >
          获取模板内容
        </Button>
      </div>
    </div>
  );
};

export default Header;
