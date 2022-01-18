import React from 'React';
import classnames from 'classnames';

import type { ImageItem } from './index';
import styles from './waterfallFlow.less';

export interface IImageProps {
  style?: React.CSSProperties;
  imageItem: ImageItem;
  classNameImg?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>, data: ImageItem) => void;
}

const Image = ({ imageItem, classNameImg, onClick, style }: IImageProps) => {
  const classNameImgList = classnames(styles.img, classNameImg);
  const path = imageItem.thumb_path || imageItem.path;

  const onImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    onClick?.(e, { ...imageItem });
  };
  return (
    <img
      onClick={onImageClick}
      className={classNameImgList}
      style={{ height: imageItem.height, ...style }}
      src={path}
    />
  );
};

export default Image;
