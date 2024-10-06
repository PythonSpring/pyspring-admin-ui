<template>
    <main>
      <el-container class="h-screen">
        <Sidebar :sidebarOpen="sidebarOpen"/>
        <el-container>
          <el-header class="bg-white border-b flex items-center justify-between md:justify-end">
            <el-icon  @click="toggleSidebar" class="text-black block md:hidden cursor-pointer"><Menu /></el-icon>
            <el-button type="primary" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">新增</el-button>
          </el-header>

          <Table :tableData="tableData"/>

        </el-container>
      </el-container>
    </main>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import Sidebar from '@/components/Sidebar.vue'
import Table from '@/components/Table.vue'
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

    const sidebarOpen = ref(true)
    const toggleSidebar = async () => {
      sidebarOpen.value = !sidebarOpen.value
      await nextTick()
    }

</script>