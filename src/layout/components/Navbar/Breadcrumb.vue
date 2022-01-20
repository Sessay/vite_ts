<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.redirect || item.path">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationMatched } from 'vue-router'
export default defineComponent({
  name: 'BreadCrumb',
  data() {
    return {
      levelList: [] as Pick<RouteLocationMatched, 'meta' | 'path' | 'redirect'>[]
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      console.log('levelList', this.levelList)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  line-height: 50px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>