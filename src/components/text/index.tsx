import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
} from 'react';
import { Stage, Layer, Rect, Text, Transformer } from 'react-konva';
// import { useModel } from 'umi';
import type { DataModel, DatModelItem } from '@/typing';
import { useTimeout } from 'ahooks';
import Konva from 'konva';
import useModel from 'flooks';
import toolbarModel from '../../models1/canvasModel';

export interface BaseProps {
  [x: string]: any;
}
const TextMy: FC<BaseProps> = (props) => {
  // const { canvas, changeCanvas } = useModel('useCanvasModel', (model) => ({
  //   canvas: model.canvas,
  //   changeCanvas: model.changeCanvas,
  // }));
  const { selectNode, shapePanelType } = useModel(toolbarModel, [
    'selectNode',
    'shapePanelType',
  ]);

  console.log('selectNode', selectNode, shapePanelType);
  // const { changeCanvasModelDataItem } = useModel('useCanvasDataModel');
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  return <Text></Text>;
};

export default TextMy;
