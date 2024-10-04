<template>
    <div class="h-screen flex items-center justify-center bg-gray-100">
        <el-card class="w-1/3 max-w-md h-1/2 flex flex-col justify-around">
            <div class="text-center mb-2">
                <p class="text-sm text-gray-600 mt-1">請登入您的帳戶</p>
            </div>
            <el-form :model="form" :rules="rules" ref="loginForm" @submit.prevent="onSubmit" class="space-y-4">
                <el-form-item prop="username">
                  <el-input 
                  v-model="form.username" 
                  placeholder="用戶名"
                  prefix-icon="el-icon-user"
                  class="w-full">
                  </el-input>
                </el-form-item>
                
                <el-form-item prop="password">
                  <el-input 
                    v-model="form.password" 
                    type="password" 
                    placeholder="密碼"
                    prefix-icon="el-icon-lock"
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
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  
      const loginForm = ref(null)
      const form = reactive({
        username: '',
        password: ''
      })
  
      const rules = {
        username: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' }
        ]
      }
  
      const onSubmit = () => {
        loginForm.value.validate((valid) => {
          if (valid) {
            // 這裡處理登入邏輯
            ElMessage.success('登入成功!')
            // 登入成功後可以進行路由跳轉等操作
          } else {
            ElMessage.error('請正確填寫登入信息')
          }
        })
      }
  
  </script>
  
  <style>
  /* 可以在這裡添加任何額外的樣式覆蓋 */
  /* .el-input__inner {
     bg-gray-50 border-gray-300;
  }
  
  .el-button--primary {
     border-none;
  } */
  </style>