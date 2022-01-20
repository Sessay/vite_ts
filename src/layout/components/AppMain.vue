
   
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  position: relative;
  height: calc(100vh - 50px);
  padding: 20px;
  overflow-x: hidden;
}
</style>