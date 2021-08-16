import React, { FC, useEffect, useRef, useCallback } from 'react';
import { Menu, Divider } from 'antd';
import Konva from 'Konva';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import styles from './menu.less';

export interface IContextMenuProps {}

const ContextMenu: FC<IContextMenuProps> = ({}) => {
  const ref = useRef<HTMLDivElement>(null);
  const currTargetRef = useRef<Konva.Shape | Konva.Stage>();

  const {
    stageRef,
    layerRef,
    bgRef,
    stageData,
    loading,
    canvasRef,
    selectNode,
  } = useModel(canvasModel);
  const { width, height, removeNode, copyNode } = useModel(canvasDataModel);

  useEffect(() => {
    window.addEventListener('click', () => {
      if (ref.current) {
        ref.current.style.display = 'none';
      }
    });
  }, []);

  useEffect(() => {
    // console.log('stageRef?.current', stageRef?.current, loading)
    if (stageRef?.current) {
      stageRef.current.on(
        'contextmenu',
        function (e: Konva.KonvaEventObject<any>) {
          e.evt.preventDefault();
          if (e.target === stageRef.current || !ref.current) {
            return;
          }
          // console.log('e=>', e.evt.clientX, e.evt.clientY);
          currTargetRef.current = e.target;
          const menuNode: HTMLDivElement = ref.current;
          menuNode.style.display = 'initial';
          var containerRect = stageRef.current
            .container()
            .getBoundingClientRect();

          // console.log('containerRect=>', containerRect, stageRef.current.getPointerPosition());
          menuNode.style.top = `${e?.evt?.clientY + 1}px`;
          menuNode.style.left = `${e?.evt?.clientX + 1}px`;
          // menuNode.style.top =  e.evt.clientX + 'px';
          // menuNode.style.left = e.evt.clientY + 'px';
          // menuNode.style.top =
          //   containerRect.top +
          //   stageRef.current.getPointerPosition().y +
          //   4 +
          //   'px';
          // menuNode.style.left =
          //   containerRect.left +
          //   stageRef.current.getPointerPosition().x +
          //   4 +
          //   'px';
        },
      );
    }
  }, [stageRef]);

  const up = () => {
    // TODO 需要调用两次，具体原因待查
    currTargetRef.current?.moveUp();
    currTargetRef.current?.moveUp();
  };

  const down = () => {
    currTargetRef.current?.moveDown();
  };

  const top = () => {
    currTargetRef.current?.moveToTop();
  };
  const bottom = () => {
    currTargetRef.current?.moveToBottom();
    bgRef.current?.moveToBottom();
  };

  const copy = () => {
    copyNode(JSON.parse(JSON.stringify(selectNode)));
  };

  const del = () => {
    const id = currTargetRef.current?.attrs?.id;
    console.log('currTargetRef.current', currTargetRef.current);
    removeNode(id);
  };

  return (
    <div ref={ref} className={styles.menu}>
      <div>
        <button onClick={up}>上移</button>
        <button onClick={down}>下移</button>
        <button onClick={top}>至于顶层</button>
        <button onClick={bottom}>至于底层</button>
        <Divider style={{ margin: '5px 0' }} />
        <button onClick={copy}>复制</button>
        <button onClick={del}>删除</button>
      </div>
    </div>
  );
};

export default ContextMenu;
