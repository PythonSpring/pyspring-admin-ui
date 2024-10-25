<template>
    <main>
      <el-container class="h-screen">

        <Sidebar :class="{ 'hidden': sidebarOpen, 'z-50 fixed inset-y-0 left-0': !sidebarOpen }" @singOut="singOut" :sidebarList="sidebarList" @getTableData="getTableData"/>

        <el-container class="h-[91%]">
          <el-header class="bg-white border-b flex items-center justify-between md:justify-end" >
            <el-icon   @click="toggleSidebar" class="text-black block md:hidden cursor-pointer" :class="{ 'fixed left-32 z-50 text-white': !sidebarOpen }">
              <Menu />
            </el-icon>
            <div>
              <el-button type="primary" :class="{ 'fixed right-5' : !sidebarOpen }" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                刪除
              </el-button>
              <el-button @click="openAddModal" type="primary" :class="{ 'fixed right-5' : !sidebarOpen }" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                新增
              </el-button>
            </div>
          </el-header>
          <template class="flex flex-col items-center h-full">
            <Table :tableData="tableData" :tableHeader="tableHeader" @openEditModal="openEditModal" :tableTitle="tableTitle"/>
          </template>
        </el-container>
        
        <EditModal class="z-50" v-if="EditIsVisible" @closeEditModal="closeEditModal" :formColumns="formColumns" :selectedRow="selectedRow"/>

        <AddModal class="z-50" v-if="AddIsVisible" @closeAddModal="closeAddModal" :formColumns="formColumns" :tableTitle="tableTitle" @submitForm="submitForm" :loadingAddModal="loadingAddModal"/>
        
      </el-container>
    </main>
</template>

<script setup>
  import { ref, onBeforeMount, watch, onBeforeUnmount, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Menu } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import Sidebar from '@/components/Sidebar.vue'
  import Table from '@/components/Table.vue'
  import EditModal from '@/components/EditModal.vue'
  import AddModal from '@/components/AddModal.vue'

  import { logout, tableNames, modelData, addModelData, enumChoices } from '@/composables/apis'

  const router = useRouter()

  const sidebarOpen = ref(true)
  const toggleSidebar = async () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const sidebarList = ref([])
  
  const singOut = async () =>{
    try {
      const res = await logout()
      if(res.status !== 200) return
      const message = ElMessage.success('登出成功!')
      setTimeout(() => {
        router.push('login') 
        message.close()
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
    console.log(name)
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
  
  const EditIsVisible = ref(false)
  const selectedRow = ref({})
  const openEditModal = (row) => {
    selectedRow.value = row
    EditIsVisible.value = true
  }
  const closeEditModal = () => {
    EditIsVisible.value = false
  }

  const AddIsVisible = ref(false)
  const openAddModal = async () => {
    AddIsVisible.value = true
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
    }
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
  const submitForm = async (formData) => {
    loadingAddModal.value = true
    console.log(Object.entries(formData))
    const formattedData = Object.entries(formData).map(([key, value]) => ({
        key: key,
        value: value
    }))
    console.log(formattedData)
    try {
      const res = await addModelData(tableTitle.value, formattedData)
      console.log(res)
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
</script>