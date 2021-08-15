import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
} from 'react';
import { Stage, Layer, Rect, Text, Transformer } from 'react-konva';
import { useModel } from 'umi';
import type { DataModel, DatModelItem } from '@/typing';
import { useTimeout } from 'ahooks';
import Konva from 'konva';

export interface BaseProps {
  [x: string]: any;
}
const TextMy: FC<BaseProps> = (props) => {
  const { canvas, changeCanvas } = useModel('useCanvasModel', (model) => ({
    canvas: model.canvas,
    changeCanvas: model.changeCanvas,
  }));

  const { changeCanvasModelDataItem } = useModel('useCanvasDataModel');
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  const isSelected = props.id === canvas?.selectNode?.id;

  console.log('isSelected', isSelected, props, canvas?.selectNode?.id, canvas);
  const onSelect = () => {
    changeCanvas({
      selectNode: props,
    });
  };

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }

    return () => {
      console.log('hooks destory');
    };
  }, [isSelected]);

  const handleDoubleClick = () => {
    console.log('handleDoubleClick');
    changeCanvas({
      selectNode: props,
    });
  };
  return (
    <React.Fragment>
      <Text
        // onClick={onSelect}
        // onTap={onSelect}
        onDoubleClick={handleDoubleClick}
        ref={shapeRef}
        {...props}
        // onDoubleClick={handleDoubleClick}
        draggable={isSelected}
        onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
          changeCanvasModelDataItem({
            ...props,
            x: e.target.x(),
            y: e.target.y(),
          } as DatModelItem);
        }}
        onTransformEnd={(e: Konva.KonvaEventObject<Event>) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          // debugger;
          // console.log('scaleX=>', scaleX, scaleY);
          changeCanvasModelDataItem({
            ...props,
            x: node.x(),
            y: node.y(),
            // fontSize: node.getFontSize() * scaleX,
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          } as DatModelItem);
        }}
      />
      {isSelected && (
        <Transformer
          onClick={() => {
            console.log('dblclick===>');
          }}
          ref={trRef}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default TextMy;
