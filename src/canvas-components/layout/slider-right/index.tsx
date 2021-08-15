import React, { FC, useCallback } from 'react';
import { CanvasPanel, TextPanel } from '../../shape-panel';
import { ShapePanelEnum } from '@/enum';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { getShapePanelTypeBySelectNode } from '@/utils/util';
import styles from './slider.less';

export interface IHeaderProps {}

const Slider: FC<IHeaderProps> = (props) => {
  const { selectNode } = useModel(canvasModel);

  const shapePanelType = getShapePanelTypeBySelectNode(selectNode);
  const getPanelJsx = useCallback(() => {
    switch (shapePanelType) {
      case ShapePanelEnum.ShapePanel:
        return <CanvasPanel />;
      case ShapePanelEnum.TextPanel:
        return <TextPanel />;
      default:
        break;
    }
  }, [shapePanelType]);

  return <div className={styles.slider}>{getPanelJsx()}</div>;
};

export default Slider;
