/**
 * @moduleName 系统通用操作
 * @author Jin Cheng
 * @description
 * @date 2023-03-30
 */

// import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMapStore } from '@/store'
import { ElMessageBox } from 'element-plus'

export default function () {
  const route = useRoute()
  const router = useRouter()
  const mapStore = useMapStore()
  //   const store = useStore()

  // 页面加载
  //   const pageLoading = computed(() => store.getters.pageLoading)

  // 地图全局数据
  //   const mapData = computed(() => store.getters.mapData)

  /**
   * 设置页面加载Loading
   *
   * @param {String} val 加载值
   */
  //   function setPageLoading(val) {
  //     store.dispatch('app/setPageLoading', val)
  //   }

  /**
   * 显示开发提示框
   */
  function showDevMessage() {
    ElMessageBox.alert('功能建设中，敬请期待', '温馨提示', {
      confirmButtonText: '确定'
    })
  }

  /**
   * 返回上一页
   */
  function goBack() {
    router.go(-1)
  }

  /**
   * 跳转页面路径
   *
   * @param {String} path 路径
   */
  function toPage(path) {
    router.push({ path })
  }

  /**
   * 修改配置
   *
   * @param {*} key 键
   * @param {*} value 值
   */
  //   const changeSettings = (key, value) => {
  //     store.dispatch('settings/changeSetting', {
  //       key,
  //       value
  //     })
  //   }

  /**
   * 修改地图全局数据
   *
   * @param {*} key 键
   * @param {*} value 值
   */
  //   const changeMapData = (key, value) => {
  //     store.dispatch('map/changeMapData', {
  //       key,
  //       value
  //     })
  //   }

  /**
   * 地图事件派遣
   *
   * @param {*} events 事件名或者一个包含事件对象的事件数组
   * @param {*} data 传递数据
   */
  const dispatchMapEvent = (events, data) => {
    const type = typeof events

    // 以对象方式单传一个方法
    if (type === 'string') {
      mapStore.changeMapEvent([{ event: events, data }])
      // store.$patch({
      //     counter: store.counter + 1,
      //     name: 'Abalam',
      //   })
      //   store.dispatch('map/changeMapEvent', [
      //     {
      //       event: events,
      //       data
      //     }
      //   ])
    }
    // 以数组方式传递多个方法
    else if (type === 'object') {
      //   store.dispatch('map/changeMapEvent', events)
    }
  }

  return {
    route,
    router,
    mapStore,
    // store,
    // pageLoading,
    // mapData,
    // setPageLoading,
    showDevMessage,
    goBack,
    toPage,
    // changeSettings,
    // changeMapData,
    dispatchMapEvent
  }
}
