import React, { FC } from 'react';
import styles from './header.less';

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>图片编辑器</div>
    </div>
  );
};

export default Header;
