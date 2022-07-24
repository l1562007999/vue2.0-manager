// 功能工具类

import axios from 'axios'
import config from '../config/index.js'

// 对当前的环境变量进行判断  是开发环境还是生产环境 来使用不同的url
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    // constructor函数中写一些属性以及对应的值
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    // 添加一个方法 来定义axios相关的配置
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            // 请求头信息
            header: {}
        }
        return config
    }
    // 书写拦截器
    interceptors(instance) {
        // 添加请求拦截器 第一个函数是配置项, 第二个函数是失败的处理
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response, 'response');
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error, 'error');
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    //    书写request 加入请求方法
    request(options) {
        const instance = axios.create()
        options = { ...this.getInsideConfig, ...options }
        this.interceptors(instance)
        return instance(options)
    }

}


// 暴露类的实例  传入url地址 来配置相关信息
export default new HttpRequest(baseUrl)