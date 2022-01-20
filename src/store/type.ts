// import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

export interface App {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}

export interface Permission {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

export interface User {
  token: string | undefined
  roles: string | undefined
  name: string | undefined
  avatar: string | undefined
  introduction: string
}

export interface State {
  app: App
  permission: Permission
  user: User
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
