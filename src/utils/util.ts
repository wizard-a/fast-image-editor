import type { DatModelItem, LocationItem } from '@/typing';
import { ShapePanelEnum } from '@/enum';
import Konva from 'konva';
import { Shape, Group } from 'konva/lib/Shape';
import LocalStorage from './local-storage';

export const uuid = () => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
};

export const getToken = () => {
  console.log('getToken=>');
  return `Bearer ${LocalStorage.get('token')}`;
};

export const getCenterXY = (
  canvasWidth: number,
  canvasHeight: number,
  elementWidth: number,
  elementHeight: number,
) => {
  const x = canvasWidth / 2 - elementWidth / 2;
  const y = canvasHeight / 2 - elementHeight / 2;
  return [x, y];
};

export const getShapePanelTypeBySelectNode = (selectNode: DatModelItem) => {
  if (!selectNode) {
    return ShapePanelEnum.ShapePanel;
  }
  if (selectNode.type === 'text-input' || selectNode.type === 'text') {
    return ShapePanelEnum.TextPanel;
  }
  if (selectNode.type === 'image') {
    return ShapePanelEnum.ImagePanel;
  }
  return ShapePanelEnum.ShapePanel;
};

export const getRGBAValue = (color: any) => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export const isEqual = (one: number, two: number) => {
  return two - one >= 0;
};

export const downloadURI = (uri: string, name: string) => {
  let link: any = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link = null;
};

export const getScalePercent = (scale: number) => {
  return parseInt((scale * 100).toString()) + '%';
};

export const equal: any = (num1: number, num2: number) => {
  return num1.toFixed(2) == num2.toFixed(2);
};

export const equalOne: any = (num1: number) => {
  if (num1 <= 1.03 && num1 >= 0.99) {
    return true;
  }

  return false;
};

export const getShapeChildren = (children: Array<Shape>) => {
  return children.map((item) => {
    return {
      ...item.attrs,
      x: item.x(),
      y: item.y(),
    };
  });
};

export const getShape = (shape: Group | Shape) => {
  const currShape: Group | Shape = {
    ...shape.attrs,
    x: shape.x(),
    y: shape.y(),
    rotation: shape.rotation(),
    skewX: shape.skewX(),
    skewY: shape.skewY(),
    scaleX: shape.scaleX(),
    scaleY: shape.scaleY(),
  };

  if (shape.children && shape.children.length > 0) {
    currShape.children = getShapeChildren(shape.children);
  }
  return currShape;
};

/**
 * 一维数组，转换成二维数据
 * @param splitCount 每组的数量
 */
export function splitArray<T>(
  data: Array<T>,
  splitCount: number,
): Array<Array<T>> {
  if (data.length === 0) {
    return [];
  }
  const result = [];
  const group = Math.ceil(data.length / splitCount); // 可以拆分成多少组
  let upGroupIndex = 0;
  for (let i = 0; i < group; i++) {
    const nextGroupIndex = upGroupIndex + splitCount;
    const groupData = data.slice(upGroupIndex, nextGroupIndex);
    result.push(groupData);
    upGroupIndex = nextGroupIndex;
  }
  return result;
}

/**
 * 拆分成group
 * @param data
 * @param groupCount
 */
export function splitGroupArray<T>(
  data: Array<T>,
  groupCount: number,
): Array<Array<T>> {
  if (data.length === 0) {
    return [];
  }
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const currData = data[i];
    const index = i % groupCount;
    if (result[index]) {
      result[index].push(currData);
    } else {
      result[index] = [currData];
    }
  }
  return result;
}
