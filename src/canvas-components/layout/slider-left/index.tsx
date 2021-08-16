import React, { FC } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import {
  BorderOuterOutlined,
  AppstoreAddOutlined,
  LineHeightOutlined,
  FileImageOutlined,
  GatewayOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import { useImmer } from 'use-immer';
import TextPanel from './text-panel';
import ImagePanel from './image-panel';
import TemplatePanel from './template-panel';
import BGPanel from './bg-panel';
import styles from './slider.less';

const itemData = [
  {
    id: 'template',
    name: '模板1',
    icon: <AppstoreAddOutlined style={{ fontSize: 24, color: '#fff' }} />,
    activeIcon: (
      <AppstoreAddOutlined style={{ fontSize: 24, color: '#10263A' }} />
    ),
  },
  {
    id: 'text',
    name: '文字',
    icon: <LineHeightOutlined style={{ fontSize: 24, color: '#fff' }} />,
    activeIcon: (
      <LineHeightOutlined style={{ fontSize: 24, color: '#10263A' }} />
    ),
  },
  {
    id: 'image',
    name: '图片',
    icon: <FileImageOutlined style={{ fontSize: 24, color: '#fff' }} />,
    activeIcon: (
      <FileImageOutlined style={{ fontSize: 24, color: '#10263A' }} />
    ),
  },
  {
    id: 'label',
    name: '标记',
    icon: <GatewayOutlined style={{ fontSize: 24, color: '#fff' }} />,
    activeIcon: <GatewayOutlined style={{ fontSize: 24, color: '#10263A' }} />,
  },
  {
    id: 'background',
    name: '背景',
    icon: <BarcodeOutlined style={{ fontSize: 24, color: '#fff' }} />,
    activeIcon: <BarcodeOutlined style={{ fontSize: 24, color: '#10263A' }} />,
  },
];

export interface IHeaderProps {}

const Slider: FC<IHeaderProps> = (props) => {
  const [state, setState] = useImmer({
    active: 'template',
  });

  const handleItemClick = (key: string) => {
    setState({ active: key });
  };

  return (
    <div className={styles.slider}>
      <div className={styles.toolbar}>
        {itemData.map((item) => {
          return (
            <Tooltip key={item.id} placement="right" title={item.name}>
              <div
                onClick={() => handleItemClick(item.id)}
                className={`${styles.item} ${
                  state.active === item.id ? styles.active : ''
                }`}
              >
                {state.active === item.id ? item.icon : item.activeIcon}
                {/* <BorderOuterOutlined
                  style={{
                    fontSize: 24,
                    color:
                      state.active === item.id
                        ? '#fff'
                        : 'rgba(16, 38, 58, 0.65)',
                  }}
                /> */}
              </div>
            </Tooltip>
          );
        })}
      </div>
      <div className={styles.area}>
        {state.active === 'template' && <TemplatePanel />}
        {state.active === 'text' && <TextPanel />}
        {state.active === 'image' && <ImagePanel />}
        {state.active === 'background' && <BGPanel />}
      </div>
    </div>
  );
};

export default Slider;
