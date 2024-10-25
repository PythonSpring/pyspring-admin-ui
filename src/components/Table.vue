<template>
    <h2 class="text-center font-bold text-3xl p-2 text-gray-500 mb-4">{{ tableTitle }}</h2>
        <el-table ref="multipleTableRef" border  v-if="tableHeader.length !== 0" :data="tableData" class="bg-white rounded-lg shadow text-lg"  style="width: 96%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" />
            <el-table-column v-for="(col, index) in tableHeader" :prop="col" :label="col" :key="index"  :min-width="142" />
            <el-table-column label="edit">
                <template v-slot="scope">
                    <el-button @click="$emit('openEditModal', scope.row)" type="primary" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                        <el-icon><Edit /></el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <p v-else class="text-center text-lg text-gray-500">No data</p>
</template>

<script setup>

    import { ref } from 'vue'
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

    const multipleTableRef = ref()
    const multipleSelection = ref([])
    const handleSelectionChange = (val) => {
        multipleSelection.value = val
    }

</script>
