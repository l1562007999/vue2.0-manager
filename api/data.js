// 引入二次封装的axios工具
import axios from './axios.js'

export const getMenu = (params)=>{
    return axios.request({
        url:'/permission/getMenu',
        methods:'post',
        data: params
        },
    )
}

export const getData = ()=>{
    return axios.request({
        url:'/home/getData'
    })
}
