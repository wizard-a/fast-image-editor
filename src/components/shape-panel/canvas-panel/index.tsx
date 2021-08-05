import React, { FC } from 'react';
import PanelTitle from '../panel-title';
import { Form, Radio } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { useImmer } from 'use-immer';
import type { RadioChangeEvent } from 'antd';
import styles from './canvasPanel.less';

export interface ICanvasPanelProps {}

const canvasOptions = [
  { label: '颜色', value: 'color' },
  { label: '背景', value: 'bg' },
];

const CanvasPanel: FC<ICanvasPanelProps> = (props) => {
  const [form] = Form.useForm();
  const { canvasModel, changeCanvasModel } = useModel(
    'useCanvasModel',
    (model) => ({
      canvasModel: model.canvasModel,
      changeCanvasModel: model.changeCanvasModel,
    }),
  );

  const [state, setState] = useImmer({
    canvasOptionsValue: 'color',
  });
  const onVisibleChange = (visible: boolean) => {
    if (visible) {
      form.setFieldsValue({
        width: canvasModel.width,
        height: canvasModel.height,
      });
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setState((draft) => {
      draft.canvasOptionsValue = e.target.value;
    });
  };

  return (
    <div className={styles.canvasPanel}>
      <PanelTitle>画布</PanelTitle>
      <div className={styles.item}>
        <div className={styles.title}>
          <div>画布尺寸</div>
          <ModalForm<{
            width: number;
            height: number;
          }>
            form={form}
            title="调整画布尺寸"
            layout="horizontal"
            labelCol={{ span: 4, offset: 2 }}
            // initialValues={{
            //   width: canvasModel.width,
            //   height: canvasModel.height
            // }}
            onVisibleChange={onVisibleChange}
            wrapperCol={{ span: 15 }}
            width={400}
            trigger={<div className={styles.edit}>编辑</div>}
            modalProps={{
              onCancel: () => console.log('run'),
            }}
            onFinish={async (values) => {
              changeCanvasModel(values);
              // return Promise.resolve(true);
              return true;
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
          </ModalForm>
        </div>

        <div className={styles.content}>
          <div>宽：{canvasModel.width}px</div>

          <div>高：{canvasModel.height}px</div>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>画布背景</div>
        </div>
        <div>
          <Radio.Group
            options={canvasOptions}
            onChange={onChange}
            value={state.canvasOptionsValue}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel;
