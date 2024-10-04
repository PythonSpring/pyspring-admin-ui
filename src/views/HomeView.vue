<template>
  <main>
    <el-container class="h-screen">
      <el-aside class="md:flex bg-gray-800 text-white w-36 flex-col"  :class="{ 'hidden': sidebarOpen}">
        <div class="p-4 text-xl font-bold">使用者</div>
        <el-menu
          default-active="1"
          class="bg-gray-800 text-white border-r-0 flex-grow"
          :default-openeds="['1']"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" class="text-white hover:bg-gray-600">
            <span>qwe</span>
          </el-menu-item>
          <el-menu-item index="2" class="text-white hover:bg-gray-600">
            <span>asd</span>
          </el-menu-item>
        </el-menu>
        <el-button type="primary" class="w-full bg-gray-600 hover:bg-gray-500 border-gray-600 hover:border-gray-500 rounded-none">
          <span>登出</span>
        </el-button>
      </el-aside>

      <el-container>
        <el-header class="bg-white border-b flex items-center justify-between md:justify-end">
          <el-icon  @click="toggleSidebar" class="text-black block md:hidden cursor-pointer"><More /></el-icon>
          <el-button type="primary" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">新增</el-button>
        </el-header>

        <!-- <el-main class="bg-white"> -->
          <el-table :data="tableData" class="bg-white rounded-lg shadow w-full text-center">
            <el-table-column prop="name" label="名稱" />
            <el-table-column prop="edit" label="編輯">
                <el-button type="primary" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                  <el-icon><Edit /></el-icon>
                </el-button>
            </el-table-column>
          </el-table>
        <!-- </el-main> -->

      </el-container>
    </el-container>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, More } from '@element-plus/icons-vue'

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
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

</script>

<style>
.el-menu-item.is-active {
  background-color: #4B5563;
}
</style>