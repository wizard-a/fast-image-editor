/**
 * 该Model主要用来实现Canvas数据逻辑
 */
import { useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { ShapePanelEnum } from '@/enum';
import { uuid, getCenterXY } from '@/utils/util';
import { useModel } from 'umi';
import type { DataModel, DatModelItem } from '@/typing';

export type CanvasModel = {
  width: number;
  height: number;
  nodes: DataModel;
};

const initData: DataModel = [
  {
    id: 'bg',
    type: 'color',
    color: '#A8D7D7',
  },
  {
    id: '1',
    type: 'text',
    text: 'ss11231231',
    fontSize: 22,
    fill: '#000',
  },
  {
    x: 150,
    y: 150,
    id: '3',
    type: 'text',
    text: 'abc',
    // fontSize: 22,
    fill: '#000',
  },
  {
    x: 150,
    y: 150,
    id: '5',
    type: 'text-input',
    text: '双击编辑文字',
    fontSize: 50,
    fill: '#000',
    width: 300,
    height: 50,
  },
];

export default function useCanvasData() {
  const [canvasModel, setCanvasModel] = useImmer<CanvasModel>({
    width: 1200,
    height: 700,
    nodes: initData,
  });

  const { changeCanvas } = useModel('useCanvasModel');

  const changeCanvasModel = useCallback((currCanvasModel) => {
    setCanvasModel((draft) => {
      Object.assign(draft, currCanvasModel);
    });
  }, []);

  const changeCanvasModelDataItem = (currDataModelItem: DatModelItem) => {
    // console.log('currDataModelItem=>', currDataModelItem);
    setCanvasModel((draft) => {
      let index = draft.nodes.findIndex(
        (item) => item.id === currDataModelItem.id,
      );
      draft.nodes[index] = currDataModelItem;
    });
  };

  const addText = useCallback(() => {
    const textWidth = 360;
    const textHeight = 60;
    const [x, y] = getCenterXY(
      canvasModel.width,
      canvasModel.height,
      textWidth,
      textHeight,
    );
    const currTextDateItem: DatModelItem = {
      x,
      y,
      id: uuid(),
      fontSize: 60,
      type: 'text-input',
      text: '双击编辑文字',
      fill: '#000',
      width: textWidth,
      height: textHeight,
    };
    setCanvasModel((draft) => {
      draft.nodes.push(currTextDateItem);
    });
    changeCanvas({
      selectNode: currTextDateItem,
    });
  }, []);

  return {
    canvasModel,
    changeCanvasModel,
    changeCanvasModelDataItem,
    addText,
  };
}
