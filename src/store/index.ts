
import { createStore, createLogger } from 'vuex'
import createPersistedstate from './plugins/persistedstate'
import { State } from './type'

const debug = process.env.NODE_ENV !== 'production'

// Vite supports importing multiple modules from the file system using the special import.meta.glob function
// see https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.ts')
const pathList: string[] = []

for (const path in modulesFiles) {
  pathList.push(path)
}

const modules = pathList.reduce((modules: any, modulePath: string) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore<State>({
  modules,
  plugins: debug
  ? [createLogger(), createPersistedstate({storage: window.sessionStorage})]
  : [createPersistedstate({storage: window.sessionStorage})]
})

export default store
