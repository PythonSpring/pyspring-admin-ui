<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useDarkMode } from '@/composables/useDarkMode'

const themeStore = useThemeStore()
const { getThemeClasses } = useDarkMode()

</script>

<template>
  <div>
    <el-button
      :class="[getThemeClasses('button'), 'fixed top-3 left-20 z-[60]']"
      @click="themeStore.toggleTheme"
      :icon="themeStore.isDark ? Sunny : Moon"
      circle
    />
    <RouterView />
  </div>
</template>


