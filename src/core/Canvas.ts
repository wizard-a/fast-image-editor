import Konva from 'konva';
import { Image, Stage } from './shape';
import type { DatModelItem, DataModel, BgModel } from '@/typing';
import { removeLines, detectionToLine } from '@/core/utils/line';
import { addRectangle } from './utils/group';

type canvasAttr = {
  width: number;
  height: number;
  scale: number;
};

type EventKey = 'clickNode';
type Callback = (data: DatModelItem) => void;
type Listener = {
  [x: string]: Array<Callback>;
};

class Canvas {
  data: DataModel;
  canvasAttr: canvasAttr;
  stage: Konva.Stage;
  layer: Konva.Layer;
  tr: Konva.Transformer;
  listener: Listener;
  constructor(id: string, width: number, height: number) {
    this.data = [];
    this.listener = {};
    this.canvasAttr = {
      width,
      height,
      scale: 1,
    };

    this.stage = new Stage(
      {
        container: id,
        width: width,
        height: height,
      },
      this,
    ).stage;

    this.tr = new Konva.Transformer();
    this.stage.on('click', (event) => {
      const modelItem = event.target.attrs as any;
      this.emit('clickNode', modelItem);
    });

    this.layer = new Konva.Layer({});

    // 辅助线
    this.layer.on('dragmove', (e) => {
      detectionToLine(this.layer, e.target as Konva.Shape);
    });
    this.layer.on('dragend', () => {
      removeLines(this.layer);
    });

    // 框选矩形
    // addRectangle(this.layer);

    this.stage.add(this.layer);
  }

  /**
   * 初始化数据
   */
  init(data: DataModel): void {
    // this.layer.destroyChildren();
    this.data = data;
    this._renderShape(data);
  }

  /**
   * 添加一个图形
   * @param item
   */
  add(item: DatModelItem): void {
    this.data.push(item);
    this._renderItemShape(item);
  }

  private _renderShape(data: DataModel): void {
    data.forEach((item) => {
      this._renderItemShape(item);
    });
    // this.layer.draw();
  }

  private _renderItemShape(shape: DatModelItem): void {
    switch (shape.type) {
      case 'color':
        const color = new Konva.Rect({
          ...shape,
          width: this.canvasAttr.width,
          height: this.canvasAttr.height,
        });
        // console.log('color=>', color, shape)
        this.layer.add(color);
        return;

      case 'text-input':
        return;
      case 'image':
        const imageShape = shape as BgModel;
        new Image(imageShape, this.layer);
        // Konva.Image.fromURL(imageShape.url, (darthNode: any) => {
        //   darthNode.setAttrs({
        //     ...imageShape
        //   });
        //   console.log('darthNode', darthNode);
        //   this.layer.add(darthNode);
        //   // this.layer.batchDraw();
        // });

        return;

      default:
        break;
    }
  }

  redo(): void {}

  undo(): void {}

  updateCanvasAttr(scale: number): void {
    // const newCanvasAttr = Object.assign(this.canvasAttr, attr);
    const { width, height } = this.canvasAttr;
    // console.log('newCanvasAttr', newCanvasAttr);
    const newWidth = width * scale;
    const newHeight = height * scale;
    const canvasAttr = {
      width: width,
      height: height,
      scale: scale,
    };
    this.canvasAttr = canvasAttr;
    this.stage.setAttrs({
      width: newWidth,
      height: newHeight,
      scaleX: scale,
      scaleY: scale,
    });
    // this.layer.draw();
  }

  /**
   * 根据id修改图形的属性
   * @param id
   * @param item
   */
  updateShapeAttrsById(id: string, item: DatModelItem): void {
    // console.log('item', item);
    const currItem = this.layer.find(`#${id}`);
    if (currItem.length > 0) {
      //  currItem[0].attrs
      currItem[0].setAttrs(item);
    }
    // console.log('currItem=>', currItem);
  }

  on(type: EventKey, cbk: (item: DatModelItem) => void): void {
    if (this.listener[type]) {
      this.listener[type].push(cbk);
    } else {
      this.listener[type] = [cbk];
    }
  }

  emit(type: EventKey, modelItem: DatModelItem): void {
    this.listener[type]?.forEach((cbk) => {
      cbk?.(modelItem);
    });
  }

  private zoom(type: 'zoomIn' | 'zoomOut'): canvasAttr {
    const { width, height, scale } = this.canvasAttr;
    let oldScale = this.stage.scaleX();
    let newScale = scale;
    if (type === 'zoomIn') {
      console.log('zoomIn');
      newScale = oldScale + 0.1;
    } else {
      console.log('zoomOut');
      newScale = oldScale - 0.1;
    }
    newScale = parseFloat(newScale.toFixed(1));
    if (newScale <= 0.3 || newScale >= 1.8) {
      return this.canvasAttr;
    }
    this.updateCanvasAttr(newScale);
    return this.canvasAttr;
  }

  zoomIn(): canvasAttr {
    return this.zoom('zoomIn');
  }

  zoomOut(): canvasAttr {
    return this.zoom('zoomOut');
  }

  getTemplate() {
    const res = this.layer.toObject();
    // debugger;
    return res.children.map((child: any) => {
      return {
        ...child.attrs,
      };
    });
  }
}

export default Canvas;
