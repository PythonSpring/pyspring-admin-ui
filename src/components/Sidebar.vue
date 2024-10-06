<template>
    <el-aside class="md:flex bg-gray-800 text-white w-40 flex flex-col"  :class="{ 'hidden': sidebarOpen}">
        <div class="p-4 text-xl font-bold">使用者</div>
        <el-menu
          default-active="1"
          class="bg-gray-800 text-white border-r-0 flex-1"
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
</template>

<script setup>
    defineProps({
        sidebarOpen: {
            type: Boolean,
            default: true
        }
    })
</script>

<style scoped>
    .el-menu-item.is-active {
    background-color: #4B5563;
    }
</style>
    
