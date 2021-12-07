<script setup lang="ts">
import { ref, reactive, computed, toRefs } from 'vue'

defineProps<{ msg: string }>()

type TState = {
  num: number;
  dobuleNum: number;
}
const state: TState = reactive({
  num: 0,
  dobuleNum: computed(() => state.num * 2)
})

const increment = () => {
  state.num++;
}

const count = ref(0)
const { num } = { ...toRefs(state) }

const doubleCount = computed(() => count.value + 1)
console.log('doubleCount', doubleCount)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ num }}</div>
  <!-- <button type="button" @click="increment">增加</button> -->
  <button type="button" @click="count++">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
