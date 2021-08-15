import React, { FC, useEffect } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useImmer } from 'use-immer';
import { getScalePercent } from '@/utils/util';
import styles from './toolbar.less';

export interface IToolbarProps {}

const Toolbar: FC<IToolbarProps> = (props) => {
  const { stageRef, stageData, changeCanvas } = useModel(canvasModel);
  const { width, height } = useModel(canvasDataModel);

  const zoom = (type: string) => {
    const stage = stageRef.current;
    var oldScale = stage.scaleX();

    let newScale = stageData.scale;
    if (type === 'zoomIn') {
      newScale = parseFloat(oldScale) + 0.1;
    } else {
      newScale = parseFloat(oldScale) - 0.1;
    }
    console.log('currScale', newScale);
    newScale = parseFloat(parseFloat(newScale).toFixed(1));
    // console.log('oldScale->', oldScale);

    // console.log(oldScale, newScale)
    if (newScale <= 0.3 || newScale >= 1.8) {
      return;
    }
    const newWidth = width * newScale;
    const newHeight = height * newScale;
    changeCanvas({
      stageData: { width: newWidth, height: newHeight, scale: newScale },
    });
  };

  return (
    <div className={styles.toolbar}>
      <Button onClick={() => zoom('zoomIn')}>放大</Button>
      <span>{getScalePercent(stageData.scale)}</span>
      <Button onClick={() => zoom('zoomOut')}>缩小</Button>
    </div>
  );
};

export default Toolbar;
