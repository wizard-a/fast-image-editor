import React, { FC, forwardRef, useEffect, useRef } from 'react';
import Konva from 'konva';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image,
  Transformer,
  Group,
} from 'react-konva';
import type { KonvaNodeComponent } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useImmer } from 'use-immer';
import useClickAway from '@/hooks/useClickAway';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import styles from './textInput.less';

export interface ITextInputProps {
  // onClick?: (data: any) => void;
  // onTap?: (data: any) => void;
  [x: string]: any;
}

const TextInput: FC<ITextInputProps> = forwardRef((props, ref: any) => {
  // console.log('props=>', props, ref);

  const {
    width,
    height,
    text,
    fontSize,
    fontStyle,
    fontWeight,
    fill,
    onDoubleClick,
    changeCanvasPanel,
    ...otherProps
  } = props;
  const {
    editNode,
    shapePanelType,
    changeCanvas,
    stageRef,
    stageData,
    selectNode,
  } = useModel(canvasModel);
  const { changeCanvasModelDataItem } = useModel(canvasDataModel);

  // const {} =

  const onDblClick = (e: any) => {
    e.cancelBubble = true;
    changeCanvas({ editNode: props });

    const textNode = ref.current;
    textNode.hide();

    var textPosition = textNode.absolutePosition();

    // then lets find position of stage container on the page:
    var stageBox = stageRef.current.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement('textarea');
    var div = document.createElement('div');
    div.appendChild(textarea);
    document.body.appendChild(div);

    div.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    div.style.height = textNode.height() - textNode.padding() * 2 + 2 + 'px';
    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    div.style.position = 'absolute';
    div.style.top = areaPosition.y + 'px';
    div.style.left = areaPosition.x + 'px';
    // div.style.border = '1px solid #1890ff';
    textarea.style.boxSizing = 'content-box';

    // textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    // textarea.style.height =
    //   textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.width = '100%';
    textarea.style.height = '100%';

    textarea.style.fontSize = textNode.fontSize() + 'px';
    // textarea.style.border = '1px solid blue';
    textarea.style.border = 'none';
    textarea.style.border = '1px solid #1890ff';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.fontWeight = selectNode.fontWeight;
    textarea.style.fontStyle = selectNode.fontStyle;
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    textarea.style.boxSizing = 'content-box';
    textarea.style.wordBreak = 'break-all';
    const rotation = textNode.rotation();
    var transform = `scale(${stageData.scale})`;
    if (rotation) {
      transform += ' rotateZ(' + rotation + 'deg)';
    }

    var px = 0;
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px)';

    textarea.style.transform = transform;

    textarea.focus();

    function removeTextarea() {
      // textarea.parentNode.removeChild(div);
      document.body.removeChild(div);

      window.removeEventListener('click', handleOutsideClick);
      textNode.show();
      // tr.show();
      // textNode.forceUpdate();
      // layer.draw();
    }

    function setTextareaWidth(newWidth: number) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + 'px';
    }

    // textarea.addEventListener('keydown', function (e) {
    //   // hide on enter
    //   // but don't hide on shift + enter
    //   if (e.keyCode === 13 && !e.shiftKey) {
    //     textNode.text(textarea.value);
    //     removeTextarea();
    //   }
    //   // on esc do not set value back to node
    //   if (e.keyCode === 27) {
    //     removeTextarea();
    //   }
    // });

    textarea.addEventListener('keydown', function (e) {
      // var scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width());
      setTimeout(() => {
        div.style.height = textarea.scrollHeight + 'px';
        changeCanvasModelDataItem({
          ...props,
          text: textarea.value,
          width: textNode.width(),
          // height: textarea.scrollHeight,
        });

        // textNode.width(textarea.scrollHeight)
      }, 0);

      // textarea.style.height = 'auto';
      // textarea.style.height = textarea.scrollHeight + fontSize + 'px';
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        changeCanvasPanel();
        textNode.text(textarea.value);
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  };

  // console.log('fontStyle=>', fontStyle, fontWeight, props)
  const currFontStyle = `${fontStyle ? fontStyle + ' ' : ''}${
    fontWeight === 'bold' ? 'bold' : 'normal'
  }`;
  // console.log('props=>', props)
  return (
    <Text
      ref={ref}
      onDblClick={onDblClick}
      {...props}
      // fontStyle={currFontStyle}
      // fontStyle={`${fontStyle} ${fontWeight === 'bold' ? 'bold' : 'normal'}`}
      width={width}
      height={height}
      text={text}
      fontSize={fontSize}
      lineHeight={1}
    />
  );
});

export default TextInput;
