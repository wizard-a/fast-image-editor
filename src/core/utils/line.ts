/**
 * 处理辅助线的工具方法
 */

import Konva from 'konva';

let GUIDELINE_OFFSET = 5;

type LineGuide = {
  vertical: Array<number>;
  horizontal: Array<number>;
};

type ObjectSnappingEdgeItem = {
  guide: number;
  offset: number;
  snap: string;
};

type ObjectSnappingEdge = {
  vertical: Array<ObjectSnappingEdgeItem>;
  horizontal: Array<ObjectSnappingEdgeItem>;
};

type GuidItem = {
  lineGuide: number;
  offset: number;
  orientation: 'H' | 'V';
  snap: string;
};

type Guides = Array<GuidItem>;

export function getLineGuideStops(skipShape: Konva.Shape, layer: Konva.Layer) {
  let vertical = [0, layer.width() / 2, layer.width()];
  let horizontal = [0, layer.height() / 2, layer.height()];

  layer.find('.node').forEach((guideItem) => {
    if (guideItem === skipShape) {
      return;
    }
    let box = guideItem.getClientRect();

    vertical.push(...[box.x, box.x + box.width, box.x + box.width / 2]);
    horizontal.push(...[box.y, box.y + box.height, box.y + box.height / 2]);
  });
  return {
    vertical: vertical,
    horizontal: horizontal,
  };
}

export function getObjectSnappingEdges(node: Konva.Shape) {
  let box = node.getClientRect();
  let absPos = node.absolutePosition();

  return {
    vertical: [
      {
        guide: Math.round(box.x),
        offset: Math.round(absPos.x - box.x),
        snap: 'start',
      },
      {
        guide: Math.round(box.x + box.width / 2),
        offset: Math.round(absPos.x - box.x - box.width / 2),
        snap: 'center',
      },
      {
        guide: Math.round(box.x + box.width),
        offset: Math.round(absPos.x - box.x - box.width),
        snap: 'end',
      },
    ],
    horizontal: [
      {
        guide: Math.round(box.y),
        offset: Math.round(absPos.y - box.y),
        snap: 'start',
      },
      {
        guide: Math.round(box.y + box.height / 2),
        offset: Math.round(absPos.y - box.y - box.height / 2),
        snap: 'center',
      },
      {
        guide: Math.round(box.y + box.height),
        offset: Math.round(absPos.y - box.y - box.height),
        snap: 'end',
      },
    ],
  };
}

// find all snapping possibilities
const getGuides = (
  lineGuideStops: LineGuide,
  itemBounds: ObjectSnappingEdge,
) => {
  let resultV: any = [];
  let resultH: any = [];

  lineGuideStops.vertical.forEach((lineGuide) => {
    itemBounds.vertical.forEach((itemBound) => {
      let diff = Math.abs(lineGuide - itemBound.guide);
      // if the distance between guild line and object snap point is close we can consider this for snapping
      if (diff < GUIDELINE_OFFSET) {
        resultV.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset,
        });
      }
    });
  });

  lineGuideStops.horizontal.forEach((lineGuide) => {
    itemBounds.horizontal.forEach((itemBound) => {
      let diff = Math.abs(lineGuide - itemBound.guide);
      if (diff < GUIDELINE_OFFSET) {
        resultH.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset,
        });
      }
    });
  });

  let guides: Guides = [];

  // find closest snap
  let minV = resultV.sort((a: any, b: any) => a.diff - b.diff)[0];
  let minH = resultH.sort((a: any, b: any) => a.diff - b.diff)[0];
  if (minV) {
    guides.push({
      lineGuide: minV.lineGuide,
      offset: minV.offset,
      orientation: 'V',
      snap: minV.snap,
    } as GuidItem);
  }
  if (minH) {
    guides.push({
      lineGuide: minH.lineGuide,
      offset: minH.offset,
      orientation: 'H',
      snap: minH.snap,
    } as GuidItem);
  }
  return guides;
};

export function drawGuides(guides: Guides, layer: Konva.Layer) {
  guides.forEach((lg) => {
    if (lg.orientation === 'H') {
      let line = new Konva.Line({
        points: [-6000, 0, 6000, 0],
        stroke: '#1976D2',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [5, 8],
      });
      layer.add(line);
      line.absolutePosition({
        x: 0,
        y: lg.lineGuide,
      });
    } else if (lg.orientation === 'V') {
      let line = new Konva.Line({
        points: [0, -6000, 0, 6000],
        // stroke: 'rgb(0, 161, 255)',
        stroke: '#1976D2', // '#1976D2',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [5, 8],
      });
      layer.add(line);
      line.absolutePosition({
        x: lg.lineGuide,
        y: 0,
      });
    }
  });
}

export const detectionToLine = (layer: Konva.Layer, currNode: Konva.Shape) => {
  removeLines(layer);
  let lineGuideStops = getLineGuideStops(currNode, layer);
  // find snapping points of current object
  let itemBounds = getObjectSnappingEdges(currNode);

  // now find where can we snap current object
  let guides = getGuides(lineGuideStops, itemBounds);

  // do nothing of no snapping
  if (!guides.length) {
    return;
  }

  drawGuides(guides, layer);

  let absPos = currNode.absolutePosition();
  // now force object position
  guides.forEach((lg) => {
    switch (lg.snap) {
      case 'start': {
        switch (lg.orientation) {
          case 'V': {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case 'H': {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
        }
        break;
      }
      case 'center': {
        switch (lg.orientation) {
          case 'V': {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case 'H': {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
        }
        break;
      }
      case 'end': {
        switch (lg.orientation) {
          case 'V': {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case 'H': {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
        }
        break;
      }
    }
  });
  currNode.absolutePosition(absPos);
};

export const removeLines = (layer: Konva.Layer) => {
  layer.find('.guid-line').forEach((l) => l.destroy());
};
