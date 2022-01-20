<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <transition name="fade-transform" mode="out-in">
        <div class="flex-center">
          <img class="logo-img" src="../../../assets/logo.png" alt="logo" />
          <h1 v-show="opened" class="logo-text">
            Vue Element Admin
          </h1>
        </div>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        class="v-enter-to"
        :default-active="$route.path"
        :collapse="isCollapse"
        :show-timeout="200"
        text-color="#fff"
        background-color="#4a5a74"
        active-text-color="#409EFF"
      >
        <SidebarItem v-for="item in routerList" :key="item.path" :index="item.path" :nav="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import store from '../../../store/index'
import SidebarItem from './SidebarItem.vue'
import { useRouter } from 'vue-router'
let routerList = ref([])
const opened = computed(() => store.state.app.sidebar.opened)
const isCollapse = computed(() => !opened.value)
onMounted(() => {
  filterRoutes()
})
/**
 * 过滤路由
 */
const filterRoutes = () => {
  const router = useRouter();
  const routes = router.options.routes;
  routerList.value = routes.filter(arg => arg.path !== '/');
  console.log('routerList', routerList.value)
}
</script>

<style lang="scss" scoped="scoped">
.logo {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  .logo-img {
    width: 26px;
    height: 26px;
  }
  .logo-text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>