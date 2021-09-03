import Konva from 'konva';
import type { TransformerConfig } from 'konva/lib/shapes/Transformer';
import Canvas from '../../Canvas';
import { isBg } from '../../utils/util';
import {
  rectangleStart,
  rectangleMove,
  rectangleEnd,
  rectangleVisible,
} from '../../utils/group';
import { createContextMenu } from '../../context-menu';
import type { DatModelItem, DataModel, ImageModel } from '@/typing';

class Transformer {
  transformer: Konva.Transformer;
  tmpNodes: any;
  constructor(config: TransformerConfig, canvas: Canvas) {
    this.transformer = new Konva.Transformer(config);
    // canvas.layer.add(this.transformer);
    const tr = this.transformer;
    tr.on('dragstart', () => {
      tr.hide();
      // this.tmpNodes = tr.nodes();
      // if (this.tmpNodes.length === 1) {
      //   tr.nodes([]);
      // }
    });
    // tr.on('dragmove', () => {
    //   tr.nodes();
    // })
    tr.on('dragend', () => {
      tr.show();
      // if (this.tmpNodes.length === 1) {
      //   tr.nodes(this.tmpNodes);
      //   this.tmpNodes = null;
      // }
    });
  }
}

export default Transformer;
