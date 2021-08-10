import { useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { ShapePanelEnum } from '@/enum';
import { DatModelItem } from '@/typing';
import Konva from 'konva';

/**
 * 用于描述画布上的属性
 */
type Canvas = {
  shapePanelType: ShapePanelEnum; // 右侧panel显示的类型
  selectNode: DatModelItem | null;
};

type Transformer = {
  isSelected: boolean;
};

export default function useCanvas() {
  const [canvas, setCanvas] = useImmer<Canvas>({
    shapePanelType: ShapePanelEnum.ShapePanel, // 用枚举代替
    selectNode: null,
  });
  const [transformer, setTransformer] = useImmer<any>({});

  const changeCanvas = useCallback((currCanvasModel) => {
    setCanvas((draft) => {
      Object.assign(draft, currCanvasModel);
    });
  }, []);

  return {
    canvas,
    changeCanvas,
  };
}
