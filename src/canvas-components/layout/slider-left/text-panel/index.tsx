import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';

import styles from './textPanel.less';

export interface ITextPanelProps {}

const TextPanel: FC<ITextPanelProps> = (props) => {
  const { addText } = useModel(canvasDataModel);

  return (
    <div className={styles.panel}>
      <Button
        onClick={addText}
        style={{ width: '100%' }}
        size="large"
        type="primary"
      >
        添加文字
      </Button>
    </div>
  );
};

export default TextPanel;