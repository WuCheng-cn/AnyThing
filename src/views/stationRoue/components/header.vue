<template>
  <div class="routeHeader">
    <div class="headerLeft">
      <div class="title">
        当前订阅
      </div>
      <div class="selectRoute">
        已选线路: <span class="numFont">{{ 2 }}</span> 条
      </div>
      <div class="link">
        <el-link type="primary" style="font-size: 16px;" @click="selectRoute">线路选择</el-link>
      </div>
      <div>
        总车数:<span class="numFont">{{ 2 }}</span>台
      </div>
      <div>
        运营车辆:<span class="numFont">{{ 2 }}</span>台
      </div>
      <div>
        非运营车辆:<span class="numFont">{{ 2 }}</span>台
      </div>
    </div>
    <div class="headerRight">
      <el-button size="small" :type="isCarNum ? '' : 'primary'" @click="switchShow(false)">显示车号</el-button>
      <el-button size="small" :type="isCarNum ? 'primary' : ''" @click="switchShow(true)">显示车牌</el-button>
      <el-tooltip
        class="box-item"
        effect="light"
        placement="bottom-end"
      >
        <template #content>
          <div class="carTooltip">
            <div v-for="item in status" :key="item.color" class="statusItem">
              <span class="statusColor" :style="{backgroundColor: item.color}" />
              <span>{{ item.statusName }}</span>
            </div>
          </div>
        </template>
        <template #default>
          <el-link type="primary" style="font-size: 14px; margin: 0 10px; height: 20px;">车辆状态显示</el-link>
        </template>
      </el-tooltip>
      <div style="font-size: 14px;line-height: 22px;">
        车辆定位: 
      </div>
      <el-input style="width: 200px; height: 22px;" />
      <el-link style="font-size: 14px; margin: 0 10px; height: 20px; color: #fff;">返回控制台</el-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const status = [
  {
    statusName: '正常',
    color: '#6fba2c',
  },
  {
    statusName: '报警',
    color: '#f23333',
  },
  {
    statusName: '串线',
    color: '#31cabc',
  },
  {
    statusName: '掉线',
    color: '#999999',
  },
]
const selectRoute = () => {
  console.log(1)
}
const emit = defineEmits(['changeCarNum', 'changeRoute'])
const isCarNum = ref(false)
const switchShow = (boolean) => {
  isCarNum.value = boolean
  emit('changeCarNum', boolean)
}

</script>

<style lang="less" scoped>
.routeHeader{
  display: flex;
  justify-content: space-around;
  padding: 20px;
  height: 56px;
  color: #fff;
  background-color: #091940;
  .headerLeft{
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .title{
      color: #fff;
      font-size: 22px;
    }
  }
  .headerRight{
    display: flex;
    justify-content: flex-end;
    flex: 3;
  }
}
.carTooltip{
  display: flex;
  padding: 10px;
  justify-content: space-around;
  .statusItem{
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    .statusColor{
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 10px;
    }
  }
}
</style>
