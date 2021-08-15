import React, { FC, forwardRef, useRef } from 'react';
import { Image } from 'react-konva';
import useImage from '@/hooks/useImage';

export interface IImageProps {
  // url?: string;
  [x: string]: any;
}

const ImageC: FC<IImageProps> = forwardRef((props, ref: any) => {
  const { url, ...otherProps } = props;
  // console.log('otherProps=>', otherProps)
  const [image, status, width, height] = useImage(url, 'Anonymous');
  // console.log('width', height, otherProps)
  return (
    <Image
      ref={ref}
      width={width}
      height={height}
      image={image}
      {...otherProps}
    />
  );
});

export default ImageC;
