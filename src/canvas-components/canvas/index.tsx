import React, { FC, useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Rect, Text, Image, Transformer } from 'react-konva';
import Konva from 'konva';
import { Button } from 'antd';
import styles from './canvas.less';
import useImage from 'use-image';
import { useModel } from 'umi';
import TransformerWrapper from '../transformer-wrapper';
import type { DatModelItem, BgModel, TextModel } from '@/typing';

export interface ICanvasProps {}

const LionImage = () => {
  const [image] = useImage(
    'https://img0.baidu.com/it/u=3880341262,3308316348&fm=26&fmt=auto&gp=0.jpg',
  );
  const imageRef = useRef<any>();
  useEffect(() => {
    // debugger;
    // imageRef.current.
    // debugger;
    // imageRef.current.setZIndex(-1)
    console.log('imagesRef', imageRef);
    // imageRef.current
  }, []);

  return <Image ref={imageRef} width={300} height={500} image={image} />;
};

const Canvas: FC<ICanvasProps> = (props) => {
  const { canvasModel } = useModel('useCanvasDataModel', (model) => ({
    canvasModel: model.canvasModel,
  }));

  // const { canvas, changeCanvas } = useModel('useCanvasModel', (model) => ({
  //   canvas: model.canvas,
  //   changeCanvas: model.changeCanvas,
  // }));

  const layerRef = useRef();
  const imageRef = useRef<any>();

  const [flag, setFlag] = useState(false);

  const TransformerText = TransformerWrapper(Text);

  useEffect(() => {
    // debugger;
    // console.log('imagesRef', imageRef);
    // imageRef.current
  }, []);

  // console.log('currCanvas=>', canvas);

  const getJsxItem = (item: DatModelItem) => {
    switch (item.type) {
      case 'color':
        const bgModel = item as BgModel;
        return (
          <Rect
            key={item.id}
            width={canvasModel.width}
            height={canvasModel.height}
            fill={bgModel.color}
            shadowBlur={10}
            setZIndex={1}
          />
        );
      case 'image':
        break;
      case 'text':
        const textModel = item as TextModel;
        // console.log('textModel', textModel)
        return <TransformerText key={item.id} draggable {...textModel} />;

      default:
        break;
    }
  };

  const getJsx = () => {
    return canvasModel.nodes.map((item) => {
      return getJsxItem(item);
    });
  };

  const content = getJsx();
  console.log('content=>', content);
  return (
    <div className={styles.canvas}>
      {/* <div>
        <Button
          onClick={() => {
            setFlag(!flag);
          }}
        >
          切换背景
        </Button>
      </div> */}
      <Stage width={canvasModel.width} height={canvasModel.height}>
        <Layer width={canvasModel.width} height={canvasModel.height}>
          {content}
          {/* {flag ? (
            <LionImage />
          ) : (
            <Rect
              width={canvasModel.width}
              height={canvasModel.height}
              fill="red"
              shadowBlur={10}
            />
          )}
          <Text draggable text="Try click on rect" /> */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
