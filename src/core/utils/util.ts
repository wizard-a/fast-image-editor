import type { DatModelItem, DataModel, ImageModel } from '@/typing';

export const isBg = (modelItem: DatModelItem): boolean => {
  return modelItem.type === 'color';
};
