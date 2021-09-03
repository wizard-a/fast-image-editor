import canvas from '@/canvas-components/canvas';
import Konva from 'konva';
import Canvas from '../Canvas';
import { isBg } from './util';

let x1: number, y1: number, x2: number, y2: number;

let selectionRectangle: Konva.Rect;

export const rectangleVisible = () => {
  return selectionRectangle && selectionRectangle.visible();
};

export const addRectangle = (layer: Konva.Layer) => {
  selectionRectangle?.destroy();
  selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
  console.log('add', layer);
  layer.add(selectionRectangle);
};

export const rectangleStart = (stage: Konva.Stage, canvas: Canvas) => {
  // console.log('canvas', canvas);
  console.log('rectangleStart=>');
  addRectangle(canvas.layer);
  const position = stage.getPointerPosition();

  if (position) {
    const scale = canvas.canvasAttr.scale;
    let { x, y } = position;

    console.log('position: ', x, y, canvas.canvasAttr.scale);
    x = x / scale;
    y = y / scale;
    x1 = x;
    y1 = y;
    x2 = x;
    y2 = y;
    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
  }
  // layer.add(selectionRectangle);
};

export const rectangleMove = (stage: Konva.Stage, canvas: Canvas) => {
  if (!selectionRectangle) {
    return;
  }
  if (!selectionRectangle.visible()) {
    return;
  }
  // console.log('move1312=>', selectionRectangle)
  const position = stage.getPointerPosition();
  if (position) {
    const scale = canvas.canvasAttr.scale;
    const { x, y } = position;
    x2 = x / scale;
    y2 = y / scale;
    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
  }
};

export const rectangleEnd = (stage: Konva.Stage, canvas: Canvas) => {
  console.log('rectangleEnd=>');
  if (!selectionRectangle) {
    return;
  }
  if (!selectionRectangle.visible()) {
    return;
  }

  setTimeout(() => {
    selectionRectangle.visible(false);
  });

  const shapes = stage.find('.node');
  const box = selectionRectangle.getClientRect();
  const selected = shapes.filter((shape) =>
    Konva.Util.haveIntersection(box, shape.getClientRect()),
  );
  // console.log('selected shape', selected);
  canvas.tr.nodes([...selected]);
  canvas.layer.add(canvas.tr);
};
