<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div v-if="loadingUpdateModal" class="absolute inset-0 flex justify-center items-center z-10">
            <img src="/loading.gif" alt="loading" class="w-20 h-20">
        </div>
        <div class="bg-white rounded-lg p-6 w-2/3 lg:w-1/3  max-h-[600px] overflow-y-auto">
            <div class="flex justify-end">
                <el-button  @click="$emit('closeEditModal')" type="primary" native-type="button" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 font-bold p-2">
                    x
                </el-button>
            </div>
            <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="submitUpdateForm" class="mt-6" hide-required-asterisk>
                <el-form-item 
                    v-for="(column, index) in formColumns.filter(col => col.field !== 'password')"
                    :key="column.field"
                    :label="column.header"
                    :prop="column.field"
                    label-position="top"
                >
                    <template v-if="column.is_enum">
                        <el-select v-model="form[column.field]" :disabled="column.is_primary_key || column.is_readonly">
                            <el-option 
                                v-for="option in column.options" 
                                :key="option.value" 
                                :label="option.label" 
                                :value="option.value">
                            </el-option>
                        </el-select>
                    </template>
                    <template v-else-if="column.builtin_type === 'bool'">
                        <el-radio-group v-model="form[column.field]" :disabled="column.is_primary_key || column.is_readonly">
                            <el-radio :value="true">True</el-radio>
                            <el-radio :value="false">False</el-radio>
                        </el-radio-group>
                    </template>
                    <template v-else>
                        <el-input 
                            :disabled="column.is_primary_key || column.is_readonly"
                            v-model="form[column.field]" 
                            :type="getInputType(column.builtin_type)">
                        </el-input>
                    </template>
                </el-form-item>

                <div class="flex justify-end">
                    <el-form-item>
                        <el-button type="primary" native-type="submit" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                            送出
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
        selectedRow: {
            type: Object,
            default: () => {}
        },
        loadingUpdateModal:{
            type: Boolean,
            default: () => false
        }
    })
    const emit = defineEmits(['closeEditModal', 'submitUpdateForm'])

    const formRef = ref(null)
    const form = ref({})
    const rules = ref({})

    props.formColumns.forEach(column => {
        form.value[column.field] = ''
        rules.value[column.field] = [{ required: true, message: `請輸入${column.header}`, trigger: 'blur' }]
    })

    if(props.selectedRow.length !== 0) {
        Object.keys(form.value).forEach((column)=>{
            form.value[column] = props.selectedRow[column]
        })
    }

    const getInputType = (builtinType) => {
        switch (builtinType) {
            case 'str':
                return 'text'
            case 'EmailStr':
                return 'email'
            case 'int':
                return 'number'
            case 'bool':
                return 'checkbox'
            case 'Decimal':
                return 'number'
            case 'date':
                return 'date'
            case 'datetime':
                return 'datetime-local'
            default:
                return 'text'
        }
    }


    const submitUpdateForm = () => {
        formRef.value.validate( async (valid) => {
            if (!valid) return ElMessage.error('請正確填寫表單')
            emit('submitUpdateForm', form.value)
        })
    }
</script>
