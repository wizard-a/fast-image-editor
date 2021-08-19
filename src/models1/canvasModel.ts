import { useState, useCallback } from 'react';
import { ShapePanelEnum } from '@/enum';
import { DatModelItem, LocationItem, UndoRedoActionType } from '@/typing';
import Konva from 'konva';
import _ from 'lodash';

let threshold = 100;

const CanvasModel = ({ get, set }: any) => ({
  shapePanelType: ShapePanelEnum.ShapePanel, // 用枚举代替
  selectNode: null,
  editNode: null,
  stageRef: null,
  layerRef: null,
  canvasRef: null,
  bgRef: null, // 背景实例对象
  stageData: {
    width: 1200,
    height: 700,
    scale: 1,
  },
  loading: false,
  nodeLocations: [],
  undoRedoData: {
    // 撤销重做数据结构
    activeSnapshot: null, // 当前激活的快照数据
    snapshots: [], // 存储的快照数据
    current: -1, // 当前索引
  },
  changeCanvas: (currCanvasModel: any) => {
    set((state: any) => {
      return Object.assign(state, currCanvasModel);
    });
  },
  setTemplate: (data: any) => {
    const { stageData } = get();
    set((state: any) => {
      return {
        selectNode: data?.nodes[0],
        stageData: {
          width: data.width * stageData.scale,
          height: data.height * stageData.scale,
          scale: stageData.scale,
        },
      };
    });
  },
  setLoading: (loading: boolean) => {
    set((state: any) => {
      return { loading: loading };
    });
  },
  addNodeLocation: (locationItem: LocationItem) => {
    set((state: any) => {
      // console.log('state.nodeLocations=>', nodeLocations);
      const result = [...state.nodeLocations, locationItem];
      return {
        nodeLocations: result,
      };
    });
  },
  updateNodeLocation: (locationItem: LocationItem) => {
    set((state: any) => {
      let index = state.nodeLocations.findIndex(
        (item: LocationItem) => item.id === locationItem.id,
      );
      state.nodeLocations[index] = locationItem;
      return {
        nodeLocations: [...state.nodeLocations],
      };
    });
  },
  // 更新快照数据
  updateUndoRedoData: ({ type, data }: UndoRedoActionType) => {
    const newUndoRedoData: any = {};

    set((state: any) => {
      const { current, snapshots } = state.undoRedoData;
      if (type === 'push') {
        const newData = _.cloneDeep(data);
        if (current === -1) {
          newUndoRedoData.snapshots = [...snapshots, newData];
        } else {
          // 当前已经撤销，重新操作的时候要把某些记录取消
          newUndoRedoData.snapshots = snapshots
            .slice(0, current)
            .concat([newData]);
        }
        newUndoRedoData.activeSnapshot = null;
        newUndoRedoData.current = -1;
      }

      if (type === 'undo') {
        // debugger;
        if (current === -1) {
          newUndoRedoData.current = snapshots.length - 1;
        } else {
          newUndoRedoData.current = current - 1;
        }
        newUndoRedoData.activeSnapshot = snapshots[newUndoRedoData.current];
      }

      if (type === 'redo') {
        if (current != -1) {
          newUndoRedoData.current = current + 1;
        }
        if (current === snapshots.length - 1) {
          newUndoRedoData.activeSnapshot = null;
          newUndoRedoData.current = -1;
        } else {
          newUndoRedoData.activeSnapshot = snapshots[newUndoRedoData.current];
        }
      }

      if (newUndoRedoData?.snapshots?.length > threshold) {
        // debugger;
        newUndoRedoData.snapshots = newUndoRedoData.snapshots.splice(
          -threshold,
        );
      }

      return {
        undoRedoData: {
          ...state.undoRedoData,
          ...newUndoRedoData,
        },
      };
    });
  },
});

export default CanvasModel;
