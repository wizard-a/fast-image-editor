import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
} from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
// import { useModel } from 'umi';
import type { DataModel, DatModelItem, LocationItem } from '@/typing';
import { useTimeout } from 'ahooks';
import { useDebounceFn } from 'ahooks';
import Konva from 'konva';
import useModel from 'flooks';
import { isEqual, equal, getShapeChildren, getShape } from '@/utils/util';

import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useImmer } from 'use-immer';

type BaseProps = {
  [key: string]: any;
};

export interface ITransformerWrapperProps {
  Component: FC<BaseProps>;
  // shapeProps: any;
  // isSelected: boolean;
  // onSelect: any;
  // onChange: any;
}

let isA = false;
let currSeItem = null;

const TransformerWrapper = (Component: FC<BaseProps>) => {
  const WrapperComponent: FC<BaseProps> = (props) => {
    const {
      selectNode,
      shapePanelType,
      layerRef,
      changeCanvas,
      editNode,
      addNodeLocation,
      updateNodeLocation,
      nodeLocations,
    } = useModel(canvasModel);
    const { changeCanvasModelDataItem } = useModel(canvasDataModel);

    const [state, setState] = useImmer({
      isDrag: false,
    });

    const shapeRef = React.useRef<any>();
    const trRef = React.useRef<any>();
    const currScale = React.useRef<any>();

    const isSelected =
      props.id === selectNode?.id && props.id !== editNode?.id && !state.isDrag;

    // console.log(
    //   'group=>isSelected',
    //   isSelected,
    //   props,
    //   selectNode?.id
    // );

    const { run } = useDebounceFn(
      (e) => {
        console.log('onSelect=>执行了', e);
        // 阻止事件冒泡
        e.cancelBubble = true;

        changeCanvas({
          selectNode: props,
        });
      },
      { wait: 300, leading: true, trailing: false },
    );

    useEffect(() => {}, []);

    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.node = shapeRef.current;
        trRef.current.getLayer().batchDraw();
      }

      return () => {
        console.log('hooks destory', props.id);
      };
    }, [isSelected]);

    const onTransform = () => {
      // console.log('onTransform=>');
      if (props.type !== 'text-input') {
        //只有text-input处理
        return;
      }
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // const currItem: any = {
      //   ...props,
      //   width: node.width() * scaleX,
      //   height: node.height() * scaleY,
      //   scaleX: 1,
      // };
      // changeCanvasModelDataItem(currItem as DatModelItem);

      if (
        !isEqual(scaleX, currScale.current.scaleX) &&
        !isEqual(scaleY, currScale.current.scaleY)
      ) {
        // 反方向会出错
        // isEqual(scaleX, currScale.current.scaleX)
        // console.log('===============>',scaleX, scaleY, isEqual(scaleX, currScale.current.scaleX), isEqual(scaleY, currScale.current.scaleY))
        return;
      }
      // const currItem: any = {
      //   ...props,
      //   width: node.width() * scaleX,
      //   // height: node.height() * scaleY,
      //   scaleX: 1,
      // };

      const textNode = shapeRef.current;

      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        height: 'auto',
        // height: textNode.height() * textNode.scaleY(),
        scaleX: 1,
        // scaleY: 1,
      });

      // console.log(textNode.height());
      // changeCanvasModelDataItem(currItem as DatModelItem);
    };

    const onDragStart = useCallback(() => {
      setState((draft) => {
        draft.isDrag = true;
      });
    }, [layerRef?.current]);

    const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
      setState((draft) => {
        draft.isDrag = false;
      });
      const currItem = getShape(e.target);
      console.log('gropItem=>', currItem);
      // debugger;
      changeCanvasModelDataItem(currItem as DatModelItem);
    };

    const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
      const node = shapeRef.current;
      const currItem = getShape(node);

      changeCanvasModelDataItem(currItem as DatModelItem);
    };

    // console.log('props=>',  props)
    return (
      <React.Fragment>
        <Component
          onClick={run}
          // onTap={run}
          ref={shapeRef}
          {...props}
          isSelected={isSelected}
          draggable={true}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onTransform={onTransform}
          onTransformEnd={onTransformEnd}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            // scaleX
            enabledAnchors={[
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
              'middle-left',
              'middle-right',
            ]}
            boundBoxFunc={(oldBox, newBox) => {
              // console.log('newBox', newBox);
              // 新盒子和旧盒子的宽度
              // const currItem = {
              //   ...props,
              //   height: newBox.height,
              //   width: newBox.width
              // }
              // changeCanvasModelDataItem(currItem as DatModelItem);
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
          />
        )}
      </React.Fragment>
    );
  };
  return WrapperComponent;
};

export default TransformerWrapper;
