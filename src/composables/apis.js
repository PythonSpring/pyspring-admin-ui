import { GET, POST, PUT, DELETE } from '@/composables/base'

const checkLoginStatus = async () => {
    const res = await GET('/public/user')
    return res
}

const login = async (data) => {
    const res = await POST('/public/login', data)
    return res
}

const logout = async () => {
    const res = await GET('/public/logout')
    return res
}

const tableNames = async () => {
    const res = await GET('/private/tables')
    return res
}

const modelData = async (name) => {
    const res = await GET('/private/models')
    return res
}

export { login, logout, checkLoginStatus, tableNames, modelData }