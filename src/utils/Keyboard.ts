class Keyboard {}

export const shiftAndClick = () => {
  document.onmousedown = (e: MouseEvent) => {
    // console.log('ddd')
    console.log('e.shiftKey', e);
    if (e.shiftKey) {
      // 鼠标左键按下，同时也按下了shift
    }
  };
  // document.onkeydown = (e: KeyboardEvent) => {
  //   console.log('e', e.keyCode);
  // }
};
