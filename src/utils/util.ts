import type { DatModelItem, LocationItem } from '@/typing';
import { ShapePanelEnum } from '@/enum';
import Konva from 'konva';
import { Shape, Group } from 'konva/lib/Shape';

export const uuid = () => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
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
  return num1.toFixed(3) == num2.toFixed(3);
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

// export const getStageDataByZoom = (width: number, height: number, scale: number) => {

//   let newScale = scale;
//     if (type === 'zoomIn') {
//       newScale = oldScale + 0.1;
//     } else {
//       newScale = oldScale - 0.1;
//     }
//     console.log('oldScale->', oldScale);
//     if (newScale <= 0.3 || newScale >= 1.8) {
//       return;
//     }
//     const newWidth = width * newScale;
//     const newHeight = height * newScale;

//   const newWidth = width * newScale;
//   const newHeight = height * newScale;

//   return { width: newWidth, height: newHeight, scale: newScale}
// }
