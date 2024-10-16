<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg p-6 w-1/3">
            <button @click="closeModal" class="text-red-500">關閉</button>
            <p class="mt-4">這是彈出式 Modal 的內容</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(false)

const openModal = () => {
    isVisible.value = true
}

const closeModal = () => {
    isVisible.value = false
}


</script>
