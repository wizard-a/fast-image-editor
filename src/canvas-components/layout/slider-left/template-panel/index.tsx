import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import styles from './template.less';

const data = [
  {
    id: 1,
    thumb: '/thumb/1.png',
    width: '1200',
    height: '700',
    nodes: [
      {
        id: 'bg',
        type: 'color',
        fill: 'rgba(17, 167, 238, 1)',
        width: 1200,
        height: 700,
      },
      { x: 372.0302029568915, y: 277.34530938123754 },
      {
        id: 'd5b502bf-9994-4f9b-9c2d-dc619cf655fb',
        type: 'image',
        url: '/image1/14.png',
        width: 400,
        height: 200,
        x: 417.6325821808232,
        y: 221.17508755476706,
        name: 'node',
        draggable: true,
        rotation: 179.6909031540857,
        scaleX: 1.0000000000000047,
        scaleY: 1.000000000000023,
        skewX: -6.019490461639354e-16,
      },
      {
        id: '4dca93ae-1e65-4d38-8e20-edfb4050147d',
        type: 'image',
        url: '/image1/14.png',
        width: 400,
        height: 200,
        x: 791.2887393353599,
        y: 479.1417165668663,
        name: 'node',
        draggable: true,
      },
      {
        id: '4dbdfdb6-50c3-4fba-9c59-4fb69fb9029f',
        fontSize: 60,
        type: 'text-input',
        text: '添加了节点框选',
        fill: 'rgba(250, 250, 250, 1)',
        width: 485.77138050064934,
        x: 349.89892862820756,
        y: 249.4011976047904,
        name: 'node',
        draggable: true,
        scaleY: 0.9999999999999984,
      },
      { fill: 'rgba(0,0,255,0.5)', visible: false },
    ],
  },

  {
    id: 2,
    thumb: '/thumb/2.png',
    width: '1200',
    height: '700',
    nodes: [
      { id: 'bg', type: 'color', color: '#008CE5' },
      {
        draggable: true,
        id: '9a97ba59-1c99-4b88-8d82-04d3616401dc',
        type: 'image',
        url: '/image2/13.jpeg',
        x: -73.68823795090792,
        y: -22.985759747934907,
        scaleX: 1,
        width: 1284.0483160382598,
        height: 722.2771777715211,
        rotation: 0,
        skewX: 0,
        skewY: 0,
      },
      {
        draggable: false,
        x: 423.8188145751038,
        y: 289.4545454545455,
        id: '345c4003-38bb-413f-a71e-d80180496bb8',
        fontSize: 72,
        type: 'text-input',
        text: '清 爽 周 末',
        fill: 'rgba(255, 255, 255, 1)',
        width: 360,
        isSelected: false,
        height: 63,
        fontFamily: 'cursive',
      },
    ],
  },
  {
    id: 3,
    thumb: '/thumb/3.png',
    width: '1200',
    height: '700',
    nodes: [
      {
        id: 'bg',
        width: 1200,
        height: 700,
        type: 'bg-image',
        url: '/bg2/10.jpeg',
      },
      {
        draggable: true,
        x: 123.8380594517084,
        y: 67.56253190116469,
        id: '28608db7-7f68-4fb4-bfc9-54522364c617',
        fontSize: 107.99999999999949,
        type: 'text-input',
        text: '七夕快乐',
        fill: 'rgba(255, 255, 255, 1)',
        width: 476.99999999999966,
        isSelected: true,
        scaleX: 1,
        rotation: 23.962488974577667,
        skewX: -8.881784197001235e-16,
        skewY: 0,
        fontFamily: 'cursive',
      },
      {
        draggable: true,
        x: 323.3506366307537,
        y: 462.7723796804081,
        id: '96bfb1a7-2c42-41a4-9255-ef774bca1d33',
        fontSize: 107.99999999999928,
        type: 'text-input',
        text: '七夕快乐',
        fill: 'rgba(255, 255, 255, 1)',
        width: 477.00000000000045,
        isSelected: true,
        scaleX: 1,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        fontFamily: 'cursive',
      },
      {
        draggable: true,
        x: 651.9310956836752,
        y: 276.0457854016509,
        id: '820b2926-ce01-445a-8eee-94f7b76871fa',
        fontSize: 108.00000000000152,
        type: 'text-input',
        text: '七夕快乐',
        fill: 'rgba(255, 255, 255, 1)',
        width: 476.9999999999952,
        isSelected: true,
        scaleX: 1,
        rotation: -29.70308988675858,
        skewX: -4.440892098500626e-16,
        skewY: 0,
        fontFamily: 'cursive',
      },
    ],
  },
];

export interface ITemplatePanelProps {}

const TemplatePanel: FC<ITemplatePanelProps> = (props) => {
  const { stageRef, setLoading } = useModel(canvasModel);
  const { nodes, setTemplate } = useModel(canvasDataModel);

  const template = (data: any) => {
    setLoading(true);
    setTemplate(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const add = () => {
    const data = {
      id: 'new',
      thumb: '',
      width: '1200',
      height: '700',
      nodes: [
        {
          id: 'bg',
          type: 'color',
          color: '#F5EDDF',
        },
        {
          draggable: true,
          x: 422.35063663075414,
          y: 291.7723796804092,
          id: '28608db7-7f68-4fb4-bfc9-54522364c617',
          fontSize: 60,
          type: 'text-input',
          text: '双击编辑文字',
          fill: '#000',
          width: 360,
        },
      ],
    };
    template(data);
  };

  return (
    <div className={styles.template}>
      <div>
        <Button
          onClick={add}
          style={{ width: '100%', borderRadius: '5px', marginBottom: '15px' }}
          type="primary"
        >
          新建
        </Button>
      </div>
      {data.map((item) => {
        return (
          <img key={item.id} onClick={() => template(item)} src={item.thumb} />
        );
      })}
    </div>
  );
};

export default TemplatePanel;
