<template>
    <h2 class="text-center font-bold text-3xl p-2 text-gray-500">{{ tableTitle }}</h2>
    <el-main class="bg-white">
    <el-table v-if="tableHeader.length !== 0" :data="tableData" class="bg-white rounded-lg shadow text-lg">
        <el-table-column v-for="(col, index) in tableHeader" :prop="col" :label="col" :key="index"/>
        <el-table-column label="edit">
            <template v-slot="scope">
                <el-button @click="$emit('openEditModal', scope.row)" type="primary" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                      <el-icon><Edit /></el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <p v-else class="text-center text-lg text-gray-500">No data</p>
    </el-main>
</template>

<script setup>
    import { Edit } from '@element-plus/icons-vue'
    defineProps({
        tableData: {
            type: Array,
            default: () => []
        },
        tableHeader: {
            type: Array,
            default: () => []
        },
        tableTitle:{
            type: String,
            default: () => ''
        }
    })
    defineEmits(['openEditModal'])
</script>
