import React, { FC, useRef, useEffect, useState } from 'react';
import { splitArray, splitGroupArray } from '@/utils/util';
import ImageCpt from './image';

import styles from './waterfallFlow.less';

/**
 * 找出数组中最小的树的索引
 * @param data
 */
const findArrayMinIndex = (data: Array<number>): Array<number> => {
  let minIndex = 0;
  let minValue = data[0];
  for (let i = 1; i < data.length; i++) {
    if (minValue > data[i]) {
      minValue = data[i];
      minIndex = i;
    }
  }
  return [minIndex, minValue];
};

export type ImageItem = {
  thumb_width: number;
  thumb_height: number;
  width: number;
  height: number;
  path: string;
  thumb_path: string;
  top?: number;
  left?: number;
};

export interface IWaterfallFlowProps<T> {
  type: 'vertical' | 'horizontal'; // vertical 等宽瀑布流， horizontal 等宽瀑布流
  size: number; //
  data: Array<ImageItem>;
  classNameImg?: string;
  gap: number;
  onClick?: (e: React.MouseEvent<HTMLImageElement>, data: ImageItem) => void; // 鼠标点击事件
  // onClick?: (e: React.MouseEvent) => void;
  // onClick?: (e: React.MouseEvent) => void;
}

const WaterfallFlow = <T,>({
  size,
  data,
  type,
  classNameImg,
  onClick,
  gap,
}: IWaterfallFlowProps<T>) => {
  const [splitData, setSplitData] = useState<ImageItem[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowWidth = useRef<number>(0); // 记录每行的宽度
  const rowCount = useRef<number>(0); //记录现在到第几行了

  /**
   * vertical 需要的state和Ref
   */
  const [verticalData, setVerticalData] = useState<ImageItem[]>([]);
  const recordHeight = useRef<Array<number>>([]); //

  const init = () => {
    rowCount.current = 0;
    rowWidth.current = 0;
    setSplitData([]);

    recordHeight.current = [];
    setVerticalData([]);

    if (containerRef.current) {
      containerRef.current.style.height = 'auto';
    }
  };

  const updateRecordHeight = (columIndex: number, height: number) => {
    console.log('columIndex', columIndex, height);
    let currHeight = recordHeight.current[columIndex];
    if (!currHeight) {
      recordHeight.current[columIndex] = height;
    } else {
      recordHeight.current[columIndex] = currHeight + height;
    }
  };

  useEffect(() => {
    init();
  }, [data]);

  useEffect(() => {
    if (verticalData.length === 0 && type === 'vertical') {
      if (!containerRef.current) {
        return;
      }
      const { clientWidth: containerWidth } = containerRef.current;
      const columnCount = Math.floor(containerWidth / (size + gap)); // 每列放置几个
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let columIndex = i % columnCount;
        const item = data[i];

        const width = size;
        const height = size / (item.thumb_width / item.thumb_height); // 图片宽高的比率*缩放后的图片的宽度
        let top = null;
        let left = null;
        if (i < columnCount) {
          // 第一行内容
          top = gap;
          left = i * size + (i + 1) * gap;
        } else {
          const [minIndex, minHeight] = findArrayMinIndex(recordHeight.current); // 找出最小值的索引
          // console.log('minIndex, minHeight', minIndex, minHeight)
          columIndex = minIndex;
          top = minHeight + gap;
          left = minIndex * size + (minIndex + 1) * gap;
        }

        res.push({ ...item, top, left, width, height });
        updateRecordHeight(columIndex, height + gap);
      }
      const maxHeight = Math.max(...recordHeight.current);
      containerRef.current.style.height = `${maxHeight}px`;
      setVerticalData(res);
    }
  }, [verticalData]);

  useEffect(() => {
    if (splitData.length === 0 && type === 'horizontal') {
      if (!containerRef.current) {
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const height = size;
        const width = size * (item.thumb_width / item.thumb_height);

        let { clientWidth: containerWidth } = containerRef.current; // 容器的宽度
        //计算每行宽度
        rowWidth.current += width;
        containerWidth = containerWidth - 20;
        if (rowWidth.current > containerWidth) {
          containerWidth =
            containerWidth - splitData[rowCount.current].length * 10;
          //精确计算容器的宽度
          containerWidth = containerWidth;
          rowWidth.current = rowWidth.current - width;
          const groupHeight = (containerWidth * size) / rowWidth.current; // 计算出每组的高度

          splitData[rowCount.current] = splitData[rowCount.current].map((d) => {
            return {
              ...d,
              height: groupHeight,
            };
          });

          //把多余图片放入到下一行
          rowWidth.current = width;
          rowCount.current++;
          splitData[rowCount.current] = [{ ...item, width, height }];
        } else {
          const currItem = { ...item, width, height };
          if (!splitData[rowCount.current]) {
            splitData[rowCount.current] = [currItem];
          } else {
            splitData[rowCount.current].push(currItem);
          }
        }
        setSplitData([...splitData]);
      }
    }
  }, [splitData]);

  const renderHorizontal = () => {
    return splitData.map((row, index) => {
      return (
        <div key={index} className={styles.row}>
          {row.map((item) => {
            const path = item.thumb_path || item.path;
            return (
              <ImageCpt
                key={path}
                onClick={onClick}
                imageItem={item}
                classNameImg={classNameImg}
              />
            );
          })}
        </div>
      );
    });
  };

  const renderVertical = () => {
    return verticalData.map((row) => {
      const path = row.thumb_path || row.path;
      return (
        <ImageCpt
          key={path}
          style={{
            position: 'absolute',
            top: row.top,
            left: row.left,
            width: row.width,
            height: row.height,
            margin: 0,
          }}
          onClick={onClick}
          imageItem={row}
          classNameImg={classNameImg}
        />
      );
    });
  };
  return (
    <>
      <div className={styles.container} ref={containerRef}>
        {type === 'horizontal' ? renderHorizontal() : renderVertical()}
      </div>
    </>
  );
};

WaterfallFlow.defaultProps = {
  type: 'vertical',
  size: 120,
  gap: 10,
};

export default WaterfallFlow;
