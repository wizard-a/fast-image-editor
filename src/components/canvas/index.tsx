import React, { FC, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import { Button } from 'antd';
import styles from './canvas.less';
import useImage from 'use-image';
import { useModel } from 'umi';

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
  const { canvasModel } = useModel('useCanvasModel', (model) => ({
    canvasModel: model.canvasModel,
  }));

  const layerRef = useRef();
  const imageRef = useRef<any>();

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // debugger;
    // console.log('imagesRef', imageRef);
    // imageRef.current
  }, []);
  return (
    <div className={styles.canvas}>
      <div>
        <Button
          onClick={() => {
            setFlag(!flag);
          }}
        >
          切换背景
        </Button>
      </div>
      <Stage width={canvasModel.width} height={canvasModel.height}>
        <Layer width={canvasModel.width} height={canvasModel.height}>
          {flag ? (
            <LionImage />
          ) : (
            <Rect
              width={canvasModel.width}
              height={canvasModel.height}
              fill="red"
              shadowBlur={10}
            />
          )}
          <Text draggable text="Try click on rect" />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
