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
      { id: 'bg', type: 'color', color: '#008CE5' },
      {
        draggable: true,
        x: 150.03481218922974,
        y: 257.72652388798366,
        id: '50d14645-3690-42a7-943f-e8da75811d68',
        fontSize: 60.00000000000214,
        type: 'text-input',
        text: '(开源)两个周末写了个图片编辑器',
        fill: 'rgba(250, 250, 250, 1)',
        width: 982.0999237385131,
        scaleX: 1,
        height: 72,
        fontFamily: 'cursive',
        isSelected: true,
      },
      {
        draggable: true,
        id: '275b13a3-043e-4faa-a2ad-469eedaadfcb',
        type: 'image',
        url: '/image1/14.png',
        x: 872.6307168959983,
        y: 455.9557445044186,
        scaleX: 1,
        width: 319.6416634335822,
        height: 239.52476071250342,
      },
      {
        draggable: true,
        x: 445.38134244375294,
        y: 384.5799011532157,
        id: '7e332b32-7018-4d1d-8de8-45620f8c5cae',
        fontSize: 36.00000000000012,
        type: 'text-input',
        text: 'Fast Image Editor',
        fill: 'rgba(230, 221, 221, 1)',
        width: 291.9318543553984,
        fontFamily: 'cursive',
        scaleX: 1,
        height: 57.00000000000019,
        isSelected: true,
      },
      {
        draggable: true,
        id: '160a3401-14df-488b-8136-e29ec545540d',
        type: 'image',
        url: '/image1/14.png',
        x: 323.27449359758066,
        y: 242.1222005660634,
        scaleX: 1,
        width: 319.64166343359926,
        height: 239.524760712526,
        rotation: -179.87404359416988,
        skewX: 1.5135462327897612e-16,
        skewY: 0,
      },
    ],
    // nodes: [{"id":"bg","type":"color","color":"#008CE5"},{"draggable":true,"x":137.34414096735566,"y":256.57331136739043,"id":"50d14645-3690-42a7-943f-e8da75811d68","fontSize":60.00000000000214,"type":"text-input","text":"双击编辑文字","fill":"rgba(250, 250, 250, 1)","width":982.0999237385131,"scaleX":1,"height":60.00000000000214,"fontFamily":"cursive"},{"draggable":true,"id":"275b13a3-043e-4faa-a2ad-469eedaadfcb","type":"image","url":"/image1/14.png","x":871.4770195121914,"y":449.03646938086,"scaleX":1,"width":319.6416634335822,"height":239.52476071250342},{"draggable":true,"x":425.7684869190369,"y":370.74135090609735,"id":"7e332b32-7018-4d1d-8de8-45620f8c5cae","fontSize":48.00000000000024,"type":"text-input","text":"双击编辑文字","fill":"rgba(230, 221, 221, 1)","width":403.8405005846535,"fontFamily":"cursive","scaleX":1,"height":48.00000000000024},{"draggable":false,"id":"1ccb2751-e9f0-4f17-990d-8e57177f290c","type":"image","x":1.8586921072106335,"y":2.8487398952835603,"isSelected":false,"width":319.91914090197054,"height":239.73268956479876,"image":{},"rotation":0,"scaleX":1,"scaleY":1,"offsetX":0,"offsetY":0,"skewX":0,"skewY":0}]
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
        { id: 'bg', type: 'color', color: '#008CE5' },
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
