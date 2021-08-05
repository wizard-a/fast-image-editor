import React, { FC, useCallback } from 'react';
import { useModel } from 'umi';
import { CanvasPanel, TextPanel } from '../../shape-panel';
import { ShapePanelEnum } from '@/enum';
import styles from './slider.less';

export interface IHeaderProps {}

const Slider: FC<IHeaderProps> = (props) => {
  const { canvasModel } = useModel('useCanvasModel', (model) => ({
    canvasModel: model.canvasModel,
  }));

  const getPanelJsx = useCallback(() => {
    switch (canvasModel.shapePanelType) {
      case ShapePanelEnum.ShapePanel:
        return <CanvasPanel />;
      case ShapePanelEnum.TextPanel:
        return <TextPanel />;
      default:
        break;
    }
  }, [canvasModel.shapePanelType]);

  return <div className={styles.slider}>{getPanelJsx()}</div>;
};

export default Slider;
