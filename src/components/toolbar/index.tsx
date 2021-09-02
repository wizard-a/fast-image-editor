import React, { FC, useEffect } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import {
  BorderOuterOutlined,
  AppstoreAddOutlined,
  LineHeightOutlined,
  FileImageOutlined,
  GatewayOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { useImmer } from 'use-immer';
import { getScalePercent } from '@/utils/util';
import styles from './toolbar.less';

export interface IToolbarProps {}

const Toolbar: FC<IToolbarProps> = (props) => {
  const { canvasRef, update } = useModel(canvasModel);
  const { scale } = canvasRef?.canvasAttr || {};
  const zoom = (type: string) => {
    // console.log('canvas=>', scale);
    if (type === 'zoomIn') {
      canvasRef?.zoomIn?.();
    } else {
      canvasRef?.zoomOut?.();
    }
    update();
  };

  return (
    <div className={styles.toolbar}>
      <ZoomOutOutlined
        style={{ color: 'rgba(16, 38, 58, 0.65)', fontSize: 20 }}
        onClick={() => zoom('zoomOut')}
      />
      <span className={styles.text}>{getScalePercent(scale)}</span>
      <ZoomInOutlined
        style={{ color: 'rgba(16, 38, 58, 0.65)', fontSize: 20 }}
        onClick={() => zoom('zoomIn')}
      />
    </div>
  );
};

export default Toolbar;
