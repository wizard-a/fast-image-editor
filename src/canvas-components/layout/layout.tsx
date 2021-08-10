import React, { FC } from 'react';
import styles from './layout.less';

export interface ILayoutProps {}

const Layout: FC<ILayoutProps> = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default Layout;
