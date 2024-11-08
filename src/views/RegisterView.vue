<template>
    <div :class="[getThemeClasses('container'), 'h-screen flex items-center justify-center']">
        <el-card class="w-1/3 max-w-md h-1/2 flex flex-col justify-around min-w-[230px]">
            <div class="text-center mb-2">
                <p :class="[getThemeClasses('text'), 'mt-1']">註冊</p>
            </div>
            <el-form :model="form" :rules="rules" ref="loginForm"  class="space-y-4 overflow-y-auto">
                <el-form-item prop="user_name">
                  <el-input 
                  v-model="form.user_name" 
                  placeholder="使用者名稱"
                  :prefix-icon="User"
                  class="w-full">
                  </el-input>
                </el-form-item>
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

                <el-form-item prop="role">
                    <el-select v-model="form.role" placeholder="請選權限" class="w-full">
                        <el-option 
                            v-for="option in ['admin', 'guest']" 
                            :key="option" 
                            :label="option" 
                            :value="option">
                        </el-option>
                </el-select>
                </el-form-item>
                <div class="pt-6 flex justify-between items-center">
                    <el-button @click="onSubmit" type="primary" native-type="button" class="w-full bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                    註冊
                    </el-button>
                    <el-button @click="router.push('/')" type="primary" native-type="button" class="w-full bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600">
                    返回登入頁
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
    import { register } from '@/composables/apis'
    import { useDarkMode } from '@/composables/useDarkMode'
    import { Lock, User, Box, View, Hide } from '@element-plus/icons-vue'

    const router = useRouter()
    const { getThemeClasses } = useDarkMode()

    const showPassword = ref(false)

    const togglePassword = () => {
        showPassword.value = !showPassword.value
    }

    const loginForm = ref(null)
    const form = ref({
      email: '',
      password: '',
      user_name:'',
      role:''
    })
  
    const rules = {
      email: [
        { required: true, message: '請輸入信箱', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' }
      ],
      user_name: [
        { required: true, message: '請輸入名稱', trigger: 'blur' }
      ],
      role: [
        { required: true, message: '請選填權限', trigger: 'blur' }
      ],
    }
  
    const onSubmit = () => {
      loginForm.value.validate( async (valid) => {
        if (!valid) return ElMessage.error('請正確填寫欄位')
        try {
            const res = await register(form.value)
            if (res.status !== 200) return
            ElMessage.success({
              message: '註冊成功!',
              type: 'success',
              duration: 1000
            })
            // await login({email:form.value.email, password:form.value.password})
            // router.push('/') 
        } catch (error) {
          ElMessage.success('註冊失敗!')
        }
      })
    }
  
</script>