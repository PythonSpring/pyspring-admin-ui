<template>
    <el-aside class="md:flex bg-gray-800 text-white w-40 flex flex-col">
        <div class="p-4 text-xl font-bold">使用者</div>
        <el-menu
          default-active="1"
          class="bg-gray-800 text-white border-r-0 flex-1"
          :default-openeds="['1']"
          active-text-color="#ffd04b"
        >
          <el-menu-item @click="$emit('getTableData', name)" v-for="(name, index) in sidebarList" :index="(index + 1).toString()" :key="name" class="text-white hover:bg-gray-600">
            <span>{{ name }}</span>
          </el-menu-item>
        </el-menu>
        <el-button @click="$emit('singOut')" type="primary" class="w-full bg-gray-600 hover:bg-gray-500 border-gray-600 hover:border-gray-500 rounded-none">
          <span>登出</span>
        </el-button>
    </el-aside>
</template>

<script setup>
    defineProps({
        sidebarList: {
            type: Array,
            default: () => []
        }
    })
    defineEmits(['singOut', 'getTableData'])
</script>

<style scoped>
    .el-menu-item.is-active {
      background-color: #4B5563;
    }
</style>
    
