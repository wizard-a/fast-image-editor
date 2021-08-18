import Konva from 'konva';
import { LocationItem, LineItem } from '@/typing';

const threshold = 6;
// 存放所有的辅助线
let lines: Array<Konva.Line> = [];
let locationItems: Array<LocationItem> = [];

enum DIRECTION {
  left = 1,
  right,
  top,
  bottom,
  leftCenter,
  topCenter,
  center,
}

export const getLocationItem = (shapeObject: Konva.Shape) => {
  const id = shapeObject.id();
  const width = shapeObject.width();
  const height = shapeObject.height();
  const x = shapeObject.x();
  const y = shapeObject.y();

  // console.log('element=>render', shapeRef.current);
  const locationItem: LocationItem = {
    id,
    w: width,
    h: height,
    x,
    y,
    l: x,
    r: x + width,
    t: y,
    b: y + height,
    lc: x + width / 2,
    tc: y + height / 2,
  };
  return locationItem;
  // console.log('locationItem=>', locationItem);
};

export const setLocationItems = (layer: Konva.Layer) => {
  locationItems = [];
  layer.children?.forEach((item) => {
    if (item.className !== 'Transformer') {
      locationItems.push(getLocationItem(item));
    }
  });
  console.log('locationItems=>', locationItems);
};

export const getLineItem = (
  originItem: LocationItem,
  targetItem: LocationItem,
) => {
  let minItem: LocationItem, maxItem: LocationItem;
  if (originItem.y > targetItem.y) {
    minItem = targetItem;
    maxItem = originItem;
  } else {
    minItem = originItem;
    maxItem = targetItem;
  }
  const lineItem: LineItem = {
    x: targetItem.x,
    y: minItem.y,
    width: 1,
    height: maxItem.y - minItem.y + maxItem.h,
  };

  return lineItem;
};

/**
 *
 * @param sourceItem 拖动的图形
 * @param targetItem 目标图形
 * @param targetItem 方向
 */
const getPoints = (
  sourceItem: LocationItem,
  targetItem: LocationItem,
  direction: DIRECTION,
) => {
  let minItem: LocationItem, maxItem: LocationItem;
  let points: any = [];

  let po = {
    [DIRECTION.left]: [
      [targetItem.l, sourceItem.b, targetItem.l, targetItem.t],
      [targetItem.l, targetItem.b, targetItem.l, sourceItem.t],
    ],
    [DIRECTION.right]: [
      [targetItem.r, sourceItem.b, targetItem.r, targetItem.t],
      [targetItem.r, targetItem.b, targetItem.r, sourceItem.t],
    ],
    [DIRECTION.leftCenter]: [
      [targetItem.lc, sourceItem.b, targetItem.lc, targetItem.t],
      [targetItem.lc, targetItem.b, targetItem.lc, sourceItem.t],
    ],
    [DIRECTION.top]: [
      [sourceItem.r, targetItem.t, targetItem.l, targetItem.t],
      [targetItem.r, targetItem.t, sourceItem.l, targetItem.t],
    ],
    [DIRECTION.bottom]: [
      [sourceItem.r, targetItem.b, targetItem.l, targetItem.b],
      [targetItem.r, targetItem.b, sourceItem.l, targetItem.b],
    ],
    [DIRECTION.topCenter]: [
      [sourceItem.r, targetItem.tc, targetItem.l, targetItem.tc],
      [targetItem.r, targetItem.tc, sourceItem.l, targetItem.tc],
    ],
  };

  switch (direction) {
    case DIRECTION.left:
      return sourceItem.y < targetItem.y
        ? po[DIRECTION.left][0]
        : po[DIRECTION.left][1];

    case DIRECTION.right:
      // 目标图形是否在上边
      return sourceItem.y < targetItem.y
        ? po[DIRECTION.right][0]
        : po[DIRECTION.right][1];

    case DIRECTION.leftCenter:
      return sourceItem.y < targetItem.y
        ? po[DIRECTION.leftCenter][0]
        : po[DIRECTION.leftCenter][1];

    case DIRECTION.top:
      return sourceItem.x < targetItem.x
        ? po[DIRECTION.top][0]
        : po[DIRECTION.top][1];

    case DIRECTION.bottom:
      return sourceItem.x < targetItem.x
        ? po[DIRECTION.bottom][0]
        : po[DIRECTION.bottom][1];

    case DIRECTION.topCenter:
      return sourceItem.x < targetItem.x
        ? po[DIRECTION.topCenter][0]
        : po[DIRECTION.topCenter][1];
    default:
      break;
  }
  return points;
};

export const addLine = (
  layer: Konva.Layer,
  sourceItem: LocationItem,
  targetItem: LocationItem,
  direction: DIRECTION,
) => {
  const points = getPoints(sourceItem, targetItem, direction);
  var greenLine = new Konva.Line({
    points: points,
    stroke: 'green',
    strokeWidth: 1,
    lineJoin: 'round',
    dash: [10, 10],
  });
  // greenLine.direction = direction

  lines.push(greenLine);
  layer.add(greenLine);
  layer.draw();
};

const updateLine = (
  sourceItem: LocationItem,
  targetItem: LocationItem,
  direction: DIRECTION,
) => {
  const points = getPoints(sourceItem, targetItem, direction);
  lines.forEach((line) => {
    line.points(points);
  });
};

export const removeLines = (layer: Konva.Layer) => {
  if (lines.length == 0) {
    return;
  }
  lines.forEach((item) => {
    item.remove();
  });
  lines = [];
  layer.draw();
};

/**
 * 检测是否有租房户线
 */
export const detectionToLine = (layer: Konva.Layer, shape: Konva.Shape) => {
  const locationItem = getLocationItem(shape);
  const compareLocations = locationItems.filter(
    (item: LocationItem) => item.id !== locationItem.id,
  );
  removeLines(layer);
  compareLocations.forEach((item: LocationItem) => {
    if (Math.abs(locationItem.x - item.x) <= threshold) {
      // 处理左侧方向
      shape.setPosition({ x: item.x, y: locationItem.y });
      addLine(layer, locationItem, item, DIRECTION.left);
    }
    if (Math.abs(locationItem.x - item.r) <= threshold) {
      // 处理右侧
      shape.setPosition({ x: item.r, y: locationItem.y });
      addLine(layer, locationItem, item, DIRECTION.right);
    }

    if (Math.abs(locationItem.lc - item.lc) <= threshold) {
      // 处理左侧居中
      shape.setPosition({ x: item.lc - locationItem.w / 2, y: locationItem.y });
      addLine(layer, locationItem, item, DIRECTION.leftCenter);
    }

    if (Math.abs(locationItem.r - item.x) <= threshold) {
      // 处理右侧方向
      shape.setPosition({ x: item.l - locationItem.w, y: locationItem.t });
      addLine(layer, item, locationItem, DIRECTION.right);
    }
    if (Math.abs(locationItem.r - item.r) <= threshold) {
      // 右侧相等
      shape.setPosition({ x: item.r - locationItem.w, y: locationItem.t });
      addLine(layer, item, locationItem, DIRECTION.right);
    }

    if (Math.abs(locationItem.y - item.y) <= threshold) {
      // 处理垂直方向顶部
      shape.setPosition({ x: locationItem.x, y: item.y });
      addLine(layer, locationItem, item, DIRECTION.top);
    }

    if (Math.abs(locationItem.y - item.b) <= threshold) {
      // 处理底部
      shape.setPosition({ x: locationItem.x, y: item.b });
      addLine(layer, locationItem, item, DIRECTION.bottom);
    }

    if (Math.abs(locationItem.tc - item.tc) <= threshold) {
      // 处理顶部居中
      shape.setPosition({ x: locationItem.x, y: item.tc - locationItem.h / 2 });
      addLine(layer, locationItem, item, DIRECTION.topCenter);
    }

    if (Math.abs(locationItem.b - item.t) <= threshold) {
      // 处理垂底部方向
      shape.setPosition({ x: locationItem.l, y: item.t - locationItem.h });
      addLine(layer, item, locationItem, DIRECTION.bottom);
    }

    if (Math.abs(locationItem.b - item.b) <= threshold) {
      // 右侧相等
      shape.setPosition({ x: locationItem.l, y: item.b - locationItem.h });
      addLine(layer, item, locationItem, DIRECTION.bottom);
    }
  });
};
