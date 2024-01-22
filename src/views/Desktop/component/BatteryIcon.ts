import { createElementVNode, openBlock, createElementBlock, defineComponent } from 'vue'
const hoisted_1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
}
const hoisted_2 = /*#__PURE__*/ createElementVNode(
  'rect',
  {
    x: '32',
    y: '144',
    width: '400',
    height: '224',
    rx: '45.7',
    ry: '45.7',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'square',
    'stroke-miterlimit': '10',
    'stroke-width': '32'
  },
  null,
  -1
  /* HOISTED */
)
const hoisted_4 = /*#__PURE__*/ createElementVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-miterlimit': '10',
    'stroke-width': '32',
    d: 'M480 218.67v74.66'
  },
  null,
  -1
  /* HOISTED */
)

export function getBatteryIcon(level: number) {
  // level 0-1, width 0-292.63
  const hoistedBatteryLevel = createElementVNode(
    'rect',
    {
      x: '85.69',
      y: '198.93',
      width: `${level * 292.63}`,
      height: '114.13',
      rx: '4',
      ry: '4',
      stroke: 'currentColor',
      'stroke-linecap': 'square',
      'stroke-miterlimit': '10',
      'stroke-width': '32',
      fill: 'currentColor'
    },
    null,
    -1
    /* HOISTED */
  )
const hoisted_5 = [hoisted_2, hoistedBatteryLevel, hoisted_4]
  return defineComponent({
    name: 'BatteryIcon',
    render: function render(_ctx: any, _cache: any) {
      return openBlock(), createElementBlock('svg', hoisted_1, hoisted_5)
    }
  })
} 