import Konva from 'konva';
import Canvas from '../../Canvas';
import type { DatModelItem, DataModel, ImageModel } from '@/typing';

class Image {
  constructor(
    shape: ImageModel,
    canvas: Canvas,
    cbk?: (node: Konva.Shape) => void,
  ) {
    Konva.Image.fromURL(shape.url, (darthNode: Konva.Shape) => {
      cbk?.(darthNode);
      darthNode.setAttrs({
        ...shape,
      });

      darthNode.on('dragend', (event: any) => {
        // console.log('event', event);
      });
      canvas.layer.add(darthNode);
      // this.layer.batchDraw();
    });
  }
}

export default Image;
