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

const modelData = async (tableName) => {
    const res = await GET(`/private/models/${tableName}`)
    return res
}

const addModelData = async (tableName, data) => {
    const res = await POST(`/private/models/${tableName}`, {data})
    return res
}

const deleteModel = async (tableName, data) => {
    const res = await DELETE(`/private/models/${tableName}`, data)
    return res
}

const updateModel = async (tableName, data) => {
    const res = await PUT(`/private/models/${tableName}`, data)
    return res
}

const enumChoices = async (tableName, columName) => {
    const res = await GET(`/private/models/enum_choices/${tableName}/${columName}`)
    return res
}


export { login, logout, checkLoginStatus, tableNames, modelData, addModelData, deleteModel, updateModel, enumChoices }