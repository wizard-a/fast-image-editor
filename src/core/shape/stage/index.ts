import Konva from 'konva';
import type { StageConfig } from 'konva/lib/Stage';
import Canvas from '../../Canvas';
import { isBg } from '../../utils/util';
import {
  rectangleStart,
  rectangleMove,
  rectangleEnd,
  rectangleVisible,
} from '../../utils/group';
import type { DatModelItem, DataModel, ImageModel } from '@/typing';

class Satge {
  stage: Konva.Stage;
  constructor(config: StageConfig, canvas: Canvas) {
    const stage = new Konva.Stage(config);
    this.stage = stage;
    stage.on('click', (event) => {
      // 框选框是否显示
      if (rectangleVisible()) {
        return;
      }
      if (!isBg(event.target.attrs)) {
        const metaPressed =
          event.evt.shiftKey || event.evt.ctrlKey || event.evt.metaKey;
        const isSelected = canvas.tr.nodes().indexOf(event.target) >= 0;
        if (!metaPressed && !isSelected) {
          canvas.tr.nodes([event.target]);
        } else if (metaPressed && isSelected) {
          const nodes = canvas.tr.nodes().slice(); // use slice to have new copy of array
          nodes.splice(nodes.indexOf(event.target), 1);
          canvas.tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          const nodes = canvas.tr.nodes().concat([event.target]);
          canvas.tr.nodes(nodes);
        }
        canvas.layer.add(canvas.tr); // TODO: 可能重复添加
      } else {
        canvas.tr.nodes([]);
      }
    });

    stage.on('mousedown', (e) => {
      if (!isBg(e.target.attrs)) {
        return;
      }
      rectangleStart(stage, canvas);
    });

    stage.on('mousemove', () => {
      rectangleMove(stage, canvas);
    });

    stage.on('mouseup', () => {
      rectangleEnd(stage, canvas);
    });
  }
}

export default Satge;
