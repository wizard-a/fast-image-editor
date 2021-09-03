import Stage from '../shape/stage/index';
import Canvas from '../Canvas';
import { uuid } from '../../utils/util';
import type { DatModelItem, DataModel, ImageModel } from '@/typing';

export const createContextMenu = (
  stage: Stage,
  canvas: Canvas,
): HTMLDivElement => {
  const box = document.createElement('div');
  box.className = 'core-context-menu ';
  box.innerHTML = `<div>
    <button id="context-menu-move-up">上移</button>
    <button id="context-menu-move-down">下移</button>
    <button id="context-menu-move-top">至于顶层</button>
    <button id="context-menu-move-bottom">至于底层</button>
    <div style="height:1px;background:#ccc;margin:5px 0;"></div>
    <button id="context-menu-copy">复制</button>
    <button id="context-menu-del">删除</button>
  </div>
  `;

  document.body.appendChild(box);
  window.addEventListener('click', () => {
    if (box) {
      box.style.display = 'none';
    }
  });

  document
    .getElementById('context-menu-move-up')
    ?.addEventListener('click', () => {
      // console.log('上移', stage.currNode)
      stage.currNode?.moveUp();
    });
  document
    .getElementById('context-menu-move-down')
    ?.addEventListener('click', () => {
      stage.currNode?.moveDown();
    });

  document
    .getElementById('context-menu-move-top')
    ?.addEventListener('click', () => {
      stage.currNode?.moveToTop();
    });

  document
    .getElementById('context-menu-move-bottom')
    ?.addEventListener('click', () => {
      stage.currNode?.moveToBottom();
    });

  // copy

  document
    .getElementById('context-menu-copy')
    ?.addEventListener('click', () => {
      if (stage.currNode) {
        const modelItem = stage.currNode.attrs;
        console.log(modelItem);
        modelItem.id = uuid();
        modelItem.x += 20;
        modelItem.y += 20;
        canvas.copy(modelItem);
      }
    });

  document.getElementById('context-menu-del')?.addEventListener('click', () => {
    console.log('删除');
    canvas.selectBg();
    canvas.tr.nodes([]);
    stage.currNode?.destroy();
  });

  return box;
};
