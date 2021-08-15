import React, { FC, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { SketchPicker } from 'react-color';
import { getRGBAValue } from '@/utils/util';
import styles from './colorSelect.less';

export interface IColorSelectProps {
  onChange: (value: string) => void;
  value: string;
}

const ColorSelect: FC<IColorSelectProps> = (props) => {
  const [state, setState] = useImmer({
    displayColorPicker: false,
    color: props.value,
  });

  useEffect(() => {
    if (props.value) {
      setState((draft) => {
        draft.color = props.value;
      });
    }
  }, [props.value]);
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
    const colorRgba = getRGBAValue(color.rgb);
    setState((draft) => {
      draft.color = colorRgba;
    });
    props.onChange(colorRgba);
  };
  // console.log('state=>', state);

  return (
    <div>
      <div className={styles.swatch} onClick={handleClick}>
        <div
          className={styles.color}
          style={{
            background: state.color,
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
