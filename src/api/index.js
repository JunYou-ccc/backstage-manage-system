import http from '../utils/request'


// 请求首页数据
export const getData = () => {
    return http.get('/home/getData')
}

export const getUser = (params) => {
    // 返回用户列表
    return http.get('/user/get', params)
}

export const addUser = (data) => {
    // 添加用户
    return http.post('/user/add', data)
}

export const editUser = (data) => {
    // 编辑用户
    return http.post('/user/edit', data)
}

export const delUser = (data) => {
    // 删除用户
    return http.post('/user/del', data)
}

export const getMenu = (data) => {
    // 用户登录
    return http.post('/permission/getMenu', data)
}