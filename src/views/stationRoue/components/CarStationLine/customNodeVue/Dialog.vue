<template>
  <div class="dialog_car" :style="{'top':`${props.y + 20}px`,'left':`${props.x - 300}px`}">
    <div class="dialog_car_header">
      <div class="route_name">
        {{ props.dialog_data.endStation }}
      </div>
      <div class="car_msg">
        <span class="car_num">{{ props.dialog_data.plateNo }} ({{ props.dialog_data.frontVehicleDistance }} ) </span>
        <span class="car_driver">驾驶员:{{ props.dialog_data.driverName }}</span>
        <span class="car_driver">部位:{{ props.dialog_data.place }}</span>
      </div>
      <div class="dialog_hide" @click="()=>emits('closeDilog')">
        X
      </div>
    </div>
    <div class="dialog_car_main">
      <div class="car_speed_detail">
        <div class="speed_meter">
          <span class="value">{{ props.dialog_data.speed }}</span>
          <span>km/h</span>
        </div>
        <div class="speed_station">
          <div />
        </div>
      </div>
      <div class="car_basic_detail">
        <div class="basic_timer">
          <span class="basic_font">定位时间:{{ props.dialog_data.locationTime }}</span>
          <span class="basic_font">前车距: {{ props.dialog_data.frontVehicleDistance }}</span>
          <span class="basic_font">后车距: {{ props.dialog_data.backVehicleDistance }}</span>
        </div>
        <div class="basic_state">
          <span class="basic_font">调度状态:{{}}</span>
          <span class="basic_font">车辆状态:{{}}</span>
          <span class="basic_font">运营状态:{{}}</span>
        </div>
        <div class="sigin_time">
          <span class="basic_font">签到时间:{{ props.dialog_data.signTime }}</span>
        </div>
      </div>
    </div>
    <div class="dialog_car_btn">
      <div v-for="item in methods" :key="item.btn" class="methods_btn">{{ item.btn }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  x: Number,
  y: Number,
  dialog_data: Object,
})
const methods = ref([
  {
    btn: '调度设置',
  },
  {
    btn: '轨迹回放',
  },
  {
    btn: '视频监控',
  },
  {
    btn: '短信下发',
  },
  {
    btn: '语音对讲',
  },
  {
    btn: '切换线路',
  },
  {
    btn: '发车时间修改',
  },
])
const emits = defineEmits('closeDilog')
nextTick(() => {
  const dialog_car = document.querySelector('.dialog_car')
  dialog_car.style.left = props.x
  dialog_car.style.top = props.y
})
</script>

<style lang="less" scoped>
.dialog_car{
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 632px;
  height: 308px;
  background: #091940;
  border: 1px solid #9BAFD6;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
  opacity: 0.95;
  border-radius: 10px;
  overflow: hidden;
  .dialog_car_header{
    display: flex;
    height: 40px;
    border-bottom: 1px #8DA0C7 solid;
    .dialog_hide{
      // width: 20px;
      height: 100%;
      line-height: 40px;
      margin-right: 10px;
      color: #fff;
      cursor: pointer;
    }
    .route_name{
      height: 100%;
      width: 77px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      background-color: #668ff5;
    }
    .car_msg{
      flex: 1;
      margin-left: 20px;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      .car_num{
        margin-right: 20px;
      }
      .car_driver{
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  .dialog_car_main{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 26px;
    .car_speed_detail{
      margin-bottom: 15px;
      .speed_meter{
        display: flex;
        padding-top: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 60px;
        color: #1CCFEB;
        background: url('./img/speed_meter.png') no-repeat;
        background-size: contain;
        .value{
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
    .car_basic_detail{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #fff;
      .basic_font{
        font-size: 16px;
        margin-right: 30px;
      }
    }
  }
  .dialog_car_btn{
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #1c2f61;
    border-top:1px #8DA0C7 solid;
    .methods_btn{
      box-sizing: border-box;
      cursor: pointer;
      font-size: 14px;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px #668ff5 solid;
      background-color: #091940;
      color: #fff;
      &:hover{
        background-color: #668ff5;
      }
    }

  }
}
</style>
