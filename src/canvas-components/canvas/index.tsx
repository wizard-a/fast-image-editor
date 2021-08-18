import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import TransformerWrapper from '../transformer-wrapper';
import { TextInput, ContextMenu, Image, Toolbar } from '@/components';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useClickAway, useSize } from 'ahooks';
import { Spin } from 'antd';
import type { DatModelItem, BgModel, TextModel } from '@/typing';
import styles from './canvas.less';

export interface ICanvasProps {}

const TransformerTextInput = TransformerWrapper(TextInput);
const TransformerText = TransformerWrapper(Text);
const TransformerImage = TransformerWrapper(Image);
// const TransformerHtml2 = TransformerWrapper(Group);

const Canvas: FC<ICanvasProps> = (props) => {
  // const { stageRef, stageData, changeCanvas } = useModel(canvasModel);
  const { width, height, nodes } = useModel(canvasDataModel);
  const { changeCanvas, selectNode, stageData, loading } =
    useModel(canvasModel);
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const bgRef = useRef<Konva.Rect>(null);
  const size = useSize(ref);

  // window.stageRef = stageRef;
  // window.layerRef = layerRef;
  useEffect(() => {
    // changeCanvas({
    //   stageRef,
    //   layerRef,
    //   bgRef: bgRef,
    //   canvasRef: ref,
    //   // stageData: {
    //   //   ...stageData,
    //   //   // scale: Math.min(scaleX, scaleY),
    //   // }
    // });
    // console.log('ref?.current', ref?.current, loading)
    if (ref.current && !loading) {
      const scaleX = (ref.current.offsetHeight - 120) / stageData.height;
      const scaleY = (ref.current.offsetWidth - 120) / stageData.width;
      let scale = Math.min(scaleX, scaleY);
      if (scale > 1) scale = 1;
      // console.log('nodes=>', nodes[0])
      changeCanvas({
        stageRef,
        layerRef,
        bgRef: bgRef,
        canvasRef: ref,
        selectNode: nodes[0],
        editNode: null,
        stageData: {
          ...stageData,
          width: width * scale,
          height: height * scale,
          scale,
        },
      });
      setTimeout(() => {
        changeCanvasPanel();
      }, 0);
    }
  }, []);

  useEffect(() => {
    // canvasRef
    if (ref.current) {
      const left = (ref.current.scrollWidth - ref.current.offsetWidth) / 2;
      const top = (ref.current.scrollHeight - ref.current.offsetHeight) / 2;
      // console.log('top', top, left)
      ref.current.scrollLeft = left;
      ref.current.scrollTop = top;
    }
  }, [stageData.scale, size]);

  const changeCanvasPanel = () => {
    changeCanvas({
      selectNode: nodes[0],
      editNode: null,
    });
  };

  // useClickAway(() => {
  //   console.log('=====>')
  //   changeCanvasPanel();
  // }, ref);

  const getJsxItem = (item: DatModelItem) => {
    switch (item.type) {
      case 'color':
        const bgModel = item as BgModel;
        return (
          <Rect
            ref={bgRef}
            key={item.id}
            width={width}
            height={height}
            fill={bgModel.color}
            shadowBlur={10}
          />
        );
      case 'bg-image':
        return (
          <Image
            ref={bgRef}
            key={item.id}
            {...item}
            width={width}
            height={height}
          />
        );
      case 'text':
        const textModel = item as TextModel;
        // console.log('textModel', textModel)
        return <TransformerText key={item.id} draggable {...textModel} />;

      case 'text-input':
        const textInputModel = item as TextModel;
        // console.log('textInputModel', textInputModel)
        return (
          <TransformerTextInput
            changeCanvasPanel={changeCanvasPanel}
            key={item.id}
            draggable
            {...textInputModel}
          />
        );

      case 'image':
        return <TransformerImage key={item.id} draggable {...item} />;
      default:
        break;
    }
  };

  const getJsx = () => {
    return nodes.map((item: DatModelItem) => {
      return getJsxItem(item);
    });
  };
  const onStageClick = (e: any) => {
    Promise.resolve().then(() => {
      // 事件消息有延时
      if (e?.type !== 'dblclick') {
        // console.log('onStageClick', e?.currentTarget?.nodeType, JSON.stringify(e), e);
        changeCanvasPanel();
      }
    });
  };

  const content = getJsx();
  console.log('content=>', content);
  const top =
    ref.current && stageData.height - (ref.current.clientHeight - 120) > 0
      ? stageData.height - (ref.current.clientHeight - 120)
      : 0;
  const left =
    ref.current && stageData.width - (ref.current.clientWidth - 120) > 0
      ? stageData.width - (ref.current.clientWidth - 120)
      : 0;
  // const top = stageData.height - 835 >= 0 ? stageData.height - 835 : 0;
  // const left = stageData.width - 0 >= 0 ? stageData.width - 0 : 0;
  const style = {
    marginTop: top,
    marginLeft: left,
  };
  //
  // console.log('ref.current.scrollHeight', stageData.height, height, 835, 955, style)
  return (
    <React.Fragment>
      {!loading && <ContextMenu />}
      <div className={styles.canvas} ref={ref}>
        <Toolbar />
        {loading ? (
          <Spin />
        ) : (
          <div style={style}>
            <Stage
              width={stageData.width}
              height={stageData.height}
              scaleX={stageData.scale}
              scaleY={stageData.scale}
              ref={stageRef}
              onClick={onStageClick}
            >
              <Layer ref={layerRef}>{content}</Layer>
            </Stage>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Canvas;
