import Mock from 'mockjs'
import HomeAPI from './mockServerData/home.js'

// 拦截器的规则
Mock.mock('/home/getData', HomeAPI.getStatisticalData)