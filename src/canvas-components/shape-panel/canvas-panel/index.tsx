import React, { FC } from 'react';
import PanelTitle from '../panel-title';
import { Form, Radio, Button } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import { useImmer } from 'use-immer';
import type { RadioChangeEvent } from 'antd';
import { ColorSelect } from '@/components';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { FileModal } from '@/bomponents';
import styles from './canvasPanel.less';

export interface ICanvasPanelProps {}

const canvasOptions = [
  { label: '颜色', value: 'color' },
  { label: '背景', value: 'bg' },
];

const CanvasPanel: FC<ICanvasPanelProps> = (props) => {
  const [form] = Form.useForm();
  const { width, height, changeCanvasModelDataItem, changeCanvasModel } =
    useModel(canvasDataModel);
  const { selectNode, canvasRef } = useModel(canvasModel);

  const [state, setState] = useImmer({
    canvasOptionsValue: 'color',
  });
  const onVisibleChange = (visible: boolean) => {
    if (visible) {
      // form.setFieldsValue({
      //   width: canvas.width,
      //   height: canvas.height,
      // });
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setState((draft) => {
      draft.canvasOptionsValue = e.target.value;
    });
  };

  const colorChange = (color: string) => {
    // console.log('color=>', color);
    canvasRef?.updateShapeAttrsById(selectNode.id, { fill: color });
    // changeCanvasModelDataItem({
    //   ...selectNode,
    //   color,
    // });
  };

  const changeImage = () => {
    console.log('===');
    FileModal.show({
      title: '选择图片',
      width: 1200,
    });
  };

  console.log('selectNode?.color=>', selectNode?.fill, selectNode);
  return (
    <div className={styles.canvasPanel}>
      <PanelTitle>画布</PanelTitle>
      <div className={styles.item}>
        <div className={styles.title}>
          <div>画布尺寸</div>
          {/* <ModalForm<{
            width: number;
            height: number;
          }>
            form={form}
            title="调整画布尺寸"
            layout="horizontal"
            labelCol={{ span: 4, offset: 2 }}
            initialValues={{
              width: width,
              height: height
            }}
            onVisibleChange={onVisibleChange}
            wrapperCol={{ span: 15 }}
            width={400}
            trigger={<div className={styles.edit}>编辑</div>}
            modalProps={{
              onCancel: () => console.log('run'),
            }}
            onFinish={async (values) => {
              changeCanvasModel(values);
              return Promise.resolve(true);
              // return true;
            }}
          >
            <ProFormDigit
              width="md"
              name="width"
              label="宽"
              placeholder="请输入宽度"
            />
            <ProFormDigit
              width="md"
              name="height"
              label="高"
              placeholder="请输入高度"
            />
          </ModalForm> */}
        </div>

        {/* <div className={styles.content}> */}
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <div>宽：{width}px</div>

          <div>高：{height}px</div>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>画布背景</div>
        </div>

        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <div style={{ width: '100%' }}>
            <Radio.Group
              style={{ marginBottom: '10px' }}
              options={canvasOptions}
              onChange={onChange}
              value={state.canvasOptionsValue}
              optionType="button"
              buttonStyle="solid"
            />
            {state.canvasOptionsValue === 'color' ? (
              <ColorSelect value={selectNode?.fill} onChange={colorChange} />
            ) : (
              <Button
                onClick={changeImage}
                style={{ width: '100%' }}
                type="primary"
              >
                更换图片
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel;
