import React, { FC } from 'react';
import { Button, message, Tooltip } from 'antd';
import useModel from 'flooks';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import { downloadURI } from '@/utils/util';
import styles from './header.less';

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = (props) => {
  // const { stageRef, updateUndoRedoData, undoRedoData, canvasRef } =
  //   useModel(canvasModel);
  const { nodes } = useModel(canvasDataModel);
  const { canvasRef } = useModel(canvasModel);

  const download = () => {
    var dataURL = canvasRef.stage.toDataURL({ pixelRatio: 0.5 });
    console.log('dataURL', dataURL);
    downloadURI(dataURL, '画布图像.png');
  };

  const getTemplate = () => {
    const template = canvasRef.getTemplate();
    console.log('节点内容=>', JSON.stringify(template));
    message.success('请在控制台查看JSON');
  };

  const undo = () => {
    // updateUndoRedoData({ type: 'undo' });
  };

  const redo = () => {
    // updateUndoRedoData({ type: 'redo' });
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>图片编辑器</div>
      <div className={styles.center}>
        <Tooltip placement="bottom" title="撤销">
          <Button
            // disabled={
            //   undoRedoData.snapshots.length === 0 || undoRedoData.current === 0
            // }
            style={{ marginRight: 20 }}
            onClick={undo}
            type="primary"
            shape="circle"
            icon={<UndoOutlined />}
          />
          {/* <UndoOutlined style={{fontSize: 24, marginRight: 30, cursor: 'pointer'}} /> */}
        </Tooltip>
        <Tooltip placement="bottom" title="重做">
          <Button
            // disabled={undoRedoData.current === -1}
            onClick={redo}
            type="primary"
            shape="circle"
            icon={<RedoOutlined />}
          />
          {/* <RedoOutlined  onClick={redo} style={{fontSize: 24, cursor: 'pointer'}} /> */}
        </Tooltip>
      </div>
      <div className={styles.right}>
        <Button type="primary" onClick={download}>
          下载
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={getTemplate}
        >
          获取模板内容
        </Button>
      </div>
    </div>
  );
};

export default Header;
