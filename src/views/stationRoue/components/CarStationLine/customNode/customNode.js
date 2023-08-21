import { Graph } from '@antv/x6'
import upArrows from './img/up-arrows.png'
import downArrows from './img/down-arrows.png'
// 上行站点
Graph.registerNode('up-big-custom-circle', {
  inherit: 'circle',
  attrs: {
    image: {
      'xlink:href': upArrows,
      width: 18,
      height: 18,
      x: 0,
      y: 0
    },
    label: {
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      fill: 'white',
      width: 30,
      height: 20,
      fontSize: 22,
    },
  },
  markup: [
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
})
// 下行站点
Graph.registerNode('down-big-custom-circle', {
  inherit: 'circle',
  attrs: {
    image: {
      'xlink:href': downArrows,
      width: 18,
      height: 18,
      x: 0,
      y: 0
    },
    label: {
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      fill: 'white',
      width: 30,
      height: 20,
      fontSize: 20,
    },
  },
  markup: [
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
})

// 车间距自定义线条
Graph.registerEdge(
  'custom-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#4BD17A',
      },
    },
    markup: [
      {
        tagName: 'path',
        selector: 'stroke',
      },
      {
        tagName: 'path',
        selector: 'fill',
      },
    ],
    connector: { name: 'rounded' },
    attrs: {
      fill: {
        connection: true,
        fill: 'none',
      },
      stroke: {
        fill: 'none',
        stroke: '#000',
        connection: true,
        strokeLinecap: 'round',
      },
    },
    defaultLabel: {
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        label: {
          fill: '#fff',
          fontSize: 14,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          pointerEvents: 'none',
        },
        body: {
          ref: 'label',
          fill: 'white',
          stroke: '#5755a1',
          strokeWidth: 2,
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
      },
      position: {
        distance: 100,
        options: {
          absoluteDistance: true,
        },
      },
    },
  },
)
