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
import type { DataModel, DatModelItem } from '@/typing';
import { useTimeout } from 'ahooks';
import { useDebounceFn } from 'ahooks';
import Konva from 'konva';
import useModel from 'flooks';
import { isEqual } from '@/utils/util';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';

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

const TransformerWrapper = (Component: FC<BaseProps>) => {
  const WrapperComponent: FC<BaseProps> = (props) => {
    const { selectNode, shapePanelType, changeCanvas, editNode } =
      useModel(canvasModel);
    const { changeCanvasModelDataItem } = useModel(canvasDataModel);

    const shapeRef = React.useRef<any>();
    const trRef = React.useRef<any>();
    const currScale = React.useRef<any>();

    const isSelected = props.id === selectNode?.id && props.id !== editNode?.id;

    // console.log(
    //   'isSelected',
    //   isSelected,
    //   props,
    //   selectNode?.id
    // );

    const { run } = useDebounceFn(
      (e) => {
        console.log('onSelect=>执行了');
        // 阻止事件冒泡
        e.cancelBubble = true;

        changeCanvas({
          selectNode: props,
        });
      },
      { wait: 300, leading: true, trailing: false },
    );

    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.node = shapeRef.current;
        trRef.current.getLayer().batchDraw();

        currScale.current = {
          scaleX: shapeRef.current.scaleX(),
          scaleY: shapeRef.current.scaleY(),
        };
      }

      return () => {
        console.log('hooks destory');
      };
    }, [isSelected]);

    const onTransform = () => {
      if (props.type !== 'text-input') {
        //只有text-input处理
        return;
      }

      const node = shapeRef.current;
      // console.log('onTransform=>', node)
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
        scaleX: 1,
      });
      // changeCanvasModelDataItem(currItem as DatModelItem);
    };

    return (
      <React.Fragment>
        <Component
          onClick={run}
          // onTap={run}
          ref={shapeRef}
          {...props}
          isSelected={isSelected}
          draggable={isSelected}
          onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
            changeCanvasModelDataItem({
              ...props,
              x: e.target.x(),
              y: e.target.y(),
            } as DatModelItem);
          }}
          onTransform={onTransform}
          onTransformEnd={(e: Konva.KonvaEventObject<Event>) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // console.log()
            // debugger;
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            // console.log('scaleX=>', scaleX, scaleY);
            const currItem: any = {
              ...props,
              x: node.x(),
              y: node.y(),
              scaleX: 1,
              width: Math.max(5, node.width() * scaleX),
              // height: Math.max(node.height() * scaleY),
              rotation: node.rotation(),
              skewX: node.skewX(),
              skewY: node.skewY(),
            };
            if (props.fontSize) {
              currItem.fontSize = props.fontSize * scaleY;
            }
            changeCanvasModelDataItem(currItem as DatModelItem);
          }}
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
