import text from '@/components/text';
import React, { FC, useRef, useState } from 'react';
import { useRouteMatch } from 'umi';

export interface IDemoProps {}

const Demo: FC<IDemoProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>();

  const match = useRouteMatch();
  console.log('match', match);
  const [state, setState] = useState(null);
  const onInput = (e: any) => {
    console.log('value', e.target.value);
    inputRef.current.parentNode.dataset.replicatedValue = e.target.value;
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setState(value);
  };
  return (
    <div>
      <div
        // style={{ width: `${width}px`, height: `${height}px`}}
        className={'grow-wrap'}
      >
        <textarea
          onInput={onInput}
          ref={inputRef}
          // value={state}
          // onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Demo;
