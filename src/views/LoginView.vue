<template>
    <div class="h-screen flex items-center justify-center bg-gray-100">
        <el-card class="w-1/3 max-w-md h-1/2 flex flex-col justify-around min-w-[230px]">
            <div class="text-center mb-2">
                <p class="text-gray-600 mt-1">請登入您的帳戶</p>
            </div>
            <el-form :model="form" :rules="rules" ref="loginForm" @submit.prevent="onSubmit" class="space-y-4">
                <el-form-item prop="email">
                  <el-input 
                  v-model="form.email" 
                  placeholder="信箱"
                  :prefix-icon="User"
                  class="w-full">
                  </el-input>
                </el-form-item>
                
                <el-form-item prop="password">
                  <el-input 
                    v-model="form.password" 
                    type="password" 
                    placeholder="密碼"
                    :prefix-icon="Lock"
                    class="w-full"
                  ></el-input>
                </el-form-item>
          
                <el-form-item>
                  <el-button type="primary" native-type="submit" class="w-full bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                    登入
                  </el-button>
                </el-form-item>
            </el-form>
            
        </el-card>
    </div>
  </template>
  
<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus'
    import { login } from '@/composables/apis'
    import { Lock, User } from '@element-plus/icons-vue'

    const router = useRouter()

    const loginForm = ref(null)
    const form = ref({
      email: '',
      password: ''
    })
  
    const rules = {
      email: [
        { required: true, message: '請輸入信箱', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' }
      ]
    }
  
    const onSubmit = () => {
      loginForm.value.validate( async (valid) => {
        if (!valid) return ElMessage.error('請正確填寫登入信息')
        try {
            const res = await login(form.value)
            if (res.status !== 200) return
            const message = ElMessage.success('登入成功!')
            setTimeout(() => {
              router.push('/') 
              message.close()
            }, 1000)
        } catch (error) {
          ElMessage.success('登入失敗!')
        }
      })
    }
  
</script>