import Konva from 'konva';

/**
 * 画布内元素类型
 */
export type ElementType = 'color' | 'image' | 'text' | 'rect' | 'text-input';

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
