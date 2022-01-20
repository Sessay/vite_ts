<template>
  <el-dialog
    v-if="showModal"
    v-model="showModal"
    :title="menuData ? '新增菜单' : '新增产品'"
    width="30%"
    destroy-on-close
    center
  >
    <el-form ref="createForm" :model="formItem" label-width="100px">
      <el-form-item
        :label="menuData ? '菜单名称' : '产品名称'"
        prop="name"
        :rules="[{ required: true, message: '名称不能为空' }]"
      >
        <el-input
          v-model="formItem.name"
          type="name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item v-if="menuData" label="页面类型" prop="page_type">
        <el-select
          v-model="formItem.page_type"
          placeholder="Select"
          style="width: 100%"
          :disabled="editData"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeModal">
        取消
      </el-button>
      <el-button type="primary" @click="sureSubmit">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ProductOperate, ProductPageOperate } from '@/api/SettingApi'
import { ElMessage } from 'element-plus'
import { ref, reactive, toRefs } from 'vue'

const emit = defineEmits(['updataTable', 'updataProduct'])

interface FormItem {
  name: string,
  page_type: number,
  [str:string]: any
}

const state = reactive({
  showModal: false,
  menuData: false,
  editData: false,
  formItem: <FormItem> {
    name: '',
    page_type: 1
  },
  options: [
    { value: 1, label: '自定义页面' },
    { value: 2, label: '配置管理页面' },
  ]
})

const createForm = ref(null)

// 提交表格
const sureSubmit = () => {
  const { formItem, menuData, editData } = state;
  (createForm.value as any).validate((valid: any) => {
    if (valid) {
      if(!menuData) {
        ProductOperate('post', {name: formItem.name}).then(() => {
          ElMessage.success('产品新增成功')
          emit('updataProduct')
          closeModal()
        })
      } else {
        if(!editData) {
          ProductPageOperate('post', formItem).then(() => {
            ElMessage.success('菜单新增成功')
            emit('updataTable', formItem.production)
            closeModal()
          })
        } else {
          ProductPageOperate('patch', formItem).then(() => {
            ElMessage.success('编辑成功')
            emit('updataTable', formItem.production)
            closeModal()
          })
        }
      }
    } else {
      return false
    }
  })
}

// 关闭弹窗
const closeModal = () => {
  state.showModal = false;
  state.menuData = false;
  state.editData = false;
  (createForm.value as any).resetFields()
}

defineExpose({
  showModal: state.showModal,
  createForm
})

const { showModal, menuData, editData, formItem, options } = toRefs(state)
</script>