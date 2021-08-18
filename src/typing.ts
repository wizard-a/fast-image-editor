import Konva from 'konva';

/**
 * 画布内元素类型
 */
export type ElementType =
  | 'color'
  | 'image'
  | 'text'
  | 'rect'
  | 'text-input'
  | 'bg-image';

export type BaseModel = {
  id: string;
  type: ElementType;
  x: number;
  y: number;
};

/**
 * 画布背景类
 */
export type BgModel = BaseModel & {
  color?: string; // 背景颜色
  url?: string; // 背景图片
};

/**
 * 文本类
 */
export type TextModel = BaseModel & Konva.TextConfig;

/**
 * 矩形类
 */
export type ReactModel = BaseModel & Konva.RectConfig;

/**
 * DataModel Item
 */
export type DatModelItem = BgModel | TextModel | ReactModel;

// 画布内数据类
export type DataModel = Array<DatModelItem>;

export type ShapePanelType = 'canvas' | 'text';

// 节点位置信息
export type LocationItem = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  l: number; // 左侧对齐线
  r: number; // 右侧对齐线
  t: number; // 顶部对齐线
  b: number; // 底部对齐线
  lc: number; // 左侧居中对齐线
  tc: number; // 顶部居中弄对齐线
};

// 线信息
export type LineItem = {
  x: number;
  y: number;
  width: number;
  height: number;
};
