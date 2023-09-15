<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      bordered
      collapse-mode="transform"
      show-trigger="bar"
      content-style="padding: 24px;"
      :width="240"
      :collapsed-width="0"
      :on-after-leave="resize"
      :on-after-enter="resize"
    >
      <n-h2>数据源</n-h2>
      <div
        v-for="(item) in gridLists"
        :key="item.code"
        @dragstart="onStart"
      >
        <n-space vertical size="large">
          <n-tag
            type="warning"
            class="item"
            draggable="true"
            :data-str="item.str"
          >
            {{ item.code }}
          </n-tag>
        </n-space>
      </div>
    </n-layout-sider>
    <n-layout content-style="display: flex;flex-direction: column;">
      <n-layout-header>
        <n-space size="large" style="padding: 10px 50px;">
          <n-upload
            ref="upload"
            accept=".xlsx"
            :default-upload="false"
            :show-file-list="false"
            @change="loadExcel"
          >
            <n-button strong secondary type="warning">选择文件</n-button>
          </n-upload>
          <n-button
            strong
            secondary
            type="warning"
            @click="downloadExcel"
          >
            下载
            <template #icon>
              <DownloadOutline />
            </template>
          </n-button>
        </n-space>
      </n-layout-header>
      <n-layout-content style="flex: 1;">
        <div id="luckysheet" style=" margin:0 50px;  height:100%;" />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LuckyExcel from 'luckyexcel'
import { DownloadOutline } from '@vicons/ionicons5'
import type { UploadFileInfo } from 'naive-ui'
import { exportExcel } from '../../utils/export'

const jsonData = ref({})
const options = ref({
  container: 'luckysheet',
  title: '测试Excel', // 表 头名
  lang: 'zh', // 中文
  showtoolbar: true, // 是否显示工具栏
  showinfobar: false, // 是否显示顶部信息栏
  showsheetbar: true, // 是否显示底部sheet按钮
  hook: {
    cellDragStop: (cell:any, postion:any, sheetFile:any, ctx:any, event:any) => {
      console.log(postion)
      window.luckysheet.setCellValue(postion.r, postion.c, targetValue.value)
    },
  },

})
const gridLists = ref([
  { code: '设备编码', str: '{设备编码}' },
  { code: '设备ID', str: '{设备ID}' },
  { code: '设备名称', str: '{设备名称}' },
  { code: '制造商', str: '{制造商}' },
])

const targetValue = ref()

// 拖拽开始的事件
const onStart = (e:any) => {
  console.log('开始拖拽', e)
  targetValue.value = e.target.dataset.str
}

// 导入excel
const loadExcel = (evt: { fileList: UploadFileInfo[] }) => {
  console.log(evt)
  const files = evt.fileList.map(_ => _.file) as unknown as File[]
  if (files == null || files.length == 0) {
    alert('请选择文件')
    return
  }
  // 获取文件名
  const name = files[0].name
  // 获取文件后缀
  const suffixArr = name.split('.')
  const suffix = suffixArr[suffixArr.length - 1]
  if (suffix != 'xlsx') {
    alert('当前只能导入xlsx格式文件')
    return
  }
  // 转换导入的excel
  LuckyExcel.transformExcelToLucky(
    files[0],
    (exportJson:any, luckysheetfile:any) => {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert('无法读取excel文件的内容，当前不支持xls文件!')
        return
      }
      // console.log('exportJson', exportJson)
      jsonData.value = exportJson
      // 销毁之前的表格
      window.luckysheet.destroy()
      // 创建新的表格
      window.luckysheet.create({
        ...options.value,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator,
      })
    },
  )
}
const downloadExcel = () => {
  console.log('下载的数据：', window.luckysheet.getAllSheets())
  // 第2个参数是导出的文件名
  exportExcel(window.luckysheet.getAllSheets(), '下载')
}

const resize = () => {
  window.luckysheet.resize()
}
onMounted(() => {
  window.luckysheet.create(options.value)
})
</script>

<style scoped lang="less">
.item{
  margin-bottom: 10px;

}
.item:hover {
  cursor: move;
}
</style>
