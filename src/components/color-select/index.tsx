import React, { FC } from 'react';
import { useImmer } from 'use-immer';
import { SketchPicker } from 'react-color';

import styles from './colorSelect.less';

export interface IColorSelectProps {}

const ColorSelect: FC<IColorSelectProps> = (props) => {
  const [state, setState] = useImmer({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  });
  const handleClick = () => {
    setState((draft) => {
      draft.displayColorPicker = !draft.displayColorPicker;
    });
  };

  const handleClose = () => {
    setState((draft) => {
      draft.displayColorPicker = false;
    });
  };

  const handleChange = (color: any) => {
    console.log('color=>', color);
    setState((draft) => {
      draft.color = color.rgb;
    });
  };
  console.log('state=>', state);

  return (
    <div>
      <div className={styles.swatch} onClick={handleClick}>
        <div
          className={styles.color}
          style={{
            background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
          }}
        />
      </div>
      {state.displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={state.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorSelect;
