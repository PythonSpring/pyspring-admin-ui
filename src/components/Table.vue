<template>
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
</template>

<script setup>
    import { Edit } from '@element-plus/icons-vue'
    defineProps({
        tableData: {
            type: Array,
            default: () => []
        }
    })
</script>