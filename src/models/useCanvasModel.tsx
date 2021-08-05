import { useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { ShapePanelEnum } from '@/enum';

type CanvasModel = {
  width: number;
  height: number;
  shapePanelType: ShapePanelEnum;
};

export default function useAuthModel() {
  const [canvasModel, setCanvasModel] = useImmer<CanvasModel>({
    width: 300,
    height: 300,
    shapePanelType: ShapePanelEnum.ShapePanel, // 用枚举代替
  });

  // const signin = useCallback((account, password) => {
  //   // signin implementation
  //   // setUser(user from signin API)
  // }, [])

  const changeCanvasModel = useCallback((currCanvasModel) => {
    setCanvasModel((draft) => {
      Object.assign(draft, currCanvasModel);
    });
  }, []);

  return {
    canvasModel,
    changeCanvasModel,
  };
}
