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
  loading: false,
  // changeIsAnalysis(currIsAnalysis: boolean) {
  //   now({ isAnalysis: currIsAnalysis });
  // },
  changeCanvas: (currCanvasModel: any) => {
    set((state: any) => {
      return Object.assign(state, currCanvasModel);
    });
  },
  setTemplate: (data: any) => {
    const { stageData } = get();
    set((state: any) => {
      return {
        selectNode: data?.nodes[0],
        stageData: {
          width: data.width * stageData.scale,
          height: data.height * stageData.scale,
          scale: stageData.scale,
        },
      };
    });
  },
  setLoading: (loading: boolean) => {
    set((state: any) => {
      return { loading: loading };
    });
  },
});

export default CanvasModel;
