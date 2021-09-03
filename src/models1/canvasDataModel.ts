/**
 * 该Model主要用来实现Canvas数据逻辑
 */
import { useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { ShapePanelEnum } from '@/enum';
import { uuid, getCenterXY } from '@/utils/util';
import { useModel } from 'umi';
import type { DataModel, DatModelItem } from '@/typing';
import _ from 'lodash';
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
    text: '节点框选功能',
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
  // {
  //   name: 'node',
  //   draggable: true,
  //   id: '3f0dfc51-5481-49d0-8f3a-8a93dd3e3bfa',
  //   type: 'image',
  //   x: 142.42857142857156,
  //   y: 532.0390814535209,
  //   isSelected: false,
  //   width: 174.80503425244814,
  //   height: 132.10377568933617,
  //   url: '/image2/1.jpg',
  //   rotation: 0,
  //   scaleX: 1,
  //   scaleY: 1,
  //   offsetX: 0,
  //   offsetY: 0,
  //   skewX: 0,
  //   skewY: 0,
  // },
  {
    name: 'group',
    draggable: true,
    id: 'b366673e-a7cf-445e-8e52-65ce3ecb7b81',
    type: 'group',
    x: 0,
    y: 0,
    children: [
      {
        name: 'node',
        draggable: false,
        id: '1',
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
        draggable: false,
        id: '2',
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
    ],
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

const newData = [
  {
    id: 'bg',
    type: 'color',
    fill: '#F5EDDF',
  },
  {
    name: 'node',
    draggable: true,
    x: 436,
    y: 49.772379680409145,
    id: '28608db7-7f68-4fb4-bfc9-54522364c617',
    fontSize: 60,
    type: 'text-input',
    text: '节点框选案例',
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
    // height: 60.99999999999992,
  },
  {
    width: 162.8722198534792,
    height: 123.15416489010939,
    name: 'node',
    draggable: true,
    id: '1',
    type: 'image',
    x: 142.42857142857156,
    y: 357.7714218418357,
    isSelected: false,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
    // "child": true,
    url: '/image2/1.jpg',
  },
  {
    width: 193.94019696803468,
    height: 146.45514772602604,
    name: 'node',
    draggable: true,
    id: '2',
    type: 'image',
    x: 142.42857142857156,
    y: 81.90962940621816,
    isSelected: false,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
    // "child": true,
    url: '/image2/14.jpeg',
  },
  {
    width: 193.94019696803468,
    height: 146.45514772602604,
    name: 'node',
    draggable: true,
    id: '3',
    type: 'image',
    x: 342.42857142857156,
    y: 181.90962940621816,
    isSelected: false,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    skewX: 0,
    skewY: 0,
    // "child": true,
    url: '/image2/14.jpeg',
  },
  // {
  //     "draggable": true,
  //     "name": "group",
  //     "id": "b366673e-a7cf-445e-8e52-65ce3ecb7b81",
  //     "type": "group",
  //     "x": -142.61460101867573,
  //     "y": 29.278321955451514,
  //     "isSelected": true,
  //     "rotation": 0,
  //     "scaleX": 1,
  //     "scaleY": 1,
  //     "offsetX": 0,
  //     "offsetY": 0,
  //     "skewX": 0,
  //     "skewY": 0,
  //     "children": [

  //     ]
  // }
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
  nodes: newData || initData,
  changeCanvasModel: (currCanvasModel: any) => {
    set(currCanvasModel);
  },
  changeCanvasModelDataItem: (currDataModelItem: DatModelItem) => {
    const { nodes } = get();
    // window.nodes = nodes;
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
      // console.log('currNodescurrNodescurrNodescurrNodescurrNodes=>', currNodes)

      return {
        nodes: [...currNodes],
      };
    });
  },
  addGroup: (groupKey: string, group: Array<DatModelItem>) => {
    const { changeCanvas, updateUndoRedoData, undoRedoData } = get(canvasModel);

    set((state: any) => {
      console.log('group=>', group);
      _.remove(state.nodes, (n) => {
        const index = group.findIndex((f) => f.id === n.id);
        console.log('index=>', index);
        return index != -1;
      });
      console.log('nodes=>', state.nodes);
      const index = state.nodes.findIndex(
        (f: DatModelItem) => f.id === groupKey,
      );
      let currNode = null;
      if (index !== -1) {
        currNode = { ...state.nodes[index], children: group };
        state.nodes[index] = currNode;
        // currGroup.children = group;
        // state.nodes.push(currGroup);
      } else {
        currNode = {
          id: groupKey,
          type: 'group',
          draggable: true,
          children: group,
        };
        state.nodes.push(currNode);
      }
      changeCanvas({
        selectNode: currNode,
      });

      return {
        nodes: [...state.nodes],
      };
    });
  },
  removeGroup: (groupKey: string) => {
    set((state: any) => {
      const index = state.nodes.findIndex(
        (f: DatModelItem) => f.id === groupKey,
      );
      const currGroup = state.nodes?.[index];
      if (!currGroup) {
        return;
      }
      console.log('remove-group,', currGroup);
      currGroup.children?.forEach((item: any) => {
        item.child = undefined;
        item.draggable = true;
        item.x = item.x + currGroup.x;
        item.y = item.y + currGroup.y;
        item.offsetX = item.width / 2;
        item.offsetY = item.height / 2;
        item.rotation = currGroup.rotation;
        item.skewX = item.skewX + currGroup.skewX;
        item.scaleX = currGroup.scaleX;

        item.skewY = currGroup.skewY;
        item.scaleY = currGroup.scaleY;
        state.nodes.push(item);
      });
      _.remove(state.nodes, (n) => {
        return n.id == groupKey;
      });

      return {
        nodes: [...state.nodes],
      };
    });
  },

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
