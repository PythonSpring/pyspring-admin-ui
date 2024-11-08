<template>
    <div :class="[getThemeClasses('container'), 'h-screen flex items-center justify-center']">
        <el-card class="w-1/3 max-w-md h-1/2 flex flex-col justify-around min-w-[230px]">
            <div class="text-center mb-2">
                <p :class="[getThemeClasses('text'), 'mt-1']">請登入您的帳戶</p>
            </div>
            <el-form @keyup.enter="onSubmit" :model="form" :rules="rules" ref="loginForm"  class="space-y-4">
                <el-form-item prop="email">
                  <el-input 
                  v-model="form.email" 
                  placeholder="信箱"
                  :prefix-icon="Box"
                  class="w-full">
                  </el-input>
                </el-form-item>
                
                <el-form-item prop="password">
                  <el-input 
                    v-model="form.password" 
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="密碼"
                    :prefix-icon="Lock"
                    class="w-full relative"
                  ></el-input>
                  <el-icon 
                      class="absolute right-2 top-2 cursor-pointer"
                      @click="togglePassword"
                  >
                      <View v-if="!showPassword" />
                      <Hide v-else />
                  </el-icon>
                </el-form-item>
                <p :class="[getThemeClasses('link'), 'text-end text-xs cursor-pointer']">忘記密碼？</p>
          
                <div class="flex justify-between items-center">
                  <el-button @click="router.push('register')" type="primary" native-type="button" class="w-full bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                    註冊
                  </el-button>
                  <el-button @click="onSubmit" type="primary" native-type="button" class="w-full bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                    登入
                  </el-button>
                </div>
            </el-form>
            
        </el-card>
    </div>
  </template>
  
<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus'
    import { login } from '@/composables/apis'
    import { useDarkMode } from '@/composables/useDarkMode'
    import { Lock, Box, View, Hide } from '@element-plus/icons-vue'

    const { getThemeClasses } = useDarkMode()

    
    const router = useRouter()

    const showPassword = ref(false)

    const togglePassword = () => {
        showPassword.value = !showPassword.value
    }

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
            ElMessage.success({
              message: '登入成功!',
              type: 'success',
              duration: 1000
            })
            setTimeout(() => {
              router.push('/') 
            }, 1000)
        } catch (error) {
          ElMessage.success('登入失敗!')
        }
      })
    }
  
</script>