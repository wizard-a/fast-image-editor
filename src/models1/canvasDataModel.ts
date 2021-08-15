/**
 * 该Model主要用来实现Canvas数据逻辑
 */
import { useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { ShapePanelEnum } from '@/enum';
import { uuid, getCenterXY } from '@/utils/util';
import { useModel } from 'umi';
import type { DataModel, DatModelItem } from '@/typing';
import canvasModel from './canvasModel';

export type CanvasModel = {
  width: number;
  height: number;
  nodes: DataModel;
};

const initData: DataModel = [
  {
    id: 'bg',
    type: 'color',
    color: 'rgba(142, 127, 214, 1)',
  },
  //  {
  //    id: '1',
  //    type: 'text',
  //    text: 'ss11231231',
  //    fontSize: 22,
  //    fill: '#000',
  //  },
  //  {
  //    x: 150,
  //    y: 150,
  //    id: '3',
  //    type: 'text',
  //    text: 'abc',
  //    // fontSize: 22,
  //    fill: '#000',
  //  },
  {
    x: 150,
    y: 150,
    id: '5',
    type: 'text-input',
    text: '双击编辑文字',
    fontSize: 50,
    fill: '#000',
    width: 300,
    //  height:50
  },
  {
    x: 200,
    y: 200,
    id: '6',
    type: 'image',
    url: 'https://konvajs.org/assets/darth-vader.jpg',
  },
];

const canvasDataModel = ({ get, set }: any) => ({
  width: 1200,
  height: 700,
  nodes: initData,
  changeCanvasModel: (currCanvasModel: any) => {
    set(currCanvasModel);
  },
  changeCanvasModelDataItem: (currDataModelItem: DatModelItem) => {
    // console.log('currDataModelItem=>', currDataModelItem);

    set((state: any) => {
      let index = state.nodes.findIndex(
        (item: DatModelItem) => item.id === currDataModelItem.id,
      );
      state.nodes[index] = currDataModelItem;
      return {
        nodes: [...state.nodes],
      };
    });
  },
  addNode: (node: DatModelItem, nodeWidth: number, nodeHeight: number) => {
    const { width, height } = get();
    const { changeCanvas } = get(canvasModel);
    const [x, y] = getCenterXY(width, height, nodeWidth, nodeHeight);
    node.x = x;
    node.y = y;
    // debugger;
    set((state: any) => {
      return {
        nodes: [...state.nodes, node],
      };
    });

    changeCanvas({
      selectNode: node,
    });
  },
  addText: () => {
    const { addNode } = get();
    const textWidth = 360;
    const textHeight = 60;

    const currTextDateItem: DatModelItem = {
      x: 0,
      y: 0,
      id: uuid(),
      fontSize: 60,
      type: 'text-input',
      text: '双击编辑文字',
      fill: '#000',
      width: textWidth,
    };
    addNode(currTextDateItem, textWidth, textHeight);
  },
  addImage: (url: string) => {
    const { addNode } = get();
    const textWidth = 400;
    const textHeight = 200;
    const currTextDateItem: DatModelItem = {
      id: uuid(),
      // x: 0,
      // y: 0,
      type: 'image',
      url,
    };
    addNode(currTextDateItem, textWidth, textHeight);
  },
  removeNode: (id: string) => {
    set((state: any) => {
      let newNodes = state.nodes.filter((item: DatModelItem) => item.id !== id);
      return {
        nodes: [...newNodes],
      };
    });
  },
  copyNode: (item: DatModelItem) => {
    const { changeCanvas } = get(canvasModel);
    item.id = uuid();
    item.x += 20;
    item.y += 20;
    set((state: any) => {
      return {
        nodes: [...state.nodes, item],
      };
    });
    changeCanvas({
      selectNode: item,
    });
  },
});

export default canvasDataModel;
