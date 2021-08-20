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

// const initData: DataModel = [
//   {
//     id: 'bg',
//     type: 'color',
//     color: '#ccc',
//   },
//   //  {
//   //    id: '1',
//   //    type: 'text',
//   //    text: 'ss11231231',
//   //    fontSize: 22,
//   //    fill: '#000',
//   //  },
//   //  {
//   //    x: 150,
//   //    y: 150,
//   //    id: '3',
//   //    type: 'text',
//   //    text: 'abc',
//   //    // fontSize: 22,
//   //    fill: '#000',
//   //  },
//   {
//     draggable: true,
//     x: 422.35063663075414,
//     y: 291.7723796804092,
//     id: '28608db7-7f68-4fb4-bfc9-54522364c617',
//     fontSize: 60,
//     type: 'text-input',
//     text: '双击编辑文字',
//     fill: '#000',
//     width: 360,
//   },
//   // {
//   //   x: 200,
//   //   y: 200,
//   //   id: '6',
//   //   type: 'image',
//   //   url: 'https://konvajs.org/assets/darth-vader.jpg',
//   // },
// ];

const initData: DataModel = [
  {
    id: 'bg',
    type: 'color',
    color: '#F5EDDF',
  },
  {
    name: 'node',
    draggable: true,
    x: 436,
    y: 49.772379680409145,
    id: '28608db7-7f68-4fb4-bfc9-54522364c617',
    fontSize: 60,
    type: 'text-input',
    text: '撤销重做案例',
    fill: '#000',
    width: 360.0000000000001,
    isSelected: true,
    lineHeight: 1,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
    visible: true,
    height: 60.99999999999992,
  },
  {
    name: 'node',
    draggable: true,
    id: '3f0dfc51-5481-49d0-8f3a-8a93dd3e3bfa',
    type: 'image',
    x: 142.42857142857156,
    y: 532.0390814535209,
    isSelected: false,
    width: 174.80503425244814,
    height: 132.10377568933617,
    url: '/image2/1.jpg',
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
  },
  {
    name: 'node',
    draggable: true,
    id: 'b366673e-a7cf-445e-8e52-65ce3ecb7b8b',
    type: 'image',
    url: '/image2/1.jpg',
    x: 142.42857142857156,
    y: 357.7714218418357,
    isSelected: false,
    width: 162.8722198534792,
    height: 123.15416489010939,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
  },
  {
    name: 'node',
    draggable: true,
    id: 'cb340eb4-777e-43a9-ab3d-eebf46df1136',
    type: 'image',
    url: '/image2/14.jpeg',
    x: 142.42857142857156,
    y: 81.90962940621816,
    isSelected: false,
    width: 193.94019696803468,
    height: 146.45514772602604,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
  },
  // {
  //   draggable: true,
  //   id: '1789615c-ef9a-4378-99cf-292c7e5d47b2',
  //   type: 'image',
  //   url: '/image2/1.jpg',
  //   x: 936.2857142857144,
  //   y: 176.19534369193246,
  //   isSelected: true,
  //   width: 240.7681041998711,
  //   height: 181.57607814990322,
  //   rotation: 0,
  //   scaleX: 1,
  //   scaleY: 1,
  //   skewX: 0,
  //   skewY: 0,
  //   offsetX: 0,
  //   offsetY: 0,
  // },
];

const recordPush = (nodes: any, undoRedoData: any, updateUndoRedoData: any) => {
  // const currNodes =  undoRedoData.activeSnapshot || nodes;
  const newNodes = undoRedoData.activeSnapshot || nodes;
  updateUndoRedoData({ type: 'push', data: newNodes });
  return newNodes;
};

const canvasDataModel = ({ get, set }: any) => ({
  width: 1200,
  height: 700,
  nodes: initData,
  changeCanvasModel: (currCanvasModel: any) => {
    set(currCanvasModel);
  },
  changeCanvasModelDataItem: (currDataModelItem: DatModelItem) => {
    const { nodes } = get();
    const { changeCanvas, updateUndoRedoData, undoRedoData } = get(canvasModel);
    changeCanvas({
      selectNode: currDataModelItem,
    });
    const currNodes = undoRedoData.activeSnapshot || nodes;
    updateUndoRedoData({ type: 'push', data: currNodes });
    set((state: any) => {
      let index = currNodes.findIndex(
        (item: DatModelItem) => item.id === currDataModelItem.id,
      );
      currNodes[index] = currDataModelItem;
      return {
        nodes: [...currNodes],
      };
    });
  },
  // operationNodeCount: (node: DatModelItem) => {
  //   const { nodes } = get();
  //   const { updateUndoRedoData, undoRedoData} = get(canvasModel);
  //   const currNodes =  undoRedoData.activeSnapshot || nodes;
  //   updateUndoRedoData({type:'push', data: currNodes});
  //   set((state: any) => {
  //     return {
  //       nodes: [...currNodes, node],
  //     };
  //   });

  // },
  addNode: (node: DatModelItem, nodeWidth: number, nodeHeight: number) => {
    const { width, height, nodes } = get();
    const { changeCanvas, undoRedoData, updateUndoRedoData } = get(canvasModel);
    const [x, y] = getCenterXY(width, height, nodeWidth, nodeHeight);
    node.x = x;
    node.y = y;
    // debugger;
    const newNodes = recordPush(nodes, undoRedoData, updateUndoRedoData);
    set((state: any) => {
      return {
        nodes: [...newNodes, node],
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
    const { nodes } = get();
    const { undoRedoData, updateUndoRedoData } = get(canvasModel);
    const currNodes = recordPush(nodes, undoRedoData, updateUndoRedoData);
    set((state: any) => {
      let newNodes = currNodes.filter((item: DatModelItem) => item.id !== id);
      return {
        nodes: [...newNodes],
      };
    });
  },
  copyNode: (item: DatModelItem) => {
    const { nodes } = get();
    const { changeCanvas, undoRedoData, updateUndoRedoData } = get(canvasModel);
    item.id = uuid();
    item.x += 20;
    item.y += 20;
    const newNodes = recordPush(nodes, undoRedoData, updateUndoRedoData);
    set((state: any) => {
      return {
        nodes: [...newNodes, item],
      };
    });
    changeCanvas({
      selectNode: item,
    });
  },
  setTemplate: (data: any) => {
    const { setTemplate } = get(canvasModel);
    set((state: any) => {
      setTemplate(data);
      return {
        width: data.width,
        height: data.height,
        nodes: data.nodes,
      };
    });
  },
});

export default canvasDataModel;
