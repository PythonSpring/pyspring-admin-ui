<template>
    <main>
      <el-container class="h-screen">
        <Sidebar :sidebarOpen="sidebarOpen" @singOut="singOut" :sidebarList="sidebarList" @getTableData="getTableData"/>
        <el-container>
          <el-header class="bg-white border-b flex items-center justify-between md:justify-end">
            <el-icon  @click="toggleSidebar" class="text-black block md:hidden cursor-pointer"><Menu /></el-icon>
            <el-button type="primary" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">新增</el-button>
          </el-header>

          <Table :tableData="tableData" />

        </el-container>
      </el-container>
    </main>
</template>

<script setup>
  import { ref, nextTick, onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router'
  import { Menu } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import Sidebar from '@/components/Sidebar.vue'
  import Table from '@/components/Table.vue'

  import { logout, tableNames } from '@/composables/apis'

  const router = useRouter()

  

  const sidebarOpen = ref(true)
  const toggleSidebar = async () => {
    sidebarOpen.value = !sidebarOpen.value
    // await nextTick()
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
  const tableData = ref([
    { name: '4421', date: '2024-09-25T14:20:23' },
    { name: 'asdsd', date: '2024-09-25T13:37:54' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
    { name: 'vsssssss', date: '2024-09-25T14:20:23' },
  ])
  const getTableData = async (name) => {
    try {
    //   const res = await getTableData(name)
    //   tableData.value = res.data
    // } catch (error) {
      throw error
    }
  }

  onBeforeMount( async () => {
    try {
      const res = await tableNames()
      sidebarList.value = res.data
    } catch (error) {
      throw error
    }
  })
</script>