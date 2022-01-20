<template>
  <div class="navbar" mode="horizontal">
    <Hamburger class="hamburger-container" :is-active="opened" @toggleclick="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img :src="avatar ? avatar : avatarImg" class="user-avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editPossword">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item divided @click="loginOut">
              <div>登出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '../../../store/index'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import avatarImg from '../../../assets/snowWhite.jpg'
const router = useRouter()
const opened = computed(() => store.state.app.sidebar.opened)
const avatar = computed(() => store.state.user.avatar)
const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}
const editPossword = () => {
  ElMessage.warning('请联系管理员')
}
const loginOut = () => {
  ElMessageBox.confirm('退出登录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.push('/login')
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  background-color: #fff;
  .hamburger-container {
    float: left;
    height: 50px;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  :deep(.right-menu) {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      // height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        margin-top: 5px;
        .user-avatar {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          top: 20px;
          right: -16px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-dropdown-menu__item--divided::before {
  display: none;
}
</style>