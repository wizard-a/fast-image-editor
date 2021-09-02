import Konva from 'konva';
import type { DatModelItem, DataModel, ImageModel } from '@/typing';

class Image {
  constructor(shape: ImageModel, layer: Konva.Layer) {
    Konva.Image.fromURL(shape.url, (darthNode: Konva.Shape) => {
      darthNode.setAttrs({
        ...shape,
      });

      darthNode.on('dragend', (event: any) => {
        // console.log('event', event);
      });
      // console.log('darthNode', darthNode);
      layer.add(darthNode);
      // this.layer.batchDraw();
    });
  }
}

export default Image;
