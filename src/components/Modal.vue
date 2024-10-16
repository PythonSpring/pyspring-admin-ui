<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg p-6 w-1/3 relative">
            <button @click="$emit('closeModal')" class="text-red-500 absolute top-2 right-3 font-bold p-2">x</button>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700">姓名</label>
                    <input type="text" id="name" v-model="name" class="border rounded w-full py-2 px-3" required />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700">電子郵件</label>
                    <input type="email" id="email" v-model="email" class="border rounded w-full py-2 px-3" required />
                </div>
                <button type="submit" class="bg-blue-500 text-white rounded py-2 px-4 absolute bottom-2 right-4">送出</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: ''
        };
    },
    methods: {
        handleSubmit() {
            // 處理表單提交
            console.log('姓名:', this.name);
            console.log('電子郵件:', this.email);
            this.$emit('closeModal'); // 提交後關閉 Modal
        }
    }
};
</script>
