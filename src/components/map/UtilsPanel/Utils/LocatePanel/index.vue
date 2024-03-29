<template>
  <UtilPanel
    width="275px"
    :title="`${panel.utilName}工具`"
    :panel-id="panelID"
    :show-help-icon="false"
    @on-click-close="onClose"
  >
    <div class="locate-panel__content">
      <div v-if="startGetLocateCoord" class="tip text-center">通过单击地图以拾取坐标</div>
      <div v-else>
        <div class="operate-button">
          <el-button type="primary" @click="onGetLocate">从图上拾取坐标</el-button>
          <el-button type="default" @click="onClearCoordMarker">清除标记</el-button>
        </div>
        <el-form label-width="50px" class="mt-15">
          <el-form-item label="经度" class="mb-15">
            <el-input v-model="posLon" placeholder="请输入经度"></el-input>
          </el-form-item>
          <el-form-item label="纬度" class="mb-15">
            <el-input v-model="posLat" placeholder="请输入纬度"></el-input>
          </el-form-item>
          <el-form-item class="mb-0">
            <el-button type="primary" style="width: 100%" @click="onLocateTo">定位到该点</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </UtilPanel>
</template>

<script setup>
import { ref, computed, watch, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import UtilPanel from '@/components/common/UtilPanel/index.vue'
import { useMapStore } from '@/store'
import locatePanel from '@/common/mapEvents/modules/locatePanel.js'

const mapStore = useMapStore()
// 工具
const props = defineProps({
  // 面板
  panel: {
    type: Object,
    default: () => ({
      utilName: '日照'
    })
  },
  // 当前面板索引在panelList中的索引
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

// 开始拾取坐标
const startGetLocateCoord = computed(() => mapStore.startGetLocateCoord)
const view = computed(() => mapStore.view)

// 当前面板ID
const panelID = 'locatePanel'

const posLon = ref(0)
const posLat = ref(0)

watch(
  () => mapStore.locateData,
  (val) => {
    posLon.value = parseFloat(val.lon).toFixed(5)
    posLat.value = parseFloat(val.lat).toFixed(5)
  }
)

// 关闭面板
const onClose = () => {
  emit('close', {
    panel: props.panel,
    index: props.index,
    active: false,
    eventSuffix: 'Locate',
    panelID
  })
}

// 定位
const onLocateTo = () => {
  if (!posLon.value || !posLat.value || posLon.value == '0' || posLat.value == '0') {
    ElMessage.warning('请输入完整的非0坐标数值')
    return
  }

  const data = {
    title: '定位坐标',
    lon: posLon.value,
    lat: posLat.value,
    symbol: {
      color: 'red',
      type: 'simple-marker'
    }
  }

  locatePanel.onLocateToCoordAndMark(toRaw(view.value), data)
  locatePanel.onShowCoordMaker(toRaw(view.value), data)
}

// 拾取坐标
const onGetLocate = () => {
  mapStore.setStartGetLocateCoord(true)
  locatePanel.onGetLocateCoord(toRaw(view.value), { mapStore })
}

// 清除所有坐标标记
const onClearCoordMarker = () => {
  locatePanel.onClearCoordMarker(toRaw(view.value))
  mapStore.setLocateData({ lon: 0, lat: 0 })
}
</script>

<style lang="scss" scoped>
.locate-panel {
  &__content {
    padding: 2px;
  }
}

.operate-button {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6ebf5;
  padding-bottom: 15px;
}
</style>
