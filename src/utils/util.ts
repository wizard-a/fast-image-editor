import type { DatModelItem } from '@/typing';
import { ShapePanelEnum } from '@/enum';

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
