<template>
    <main>
      <el-container class="h-screen">
        <Sidebar :class="{ 'hidden': sidebarOpen, 'z-50 fixed inset-y-0 left-0': !sidebarOpen}" @singOut="singOut" :sidebarList="sidebarList" @getTableData="getTableData"/>
        <el-container>
          <el-header class="bg-white border-b flex items-center justify-between md:justify-end" >
            <el-icon   @click="toggleSidebar" class="text-black block md:hidden cursor-pointer" :class="{'fixed left-32 z-50 text-white': !sidebarOpen}"><Menu /></el-icon>
            <el-button type="primary" :class="{'fixed right-5' : !sidebarOpen}" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">新增</el-button>
          </el-header>

          <Table :tableData="tableData" :tableHeader="tableHeader" @openModal="openModal" :tableTitle="tableTitle"/>

        </el-container>
        <Modal class="z-50" v-if="isVisible" @closeModal="closeModal" :formColumns="formColumns"/>
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
  import Modal from '@/components/Modal.vue'

  import { logout, tableNames, modelData } from '@/composables/apis'

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
    try {
      const res = await modelData(name)
      tableTitle.value = name
      if(res.data.rows.length === 0) return tableHeader.value = []
      tableData.value = res.data.rows
      formColumns.value = res.data.columns
      tableHeader.value = Object.keys(res.data.rows[0])
    } catch (error) {
      // 錯誤處理邏輯可以在這裡添加
    }
  }
  
  const isVisible = ref(false)
  const openModal = () => {
    isVisible.value = true
  }
  const closeModal = () => {
    isVisible.value = false
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
      formColumns.value = modelDataRes.data.columns
      tableHeader.value = Object.keys(modelDataRes.data.rows[0])
    } catch (error) {
      // 錯誤處理邏輯可以在這裡添加
    }
  })
</script>