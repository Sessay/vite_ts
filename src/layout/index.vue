<template>
  <div class="app-wrapper" :class="classObj">
    <!--侧边栏-->
    <Sidebar />
    <!--主体内容-->
    <div class="main-container">
      <!--顶部导航-->
      <Navbar />
      <!--主页面-->
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import store from '../store/index.ts'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain.vue'
const opened = computed(() => store.state.app.sidebar.opened)
const withoutAnimation = computed(() => store.state.app.sidebar.withoutAnimation)
const classObj = computed(() => {
  console.log('opened', opened.value)
  return {
    hideSidebar: !opened.value,
    openSidebar: opened.value,
    withoutAnimation: withoutAnimation.value
  }
})
</script>

<style lang="scss" scoped>
$sideBarWidth: 210px;
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: $sideBarWidth;
    transition: margin-left 0.28s;
  }
}
</style>