import React, { FC } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  BorderOuterOutlined,
} from '@ant-design/icons';
import { useImmer } from 'use-immer';
import styles from './slider.less';

const itemData = [
  {
    id: 'text',
    name: '文字',
    icon: <BorderOuterOutlined style={{ fontSize: 24, color: '#fff' }} />,
  },
  {
    id: 'label',
    name: '标记',
    icon: <BorderOuterOutlined style={{ fontSize: 24, color: '#fff' }} />,
  },
];

export interface IHeaderProps {}

const Slider: FC<IHeaderProps> = (props) => {
  const [state, setState] = useImmer({
    active: 'text',
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
                <BorderOuterOutlined
                  style={{
                    fontSize: 24,
                    color:
                      state.active === item.id
                        ? '#fff'
                        : 'rgba(16, 38, 58, 0.65)',
                  }}
                />
              </div>
            </Tooltip>
          );
        })}
      </div>
      <div className={styles.area}></div>
    </div>
  );
};

export default Slider;
