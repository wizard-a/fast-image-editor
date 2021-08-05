import React, { FC } from 'react';
import styles from './panelTitle.less';

export interface IPanelTitleProps {}

const PanelTitle: FC<IPanelTitleProps> = (props) => {
  return <div className={styles.title}>{props.children}</div>;
};

export default PanelTitle;
