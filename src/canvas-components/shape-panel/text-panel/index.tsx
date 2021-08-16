import React, { FC } from 'react';
import { Select, Button, Tooltip } from 'antd';
import PanelTitle from '../panel-title';
import useModel from 'flooks';
import { ColorSelect } from '@/components';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useThrottleFn } from 'ahooks';
import styles from './textPanel.less';

const { Option } = Select;
const fonts = [
  { name: '微软雅黑体', value: 'Microsoft YaHei' },
  { name: '微软正黑体', value: 'Microsoft JhengHei' },
  { name: '黑体', value: 'SimHei' },
  { name: '宋体', value: 'SimSun' },
  { name: '新宋体', value: 'NSimSun' },

  { name: '仿宋', value: 'FangSong' },
  { name: '楷体', value: 'KaiTi' },
  { name: '新细明体', value: 'PMingLiU' },
  { name: 'cursive', value: 'cursive' },
  { name: '隶书', value: 'LiSu' },
  { name: '幼圆', value: 'YouYuan' },
  { name: '华文彩云', value: 'STCaiyun' },
];
const fontSizes = [
  12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 84, 96, 108, 120, 140,
];

export interface ITextPanelProps {}

const TextPanel: FC<ITextPanelProps> = (props) => {
  const { width, height, changeCanvasModelDataItem, changeCanvasModel } =
    useModel(canvasDataModel);
  const { selectNode, changeCanvas } = useModel(canvasModel);

  // console.log('selectNode=>', selectNode);

  const changeFont = (key: string, value: string) => {
    changeCanvasModelDataItem({
      ...selectNode,
      [key]: value,
    });
  };

  const { run } = useThrottleFn(
    (key: string, value: string) => {
      changeFont(key, value);
    },
    {
      wait: 200,
    },
  );

  return (
    <div className={styles.textPanel}>
      <PanelTitle>文字</PanelTitle>
      <div className={styles.item}>
        <div className={styles.title}>
          <div>字体</div>
        </div>
        <div className={styles.content}>
          <Select
            style={{ width: '45%' }}
            value={selectNode.fontFamily}
            onChange={(value: string) => changeFont('fontFamily', value)}
          >
            {' '}
            {fonts.map((item) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>

          <Select
            style={{ width: '45%' }}
            value={selectNode.fontSize}
            onChange={(value: string) => changeFont('fontSize', value)}
          >
            {' '}
            {fontSizes.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>字体描述</div>
        </div>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <Tooltip placement="bottom" title="加粗">
            <Button
              type={selectNode.fontWeight === 'bold' ? 'primary' : 'default'}
              shape="circle"
              icon={<BoldOutlined />}
              onClick={() =>
                changeFont(
                  'fontWeight',
                  selectNode.fontWeight === 'bold' ? 'normal' : 'bold',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="斜体">
            <Button
              type={selectNode.fontStyle === 'oblique' ? 'primary' : 'default'}
              shape="circle"
              icon={<ItalicOutlined />}
              onClick={() =>
                changeFont(
                  'fontStyle',
                  selectNode.fontStyle === 'oblique' ? 'normal' : 'oblique',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="下划线">
            <Button
              type={
                selectNode?.textDecoration === 'underline'
                  ? 'primary'
                  : 'default'
              }
              shape="circle"
              icon={<UnderlineOutlined />}
              onClick={() =>
                changeFont(
                  'textDecoration',
                  selectNode.textDecoration === 'underline' ? '' : 'underline',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="删除线">
            <Button
              type={
                selectNode?.textDecoration === 'line-through'
                  ? 'primary'
                  : 'default'
              }
              shape="circle"
              icon={<StrikethroughOutlined />}
              onClick={() =>
                changeFont(
                  'textDecoration',
                  selectNode.textDecoration === 'line-through'
                    ? ''
                    : 'line-through',
                )
              }
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>对齐方式</div>
        </div>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <Tooltip placement="bottom" title="左对齐">
            <Button
              type={selectNode.align === 'left' ? 'primary' : 'default'}
              shape="circle"
              icon={<AlignLeftOutlined />}
              onClick={() =>
                changeFont('align', selectNode.align === 'left' ? '' : 'left')
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="居中对齐">
            <Button
              type={selectNode.align === 'center' ? 'primary' : 'default'}
              shape="circle"
              icon={<AlignCenterOutlined />}
              onClick={() =>
                changeFont(
                  'align',
                  selectNode.align === 'center' ? '' : 'center',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="右对齐">
            <Button
              type={selectNode?.align === 'right' ? 'primary' : 'default'}
              shape="circle"
              icon={<AlignRightOutlined />}
              onClick={() =>
                changeFont('align', selectNode.align === 'right' ? '' : 'right')
              }
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>字体颜色</div>
        </div>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <ColorSelect
            value={selectNode?.fill}
            onChange={(value) => run('fill', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextPanel;
