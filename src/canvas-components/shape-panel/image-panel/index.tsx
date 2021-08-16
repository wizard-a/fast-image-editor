import React, { FC } from 'react';
import { Select, Button, Tooltip } from 'antd';
import PanelTitle from '../panel-title';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import styles from './imagePanel.less';

export interface ITextPanelProps {}

const TextPanel: FC<ITextPanelProps> = (props) => {
  const { width, height, changeCanvasModelDataItem, changeCanvasModel } =
    useModel(canvasDataModel);
  const { selectNode, changeCanvas } = useModel(canvasModel);

  return (
    <div className={styles.textPanel}>
      <PanelTitle>画布</PanelTitle>
      <div className={styles.item}>
        <div className={styles.title}>
          <div>背景</div>
        </div>
        <div className={styles.content}>
          <Button style={{ width: '100%' }} type="primary">
            更换图片
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextPanel;
