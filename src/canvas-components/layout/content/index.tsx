import React, { FC } from 'react';
import styles from './content.less';

export interface IHeaderProps {}

const Content: FC<IHeaderProps> = (props) => {
  return <div className={styles.content}>{props.children}</div>;
};

export default Content;
