<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div v-if="loadingAddModal" class="absolute inset-0 flex justify-center items-center z-10">
            <img src="/loading.gif" alt="loading" class="w-20 h-20">
        </div>
        <div class="bg-white rounded-lg p-6 w-2/3 lg:w-1/3 max-h-[600px] overflow-y-auto">
            <div class="flex justify-end">
                <el-button  @click="$emit('closeAddModal')" type="primary" native-type="button" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 font-bold p-2">
                    x
                </el-button>
            </div>
            <p class="text-center text-3xl text-gray-500">{{ tableTitle }}</p>
            <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="submitForm" class="mt-6" hide-required-asterisk>
                <el-form-item 
                    v-for="(column, index) in formColumns"
                    :key="column.field"
                    :label="column.header"
                    :prop="column.field"
                    label-position="top"
                >
                    <el-input v-model="form[column.field]"></el-input>
                </el-form-item>

                <div class="flex justify-end">
                    <el-form-item>
                        <el-button type="primary" native-type="submit" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                            新增
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'

    const props = defineProps({
        formColumns: {
            type: Array,
            default: () => []
        },
        tableTitle: {
            type: String,
            default: () => ''
        },
        loadingAddModal:{
            type: Boolean,
            default: () => false
        }
    })
    const emit = defineEmits(['closeAddModal', 'submitForm'])

    const formRef = ref(null)
    const form = ref({})
    const rules = ref({})
    props.formColumns.forEach(column => {
        if(column.field !== 'id'){
            form.value[column.field] = ''
            rules.value[column.field] = [{ required: true, message: `請輸入${column.header}`, trigger: 'blur' }]
        }
    })


    const submitForm = () => {
        formRef.value.validate( async (valid) => {
            if (!valid) return ElMessage.error('請正確填寫表單')
            emit('submitForm', form.value)
        })
    }
</script>
