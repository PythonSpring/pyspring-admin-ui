<template>
    <main>
      <el-container class="h-screen">

        <Sidebar :class="{ 'hidden': sidebarOpen, 'z-50 fixed inset-y-0 left-0': !sidebarOpen }" @singOut="singOut" :sidebarList="sidebarList" @getTableData="getTableData"/>

        <el-container class="h-[91%]">
          <el-header :class="[getThemeClasses('default'), ' dark:border-gray-700 border-b flex items-center justify-between md:justify-end']">
            <el-icon   @click="toggleSidebar" :class="[
              'block md:hidden cursor-pointer',
              getThemeClasses('text'),
              { 'fixed left-32 z-50 text-white': !sidebarOpen }
            ]">
              <Menu />
            </el-icon>
            <div>
              <el-button @click="confirmDelete" type="primary" :class="{ 'fixed right-5' : !sidebarOpen }" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                刪除
              </el-button>
              <el-button @click="openAddModal" type="primary" :class="{ 'fixed right-5' : !sidebarOpen }" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                新增
              </el-button>
            </div>
          </el-header>
          <template class="flex flex-col items-center h-full">
            <Table :tableData="tableData" :tableHeader="tableHeader" @openEditModal="openEditModal" :tableTitle="tableTitle" :multipleSelection="multipleSelection" @handleSelectionChange="handleSelectionChange"/>
          </template>
        </el-container>
        
        <EditModal class="z-50" v-if="EditIsVisible" @closeEditModal="closeEditModal" :formColumns="formColumns" :selectedRow="selectedRow" :loadingUpdateModal="loadingUpdateModal" @submitUpdateForm="submitUpdateForm"/>

        <AddModal class="z-50" v-if="AddIsVisible" @closeAddModal="closeAddModal" :formColumns="formColumns" :tableTitle="tableTitle" @submitAddForm="submitAddForm" :loadingAddModal="loadingAddModal"/>
        
      </el-container>
    </main>
</template>

<script setup>
  import { ref, onBeforeMount, watch, onBeforeUnmount, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Menu } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import Sidebar from '@/components/Sidebar.vue'
  import Table from '@/components/Table.vue'
  import EditModal from '@/components/EditModal.vue'
  import AddModal from '@/components/AddModal.vue'

  import { logout, tableNames, modelData, addModelData, enumChoices, updateModel, deleteModel } from '@/composables/apis'
  import { useDarkMode } from '@/composables/useDarkMode'
  

  const router = useRouter()
  const { getThemeClasses } = useDarkMode()

  const sidebarOpen = ref(true)
  const toggleSidebar = async () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const sidebarList = ref([])
  
  const singOut = async () =>{
    try {
      const res = await logout()
      if(res.status !== 200) return
      ElMessage.success({
        message: '登出成功!',
        type: 'success',
        duration: 1000
      })
      setTimeout(() => {
        router.push('login') 
      }, 1000)
    } catch (error) {
      ElMessage.success('登出失敗!')
    }
  }
  const tableData = ref([])
  const tableHeader = ref([])
  const formColumns = ref([])
  const tableTitle = ref('')
  const getTableData = async (name) => {
    try {
      const res = await modelData(name)
      tableTitle.value = name
      formColumns.value = res.data.columns.filter((col)=> !col.field.toLowerCase().includes('id'))
      if(res.data.rows.length === 0) return tableHeader.value = []
      tableData.value = res.data.rows
      tableHeader.value = Object.keys(res.data.rows[0])
    } catch (error) {
      // 錯誤處理邏輯可以在這裡添加
    }
  }

  const getOptions = async () => {
    try {
      const enumColumns = formColumns.value.filter(column => column.is_enum)
      const enumOptionsPromises = enumColumns.map(column => 
        enumChoices(tableTitle.value, column.field)
      )
      const enumOptionsResponses = await Promise.all(enumOptionsPromises)
      enumOptionsResponses.forEach((res, index) => {
        
        const column = enumColumns[index]
        column.options = res.data.map(item => ({
          value: item,
          label: item
        }))
      })
    } catch (error) {
      console.error('獲取選項失敗', error)
      // 錯誤處理邏輯可以在這裡添加
    }
  }
  
  const EditIsVisible = ref(false)
  const selectedRow = ref({})
  const openEditModal = async (row) => {
    selectedRow.value = row
    EditIsVisible.value = true
    getOptions()

  }
  const closeEditModal = () => {
    EditIsVisible.value = false
  }

  const AddIsVisible = ref(false)
  const openAddModal = async () => {
    AddIsVisible.value = true
    getOptions()
  }
  const closeAddModal = () => {
    AddIsVisible.value = false
  }

  const isMdScreen = ref(window.innerWidth)
  watch(isMdScreen, (nV) => {
    if (nV >= 768) sidebarOpen.value = true
  })
  
  const updateScreenSize = () => {
    isMdScreen.value = window.innerWidth
  }
  onMounted(() => {
      window.addEventListener('resize', updateScreenSize)
  })

  onBeforeUnmount(() => {
      window.removeEventListener('resize', updateScreenSize)
  })
  
  onBeforeMount( async () => {
    try {
      const tableNamesRes = await tableNames()
      sidebarList.value = tableNamesRes.data
      const modelDataRes = await modelData(tableNamesRes.data[0])
      tableTitle.value = modelDataRes.data.table_name
      tableData.value = modelDataRes.data.rows
      formColumns.value = modelDataRes.data.columns.filter((col)=> !col.field.toLowerCase().includes('id'))
      tableHeader.value = Object.keys(modelDataRes.data.rows[0])
    } catch (error) {
      // 錯誤處理邏輯可以在這裡添加
    }
  })


  const loadingAddModal = ref(false)
  const submitAddForm = async (formData) => {
    loadingAddModal.value = true
    const formattedData = Object.entries(formData).map(([key, value]) => ({
        key: key,
        value: value
    }))
    try {
      const res = await addModelData(tableTitle.value, formattedData)
      loadingAddModal.value = false
      ElMessage.success('新增成功!')
      AddIsVisible.value = false
      await getTableData(tableTitle.value)
    } catch (error) {
      console.log(error)
      ElMessage.success('新增失敗!')
      loadingAddModal.value = false
    }
  }

  const loadingUpdateModal = ref(false)
  const submitUpdateForm = async (formData) => {
    loadingUpdateModal.value = true
    const formattedData = Object.entries(formData).map(([key, value]) => ({
        key: key,
        value: value
    }))
    try {
      const res = await updateModel(tableTitle.value, formattedData)
      loadingUpdateModal.value = false
      ElMessage.success('更新成功!')
      AddIsVisible.value = false
      await getTableData(tableTitle.value)
    } catch (error) {
      console.log(error)
      ElMessage.success('更新失敗!')
      loadingUpdateModal.value = false
    }
  }

  const multipleSelection = ref([])
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  const confirmDelete = async () => {
    if (multipleSelection.value.length === 0) return ElMessage.warning({message: '請選擇要刪除的項目',type: 'warning',duration: 1000})
    try {
      await ElMessageBox.confirm(
        '確定要刪除選中的項目嗎？',
        '警告',
        {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          customClass: 'custom-message-box',
          confirmButtonClass:'bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600',
          cancelButtonClass:'hover:border-gray-300 hover:bg-gray-200 hover:text-gray-700',
        }
      )
      // 執行刪除邏輯
      const deleteRes = await deleteModel(tableTitle.value, multipleSelection.value)
      if( deleteRes.data.status !== 200 ) return ElMessage.success({ message: '刪除失敗',type: 'error',duration: 1000 })
      ElMessage.success(
        {
            message: '刪除成功',
            type: 'success',
            duration: 1000
        })
      await getTableData(tableTitle.value)
    } catch {
      ElMessage.info(
        {
            message: '已取消刪除',
            type: 'info',
            duration: 1000
        })
    }
}
</script>

<style>
  .custom-message-box .el-message-box__headerbtn:hover .el-message-box__close {
      color: #626467;
  }

</style>