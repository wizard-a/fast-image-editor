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

  const { width, height, text, fontSize, fill, onDoubleClick, ...otherProps } =
    props;
  const { editNode, shapePanelType, changeCanvas, stageRef } =
    useModel(canvasModel);
  const { changeCanvasModelDataItem } = useModel(canvasDataModel);

  const inputRef = useRef<HTMLInputElement>();
  const [state, setState] = useImmer({
    isEdit: false,
  });

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
    document.body.appendChild(textarea);

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    // textarea.style.border = '2px solid blue';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    textarea.style.boxSizing = 'content-box';
    textarea.style.wordBreak = 'break-all';
    const rotation = textNode.rotation();
    var transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }

    var px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px)';

    textarea.style.transform = transform;

    // reset height
    textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 'px';

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
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

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener('keydown', function (e) {
      var scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 3 + 'px';
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    // debugger;
    console.log(
      'inputRef.current?.offsetWidth',
      inputRef.current?.scrollWidth,
      inputRef.current?.offsetWidth,
      inputRef.current?.clientWidth,
    );
    // const width = inputRef.current?.offsetWidth + (value.length - text.length) * fontSize;
    // debugger;
    // console.log('width', width);
    changeCanvasModelDataItem({
      ...props,
      text: value,
      // width: inputRef.current?.scrollWidth,
      // height: inputRef.current?.scrollHeight
    });
  };

  const onInput = (e: any) => {
    console.log('value', e.target.value);
    inputRef.current.parentNode.dataset.replicatedValue = e.target.value;
  };

  const isEdit = editNode?.id === props.id;

  // console.log('!state.isEdit', !state.isEdit)
  // console.log('width', width);

  return (
    <Text
      ref={ref}
      onDblClick={onDblClick}
      {...props}
      width={width}
      height={height}
      text={text}
      fontSize={fontSize}
      lineHeight={1}
    />
  );
  return (
    <Group {...props} ref={ref} onDblClick={onDblClick}>
      {!isEdit ? (
        <Text
          width={width}
          height={height}
          text={text}
          fontSize={fontSize}
          lineHeight={1}
          align="center"
          verticalAlign="bottom"
          // verticalAlign='center' align='center'
        />
      ) : (
        <React.Fragment>
          <Rect width={width} height={height} />
          <Html
            transform // should we apply position transform automatically to DOM container, default is true
            groupProps={{ width, height }} // additional properties to the group wrapper, useful for some position offset
            divProps={{
              style: { width: `${width}px`, height: `${height}px` },
              // background: '#ccc',
            }} // additional props for wrapped div elements, useful for styles
          >
            {/* <div>
            <div
              // style={{ width: `${width}px`, height: `${height}px`}}
              className={'grow-wrap'}>
              <textarea
                onInput={onInput}
                ref={inputRef}
                // value={text}
                // rows={1}
                // cols={width}
                // onChange={handleChange}
                // style={{color:fill}}
                // style={{ fontSize, color: fill, padding: 0, border: 'none', outline: 'none', resize: 'none', lineHeight: `${fontSize}px` }}
                >

              </textarea>
            </div>

          </div> */}

            <textarea
              // onClick={handelClick}
              ref={inputRef}
              value={text}
              rows={1}
              cols={width}
              onChange={handleChange}
              style={{
                width,
                height,
                fontSize,
                color: fill,
                padding: 0,
                border: 'none',
                outline: 'none',
                resize: 'none',
                lineHeight: `${fontSize}px`,
                overflowWrap: 'normal',
                overflow: 'hidden',
                wordBreak: 'break-all',
              }}
              placeholder="DOM input from Konva nodes"
            />
          </Html>
        </React.Fragment>
      )}
    </Group>
  );
});

export default TextInput;
