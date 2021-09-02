import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Stage, Layer, Rect, Text, Group, Circle } from 'react-konva';
import Konva from 'konva';
import TransformerWrapper from '../transformer-wrapper';
import GroupTransformerWrapper from '../transformer-wrapper/groupTransformer';
import { TextInput, ContextMenu, Image, Toolbar } from '@/components';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useSize, useUpdate } from 'ahooks';
import { Spin } from 'antd';
// import mousetrap from 'mousetrap';
// import { shiftAndClick } from '@/utils/Keyboard';
import { uuid } from '@/utils/util';
import type { DatModelItem, BgModel, TextModel, GroupModel } from '@/typing';
import { removeLines, detectionToLine } from '@/core/utils/line1';
import CanvasClass from '@/core/Canvas';

import styles from './canvas.less';
import { render } from 'react-dom';

export interface ICanvasProps {}
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
// const TransformerHtml2 = TransformerWrapper(Group);

const Canvas: FC<ICanvasProps> = (props) => {
  // const { width, height, nodes, addGroup, removeGroup } =
  //   useModel(canvasDataModel);
  const { changeCanvas } = useModel(canvasModel);
  const ref = useRef<HTMLDivElement>(null);
  const refCanvas = useRef<CanvasClass>();
  const size = useSize(ref);
  const update = useUpdate();

  useEffect(() => {
    let canvas = new CanvasClass('container', 1200, 700);
    console.log('canvas', canvas);
    canvas.init(newData as any);
    canvas.on('clickNode', (itemModel) => {
      console.log('itemModel', itemModel);
      changeCanvas({
        selectNode: itemModel,
      });
    });

    window.canvas = canvas;
    refCanvas.current = canvas;

    if (ref.current) {
      const { width, height } = canvas.canvasAttr;
      const scaleX = (ref.current.offsetHeight - 120) / height;
      const scaleY = (ref.current.offsetWidth - 120) / width;
      let scale = Math.min(scaleX, scaleY);
      if (scale > 1) scale = 1;
      console.log('scale=>', scale);
      canvas.updateCanvasAttr(scale);
      // update();

      changeCanvas({
        canvasRef: refCanvas.current,
        update: update,
      });
    }
  }, []);

  useEffect(() => {
    // canvasRef
    if (ref.current) {
      const left = (ref.current.scrollWidth - ref.current.offsetWidth) / 2;
      const top = (ref.current.scrollHeight - ref.current.offsetHeight) / 2;
      // console.log('top', top, left)
      ref.current.scrollLeft = left;
      ref.current.scrollTop = top;
    }
  }, [size, refCanvas.current?.canvasAttr.scale]);

  let style = {};

  if (refCanvas.current && ref.current) {
    const width = refCanvas.current.stage.getWidth();
    const height = refCanvas.current.stage.getHeight();
    const baseTop = height - (ref.current.clientHeight - 120);
    const baseLeft = width - (ref.current.clientWidth - 120);
    const top = baseTop > 0 ? baseTop : 0;
    const left = baseLeft > 0 ? baseLeft : 0;
    style = {
      marginTop: top,
      marginLeft: left,
    };
  }
  console.log('render=>');

  const loading = false;

  return (
    <React.Fragment>
      <div className={styles.canvas} ref={ref}>
        <Toolbar />
        {loading ? (
          <Spin />
        ) : (
          <div style={style}>
            <div id="container"></div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Canvas;
