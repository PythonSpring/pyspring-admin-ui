import { GET, POST, PUT, DELETE } from '@/composables/base'

const login = async (data) => {
    const res = await POST('/public/login', data)
}

export { login }