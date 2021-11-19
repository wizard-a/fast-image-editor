import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';

class ModalViewUtils {
  private div: HTMLDivElement;
  private Component: React.ComponentType<unknown>;
  // 构造函数接收一个组件
  constructor(Component: any) {
    this.div = document.createElement('div');
    // this.modalRef = React.createRef();
    this.Component = Component;
  }

  onCancel = () => {
    this.close();
  };

  show = ({ title, ...otherProps }: ModalProps) => {
    const CurrComponent = this.Component;
    document.body.appendChild(this.div);
    ReactDOM.render(
      <Modal
        onCancel={this.onCancel}
        visible
        footer={null}
        title={title || '预览'}
        destroyOnClose
        getContainer={false}
        {...otherProps}
      >
        <CurrComponent />
      </Modal>,
      this.div,
    );
  };

  close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(this.div);
    if (unmountResult && this.div.parentNode) {
      this.div.parentNode.removeChild(this.div);
    }
  };
}

export default ModalViewUtils;
