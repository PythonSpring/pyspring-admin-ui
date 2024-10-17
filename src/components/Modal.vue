<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg p-6 w-1/3">
            <div class="flex justify-end">
                <el-button  @click="$emit('closeModal')" type="primary" native-type="button" class="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 font-bold p-2">
                    x
                </el-button>
            </div>
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
                    <el-form-item label-position="right">
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
        }
    })
    const formRef = ref(null)
    const form = ref({})
    const rules = ref({})

    props.formColumns.forEach(column => {
        form.value[column.field] = ''
        if (column.is_primary_key) {
            rules.value[column.field] = [{ required: true, message: `請輸入${column.header}`, trigger: 'blur' }]
        }
    })


    const submitForm = () => {
        formRef.value.validate( async (valid) => {
        if (!valid) return ElMessage.error('請正確填寫登入信息')
        try {
        } catch (error) {
        }
      })
    }
</script>
