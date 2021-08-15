import { useState, useCallback } from 'react';
import { ShapePanelEnum } from '@/enum';
import { DatModelItem } from '@/typing';
import Konva from 'konva';

const CanvasModel = ({ get, set }: any) => ({
  shapePanelType: ShapePanelEnum.ShapePanel, // 用枚举代替
  selectNode: null,
  editNode: null,
  stageRef: null,
  layerRef: null,
  canvasRef: null,
  bgRef: null, // 背景实例对象
  stageData: {
    width: 1200,
    height: 700,
    scale: 1,
  },
  // changeIsAnalysis(currIsAnalysis: boolean) {
  //   now({ isAnalysis: currIsAnalysis });
  // },
  changeCanvas: (currCanvasModel: any) => {
    set((state: any) => {
      return Object.assign(state, currCanvasModel);
    });
  },
});

export default CanvasModel;
