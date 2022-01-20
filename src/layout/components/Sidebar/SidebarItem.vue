<template>
  <div v-if="nav.meta && !nav.hide" class="menu-wrapper">
    <!-- 一级菜单 -->
    <el-menu-item
      v-if="!nav.children || !nav.children.length || nav.meta.type === 'one'"
      :index="nav.meta.type === 'one' ? `${nav.path}/${nav.children[0].path}` : nav.path"
      :class="{ 'submenu-title-noDropdown': !nav.isNest }"
    >
      <el-icon v-if="nav.meta.icon" class="elIcon">
        <component :is="nav.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ nav.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="nav.path">
      <!-- 二级菜单 -->
      <template #title>
        <el-icon v-if="nav.meta.icon" class="elIcon">
          <component :is="nav.meta.icon" />
        </el-icon>
        <span>{{ nav.meta.title }}</span>
      </template>
      <!-- 三级菜单 -->
      <div v-for="child in nav.children" :key="child.path">
        <SidebarItem
          v-if="child.children && child.children.length"
          :key="child.path"
          :index="child.path"
          :is-nest="true"
          :nav="child"
          class="nest-menu"
        />
        <el-menu-item v-else :index="`${nav.path}/${child.path}`">
          <el-icon v-if="child.meta.icon" class="elIcon">
            <component :is="child.meta.icon" />
          </el-icon>
          <template #title>
            <span>{{ child.meta.title }}</span>
          </template>
        </el-menu-item>
      </div>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps({
  nav: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  }
})
const { nav } = toRefs(props)
</script>