import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Stage, Layer, Rect, Text, Group, Circle } from 'react-konva';
import Konva from 'konva';
import TransformerWrapper from '../transformer-wrapper';
import GroupTransformerWrapper from '../transformer-wrapper/groupTransformer';
import { TextInput, ContextMenu, Image, Toolbar } from '@/components';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useSize } from 'ahooks';
import { Spin } from 'antd';
// import mousetrap from 'mousetrap';
// import { shiftAndClick } from '@/utils/Keyboard';
import { uuid } from '@/utils/util';
import type { DatModelItem, BgModel, TextModel, GroupModel } from '@/typing';
import { removeLines, detectionToLine } from '@/utils/line1';
import styles from './canvas.less';

export interface ICanvasProps {}

const TransformerTextInput = TransformerWrapper(TextInput);
const TransformerText = TransformerWrapper(Text);
const TransformerImage = TransformerWrapper(Image);
const TransformerGroup = GroupTransformerWrapper(Group);
// const TransformerHtml2 = TransformerWrapper(Group);

const Canvas: FC<ICanvasProps> = (props) => {
  const { width, height, nodes, addGroup, removeGroup } =
    useModel(canvasDataModel);
  const {
    changeCanvas,
    selectNode,
    stageData,
    loading,
    updateUndoRedoData,
    undoRedoData,
  } = useModel(canvasModel);
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const bgRef = useRef<Konva.Rect>(null);
  const size = useSize(ref);
  window.stage = stageRef.current;
  const tmpGroup = useRef<Array<Konva.Shape>>([]);
  const tmpGroupKey = useRef<String>(uuid());
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);

  useEffect(() => {
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
    // shiftAndClick();
    // console.log('mousetrap=>', mousetrap);
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
        return <TransformerText key={item.id} draggable {...textModel} />;

      case 'text-input':
        const textInputModel = item as TextModel;
        return (
          <TransformerTextInput
            changeCanvasPanel={changeCanvasPanel}
            key={item.id}
            draggable
            {...textInputModel}
          />
        );

      case 'group':
        const groupModel = item as GroupModel;
        console.log('groupModel=>', groupModel);
        // return (<Group onC key={item.id} draggable {...groupModel}>
        // </Group>)
        return (
          <TransformerGroup key={item.id} draggable {...groupModel}>
            {/* <Rect width={302} height={168} x={0} y={33} fill="green"/>
            <Circle ref={ref1} x={0} y={0} radius={50} fill="blue" />
            <Circle ref={ref2} x={0} y={100} draggable={true} radius={50} fill="blue" /> */}
            {groupModel?.children?.map((item: DatModelItem) => {
              return getJsxItem({
                ...item,
                child: true,
                name: `group-${item.id}`,
              });
            })}
          </TransformerGroup>
        );

      case 'image':
        return <TransformerImage key={item.id} {...item} />;
      default:
        break;
    }
  };

  const getJsx = () => {
    const data = undoRedoData.activeSnapshot || nodes;
    return data.map((item: DatModelItem) => {
      return getJsxItem(item);
    });
  };
  const onStageClick = (e: any) => {
    // tmpGroup.current
    Promise.resolve().then(() => {
      // 事件消息有延时
      if (e?.type !== 'dblclick') {
        // console.log('onStageClick', e?.currentTarget?.nodeType, JSON.stringify(e), e);
        changeCanvasPanel();
        console.log('canvas-click-e=>', e);
        tmpGroup.current = [];
        removeGroup(tmpGroupKey.current);
      }
    });

    // const overlapping = Konva.Util.haveIntersection(ref1.current.getClientRect(), ref2.current.getClientRect());
    // console.log('overlapping=>', overlapping, ref1.current.getClientRect(), ref2.current.getClientRect(),);
  };

  const onDragMove = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (layerRef.current)
      detectionToLine(layerRef.current, e.target as Konva.Shape);
  }, []);

  const onDragEnd = useCallback(() => {
    if (layerRef.current) removeLines(layerRef.current);
  }, []);

  const onStateMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.shiftKey) {
      tmpGroup.current.push({
        ...e.target.attrs,
        child: true,
        draggable: false,
      } as Konva.Shape);
      if (tmpGroup.current.length > 1) {
        addGroup(tmpGroupKey.current, tmpGroup.current);
      }
      // console.log('e.', e, e.evt.shiftKey);
    } else {
      console.log('e', e.target);
      if (tmpGroup.current.length === 0 || tmpGroup.current.length === 1) {
        tmpGroup.current = [
          { ...e.target.attrs, child: true, draggable: false },
        ];
      }
    }
  };

  const content = getJsx();
  // console.log('content=>', content);
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
  console.log('nodes=>', nodes);
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
              onMouseDown={onStateMouseDown}
            >
              <Layer
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                ref={layerRef}
              >
                {content}
              </Layer>
            </Stage>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Canvas;
