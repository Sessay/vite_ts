import { Module } from 'vuex'
import { App } from '../type'

const appModule: Module<App, any> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation: boolean) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, withoutAnimation: boolean) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  }
}

export default appModule