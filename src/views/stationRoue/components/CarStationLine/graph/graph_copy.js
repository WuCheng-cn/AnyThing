
/**
 * 传入后端数据,返回站点数据
 * @param {Array} upRoute [上行原始数据]
 * @param {Array} downRoute [下行原始数据]
 */
let sourceMarkerPosition = 20
export const initRouteData = (upRoute,downRoute)=>{
  let upArr = []
  let downArr = []
  // 创建初始上行数据
  upRoute.forEach((upItem,i) => {
    upArr.push({
      id:upItem.stationId + upItem.direction,
      x:sourceMarkerPosition,
      y:20,
      shape:'up-big-custom-circle',
      attrs:{
        label: {
          x:80,
          y: -10,
          text: upItem.stationName,
        },
      },
      data:{
        ...upItem
      },
    })
    sourceMarkerPosition = (i + 1) * 150
  });
  // 创建下行数据，整合上下行数据
  let isChange = false
  let upindex = 0
  downRoute.forEach((downItem,index)=>{
    // 点位相同直接添加
    if(downItem.stationId == upArr[upindex].data.stationId){
      downArr.push({
        id:downItem.stationId + downItem.direction,
        x: upArr[upindex].x,
        y:200,
        shape:'down-big-custom-circle',
        data:{
          ...downItem
        },
      })
      isChange = true
      upindex = index
    }else{
      // 当前点不同,查看后面是否有相同点位
      if(isChange){
        upindex = index
      }
      let isSame = false
      let sameItem = null
      for (let nextI = upindex; nextI < upArr.length; nextI++) {
        if(downItem.stationId == upArr[nextI].data.stationId){
          isSame = true
          sameItem = upArr[nextI]
        }
      }
      // 当前点位后面有相同，使用后面相同点位的坐标
      if(isSame){
        downArr.push({
          id:downItem.stationId + downItem.direction,
          x: sameItem.x,
          y:200,
          shape:'down-big-custom-circle',
          data:{
            ...downItem
          },
        })
      }else {
        // 当前点位后面无相同，使用当前坐标，当前点之后的点位坐标加
        downArr.push({
          id:downItem.stationId + downItem.direction,
          x: upArr[upindex].x,
          y:200,
          shape:'down-big-custom-circle',
          attrs:{
          label: {
            x:-60,
            y: 0,
            text: downItem.stationName,
          },
        },
          data:{
            ...downItem
          },
        })
        for (let nextI = upindex; nextI < upArr.length; nextI++) {
          upArr[nextI].x += 150
        }
      }
      isChange = false
    }
     // 循环保证上下行相同点位，坐标一致，并创建点间先
    upArr.forEach((upEle,upIndex) => {
      if(upEle.data.stationId == downItem.stationId){
        upindex = upIndex
      }
      downArr.forEach((downEle)=>{
        if(downEle.data.stationId == upEle.data.stationId){
          downEle.x = upEle.x
        }
      })
    })
  })
  sourceMarkerPosition = 20
  return {upArr , downArr}
}

/**
 * 传入上下行站点数据,返回上下行站点间连线
 * @param {Array} upRoute [上行站点数据]
 * @param {Array} downRoute [下行站点数据]
 */
export const initEdgeData = (upRoute,downRoute)=>{
  let upLineArr = []
  let downLineArr = []
  for (let i = 0; i < upRoute.length; i++) {
    let item = upRoute[i]
    let nextItem = upRoute[i+1]
    console.log(i);
    console.log(upRoute.length);
    if(i == upRoute.length - 1) break
    console.log(upLineArr);
    upLineArr.push({
      shape: 'edge',
      source:item.id,
      target: nextItem.id,
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
          stroke: '#4BD17A',
          strokeWidth:7,
          connection: true,
          strokeLinecap: 'round',
        },
      },
      data:{
        name:item.name
      }
    })
  }

  for (let index = 0; index < downRoute.length; index++) {
    let downItem = downRoute[index]
    let nextdownItem = downRoute[index+1]
    if(index == downRoute.length - 1) break
    downLineArr.push({
      shape: 'edge',
      source:downItem.id,
      target: nextdownItem.id,
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
          stroke: '#668FF5',
          strokeWidth:7,
          connection: true,
          strokeLinecap: 'round',
        },
      },
      data:{
        name:downItem.name
      }
    })
  }
  return {upLineArr , downLineArr}
}

/**
 * 传入单线路数据,返回环线站点及环线站点线路数据,线路内有标识是否为中间转折线(环线用)
 * @param {Array} Route [线路原始数据]
 * */ 
let loopLineNodePostion_x = 20
let loopLineNodePostion_y = 20
let middleIndex = 0
let Xmiddle = 0
export const initLoopLineNode = (Route)=>{
  let loopLineNode = []
  let loopLineEdge = []
  Route.forEach((item,index)=>{
    if(index <= (Route.length - 1) / 2){
      loopLineNodePostion_x = (index + 1) * 200
      middleIndex = index
      Xmiddle = index
    }else{
      loopLineNodePostion_x = loopLineNode[middleIndex--].x - 100
      loopLineNodePostion_y = 200
    }
    loopLineNode.push({
      id:item.stationId + item.direction,
      x:loopLineNodePostion_x,
      y:loopLineNodePostion_y,
      shape:'up-big-custom-circle',
      attrs:{
        label: {
          x:loopLineNodePostion_y == 20 ? 80 : -60,
          y: -10,
          text: item.stationName,
        },
      },
      data:{
        ...item
      },
    })
  })
  let isMiddleLine = false
  let vertices = []
  for (let i = 0; i < loopLineNode.length; i++) {
    let item = loopLineNode[i]
    let nextItem = loopLineNode[i+1]
    if(i == Xmiddle){
      isMiddleLine = true
      vertices = [
        {x:item.x + 100 ,y:30},
        {x:item.x + 100 ,y:210}
      ]
    }
    if(i == loopLineNode.length - 1) break
    loopLineEdge.push({
      shape: 'edge',
      source:item.id,
      target: nextItem.id,
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
      vertices,
      attrs: {
        fill: {
          connection: true,
          fill: 'none',
        },
        stroke: {
          fill: 'none',
          stroke: '#4BD17A',
          strokeWidth:6,
          connection: true,
          strokeLinecap: 'round',
        },
      },
      data:{
        name:item.name,
        isMiddleLine:vertices.length? true: false
      }
    })
    vertices = []
  }
  return{ loopLineNode, loopLineEdge}
}

/**
 * 传入车辆+上行站点+下行站点，返回车辆所在位置Node数据
 * @param {Array} vehicleList [当前线路车辆信息]
 * @param {Array} upRouteNode [上行线路]
 * @param {Array} downRouteNode [下行线路]
 * @param {Array} isPlateNo [是否车牌号]
 * @param {Array} isSmall [是否小图标]
 * @param {Array} isLine [是否基础标准直线图]
 * @param {Array} isLoop [是否为环线]
 * */
let vehicleNode = []
export const initCarNode = (vehicleList,upRouteNode,downRouteNode = [],isPlateNo,isSmall,isLine,isLoop = false) =>{
  vehicleNode = []
  vehicleList.forEach((item)=>{
    if(item.direction == 1){
      upRouteNode.forEach((ele)=>{
        let routeId = item.nextStationId + item.direction
        if(routeId == ele.id){
          vehicleNode.push({
            id:item.plateNo + item.nextStationId + item.direction,
            x:ele.x - 75,
            y:isLoop ? ele.y + 20 : ele.y - 40,
            shape:'car_vue_node',
            data:{
              isPlateNo,
              isSmall,
              ...item
            }
          })
        }
      })
    }else {
      if(downRouteNode.length){
        downRouteNode.forEach((ele)=>{
          let routeId = item.nextStationId + item.direction
          if(routeId == ele.id){
            vehicleNode.push({
              id:item.plateNo + item.nextStationId + item.direction,
              x:ele.x - 100,
              y:ele.y + 20,
              shape:'car_vue_node',
              data:{
                isPlateNo,
                isSmall,
                ...item
              }
            })
          }
        })
      }
    }
  })
  return vehicleNode
}

/**
 * 传入上下行线路，返回上下行站点信息数据(合并线路用)
 * @param {Array} Route [合并线路后端原始数据]
 * */ 
export const initMergeRouteData = (Route) =>{
  // 筛选出主从线路
  let upMainLine = []
  let downMainLine = []
  let upSubordinateLine = []
  let downSubordinateLine = []
  let downSubordinateLineArr = []
  let upSubordinateLineArr = []
  Route.forEach(item => {
    if(item.isMainLine == 1){
      upMainLine.push(...item.upStationList)
      downMainLine.push(...item.downStationList)
    }else {
      upSubordinateLine.push(item.upStationList)
      downSubordinateLine.push(item.downStationList)
    }
  });
  // 计算主线站点
  const { upArr, downArr } = initRouteData(upMainLine,downMainLine)
  // 根据主线站点返回主线站间线
  const {upLineArr,downLineArr} = initEdgeData(upArr,downArr)
  let upFirstDiff = false
  let downFirstDiff = false
  // 从线
  let upSubordinateArr = []
  let downSubordinateArr = []
// 记录上行从线坐标值
let upSubordinate_x = 0
let upSubordinate_y = 0
console.log(upSubordinateLine,'1111111111');
upSubordinateLine.forEach((lineItem,outsideIndex)=>{
  upSubordinateArr.push([])
  lineItem.forEach((item,index)=>{
    let lastItem = lineItem[index == 0 ? index: index - 1]
    // 首次不同点
    if(item.isMerge == 2 && !upFirstDiff){
      upFirstDiff = true
      upArr.forEach((ele)=>{
        if(ele.id == lastItem.stationId + lastItem.direction){
          upSubordinate_x = ele.x + 150
          upSubordinate_y = ele.y - (150 * (outsideIndex + 1))
          upSubordinateArr[outsideIndex].push({
            id:item.stationId + item.direction + '23',
            x:upSubordinate_x,
            y:upSubordinate_y,
            // 上行从线站点在上方
            shape:'up-big-custom-circle',
            attrs:{
              label: {
                x:-60,
                y: 0,
                text: item.stationName,
              },
            },
            data:{
              ...item
            },
          })
          // 画转折位置实线
          upSubordinateLineArr.push({
            source: { x: ele.x + 15, y: upSubordinate_y + 10 },
            target: item.stationId + item.direction + '23',
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
                stroke: '#4BD17A',
                strokeWidth:7,
                connection: true,
                strokeLinecap: 'round',
              },
            },
          })
          // 画转折位置实线
          upSubordinateLineArr.push({
            source: ele.id,
            target: { x: ele.x + 10, y: upSubordinate_y + 10 },
            markup: [
              {
                tagName: 'path',
                selector: 'stroke',
              },
          
              {
                tagName: 'path',
                selector: 'fill',
              },
              {
                tagName: 'rect',
                selector: 'sign',
              },
              {
                tagName: 'text',
                selector: 'signText',
              },
          
            ],
            attrs: {
              fill: {
                connection: true,
                fill: 'none',
              },
              stroke: {
                fill: 'none',
                strokeDasharray: 10,
                targetMarker: 'classic',
                stroke: '#4BD17A',
                strokeWidth:5,
                connection: true,
                strokeLinecap: 'round',
              },
              sign: {
                x: 0,
                y: -10,
                width: 70,
                height: 20,
                stroke: '#237804',
                fill: '#fff',
                atConnectionLength: 30,
                strokeWidth: 1,
              },
              signText: {
                x: -45,
                y: -159,
                atConnectionLength: 30,
                stroke: '#237804',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
                text: '108路',
              },
            },
          })
        }
      })

    }else {
      // 经过第一个不同点后进行后续加点.
      if(upFirstDiff){
        upSubordinate_x = upSubordinate_x + 150
        upSubordinateArr[outsideIndex].push({
          id:item.stationId + item.direction + '34',
          x:upSubordinate_x,
          y:upSubordinate_y,
          // 上行从线站点在上方
          shape:'up-big-custom-circle',
          attrs:{
            label: {
              x:-60,
              y: 0,
              text: item.stationName,
            },
          },
          data:{
            ...item
          },
        })
      }
    }
  })
})

// 记录上行从线坐标值
let downSubordinate_x = 0
let downSubordinate_y = 0
// 下行合并线
downSubordinateLine.forEach((lineItem,outsideIndex)=>{
  downSubordinateArr.push([])
  lineItem.forEach((item,index)=>{
    let lastItem = lineItem[index == 0 ? index: index - 1]
    // 首次不同点
    if(item.isMerge == 2 && !downFirstDiff){
      downFirstDiff = true
      downArr.forEach((ele)=>{
        if(ele.id == lastItem.stationId + lastItem.direction){
          downSubordinate_x = ele.x + 150
          downSubordinate_y = ele.y + (150 * (outsideIndex + 1))
          downSubordinateArr[outsideIndex].push({
            id:item.stationId + item.direction + '23',
            x:downSubordinate_x,
            y:downSubordinate_y,
            // 下行站点线在下方
            shape:'down-big-custom-circle',
            attrs:{
              label: {
                x:80,
                y: -10,
                text: item.stationName,
              },
            },
            data:{
              ...item
            },
          })
          downSubordinateLineArr.push({
            source: { x: ele.x + 15, y: downSubordinate_y + 10 },
            target: item.stationId + item.direction + '23',
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
                stroke: '#668ff5',
                strokeWidth:7,
                connection: true,
                strokeLinecap: 'round',
              },
            },
          })
          // 画转折位置实线
          downSubordinateLineArr.push({
            source: ele.id,
            target: { x: ele.x + 10, y: downSubordinate_y + 10 },
            markup: [
              {
                tagName: 'path',
                selector: 'stroke',
              },
          
              {
                tagName: 'path',
                selector: 'fill',
              },
              {
                tagName: 'rect',
                selector: 'sign',
              },
              {
                tagName: 'text',
                selector: 'signText',
              },
          
            ],
            attrs: {
              fill: {
                connection: true,
                fill: 'none',
              },
              stroke: {
                fill: 'none',
                strokeDasharray: 10,
                targetMarker: 'classic',
                stroke: '#668ff5',
                strokeWidth:5,
                connection: true,
                strokeLinecap: 'round',
              },
              sign: {
                x: 0,
                y: -10,
                width: 70,
                height: 20,
                stroke: '#668ff5',
                fill: '#fff',
                atConnectionLength: 30,
                strokeWidth: 1,
              },
              signText: {
                x: 280,
                y: -159,
                atConnectionLength: 30,
                stroke: '#237804',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
                text: '108路',
              },
            },
          })
        }
      })
    }else {
      // 经过第一个不同点后进行后续加点.
      if(downFirstDiff){
        downSubordinate_x = downSubordinate_x + 150
        downSubordinateArr[outsideIndex].push({
          id:item.stationId + item.direction + '34',
          x:downSubordinate_x,
          y:downSubordinate_y,
          // 下行站点线在下方
          shape:'down-big-custom-circle',
          attrs:{
            label: {
              x:80,
              y: -10,
              text: item.stationName,
            },
          },
          data:{
            ...item
          },
        })
      }
    }
  })
})
const SubordinateArr  = initEdgeData(...upSubordinateArr,...downSubordinateArr)
downSubordinateLineArr.push(...SubordinateArr.downLineArr)
upSubordinateLineArr.push(...SubordinateArr.upLineArr)
return { upSubordinateArr, downSubordinateArr, upArr, upLineArr, downArr, downLineArr, downSubordinateLineArr,upSubordinateLineArr }
}

/**
 * 传入车辆数据+合并线路信息,返回合并从线车辆位置信息
 * @param {Array} vehicleList [当前线路车辆信息]
 * @param {Array} MergeRoute [当前线路车辆信息]
 */
export const initMergeCarData = ()=>{
  // todo
}