<template>
  <el-card class="common-card">
    <template #header>
      <span class="common-card-title">
        产品管理
      </span>
    </template>
    <div class="commom-card-content">
      <div class="setting-operate">
        <el-input
          v-model="name"
          placeholder="请输入产品名称"
          style="width: 300px"
          clearable
          @change="getProduct"
        >
          <template #prefix>
            <el-icon class="el-input-search">
              <i-search />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="createProduct">
          新增产品
        </el-button>
      </div>
      <div v-if="!productData.length" class="common-nodata">
        <span class="common-nodata-label">
          暂无数据
        </span>
      </div>
      <div v-else>
        <div v-for="(item, index) in productData" :key="item.id">
          <div class="common-flex product-title">
            <div v-if="!state.editName[index]" class="product-name">
              {{ item.name }}
            </div>
            <div v-if="editName[index]" class="product-name">
              <el-input
                v-model="item.name"
                placeholder="请输入产品名称"
                style="width: 300px"
              />
            </div>
            <el-popconfirm
              v-if="editName[index]"
              title="确定要删除该产品吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              placement="top"
              @confirm="delProduct(item.id)"
            >
              <template #reference>
                <el-button type="danger" size="medium">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
            <el-button
              v-if="editName[index]"
              type="primary"
              size="medium"
              @click.self="saveMenu(item, index)"
            >
              完成
            </el-button>
            <el-button
              v-if="!editName[index]"
              type="primary"
              size="medium"
              @click="editProductName(index)"
            >
              编辑
            </el-button>
          </div>
          <a-table
            :ref="`aTable${item.id}`"
            :key="`table${item.id}`"
            :table-config="tableConfig"
            :request-fun="
              () => getTableData({ params: { production: item.id } })
            "
            @on-operate-edit="OperateEditData"
            @on-operate-del="OperateDelData"
          >
            <template #name="{ scope }">
              <span v-if="!scope.row.add">
                {{ scope.row.name }}
              </span>
              <div v-else class="product-add-menu">
                <el-button type="primary" size="medium" @click="addMenu(item)">
                  新增菜单
                </el-button>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <CreateModal
      ref="createModal"
      @updata-table="updataTable"
      @updata-product="getProduct"
    />
  </el-card>
</template>

<script lang="ts" setup>
import CreateModal from './CreateModal.vue'
import { ProductOperate, ProductPageOperate } from '@/api/SettingApi'
import { ElMessage } from 'element-plus'
// import { mapActions } from 'vuex'
import { reactive, onMounted, ref, toRefs, nextTick } from 'vue'
const emit = defineEmits(['changeMenu'])

// const actionMenuList = mapActions(['actionMenuList'])
const createModal = ref(null)

const state = reactive({
  name: '',
  productData: [] as any,
  tableConfig: {
    hasOperation: true,
    border: true,
    addColumn: true,
    columns: [
      {
        id: 1,
        label: '菜单名称',
        prop: 'name',
        align: 'left',
        minWidth: '100',
        show: 'template'
      },
      {
        id: 2,
        label: '页面类型',
        prop: 'page_type',
        align: 'left',
        minWidth: '100',
        formatData: ({ cellValue }: any) => {
          const arr = ['', '自定义页面', '配置管理页面']
          return arr[Number(cellValue)]
        }
      }
    ],
    operation: {
      label: '操作',
      width: '220',
      data: [
        { icon: 'i-edit', type: 'text' },
        { icon: 'i-delete', type: 'text', color: '#F56C6C' }
      ]
    }
  },
  editName: [] as boolean[]
})

onMounted(() => {
  getProduct()

})

const getProduct = () => {
  ProductOperate('get', {name: state.name}).then((res:[]) => {
    state.productData = res
    emit('changeMenu')
  })
}

const createProduct = () => {
  (createModal.value as any).showModal = true
}

const editProductName = (index:number) => {
  state.editName[index] = true
}

// 获取产品列表
const getTableData = ({ params }: { [str: string]:any }) => {
  return ProductPageOperate('get', params)
}

// 删除产品
const delProduct = (id:number) => {
  ProductOperate('delete', {id}).then(() => {
    ElMessage.success('删除成功')
    getProduct()
  })
}

// 修改产品名称
const saveMenu = (data:any, index:number) => {
  if(data.name) {
    ProductOperate('patch', data).then(() => {
      ElMessage.success('产品名称修改成功')
      state.editName[index] = false
      getProduct()
    })
  } else {
    ElMessage.error('产品名称不能为空')
  }
}

// 编辑菜单
const OperateEditData = (data:any) => {
  (createModal.value as any).menuData = true;
  (createModal.value as any).editData = true;
  (createModal.value as any).formItem = data;
  nextTick(() => {
    (createModal.value as any).showModal = true;
  })
}

// 删除菜单
const OperateDelData = (data:any) => {
  ProductPageOperate('delete', { id: data.id }).then(() => {
    ElMessage.success('删除成功');
    (`aTable${data.production}` as any).getData();
    emit('changeMenu')
  })
}

// 新增菜单
const addMenu = (data:any) => {
  (createModal.value as any).menuData = true;
  (createModal.value as any).formItem.production = data.id;
  nextTick(() => {
    (createModal.value as any).showModal = true;
  })
}

// 更新表格数据
const updataTable = (id:number) => {
  (`aTable${id}` as any).getData();
  emit('changeMenu')
}

const { name, productData, tableConfig, editName} = toRefs(state)
</script>

<style scoped>
.setting-operate {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-title {
  margin: 20px 0px;
}
.product-name {
  margin-right: 10px;
}
.product-add-menu {
  width: 100%;
  text-align: center;
}
</style>