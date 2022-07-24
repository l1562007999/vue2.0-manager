<template>
  <el-row class="home" :gutter="20">
    <!-- 第一列 用户信息与 表单的展示 -->
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="头像" title="头像" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022:09:09</span></p>
          <p>上次登录地点: <span>桃花源</span> </p>
        </div>
      </el-card>
      <el-card style="margin-top:20px; height:460px">
        <!-- table列表 -->
        <el-table :data="tableData">
          <!-- table的第一列 -->
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 第二列  上一订单展示  中一折线图 下二柱状图 饼状图 的布局 -->
    <el-col :span="16" style="margin-top:20px">
      <!--上一 订单量展示 -->
      <div class="num">
        <el-card v-for=" item in countData" :key="item.name" :body-style="{display:'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">${{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <!-- 中一 折线图 -->
      <el-card style="height:280px">
        <div style="height:280px" ref="echarts">
          <!-- ref用于获取当前的dom节点 -->
        </div>
      </el-card>
      <!-- 下二: 柱状图 饼状图 -->
      <div class="graph">
        <el-card style="height:260px">
          <div style="height:240px;" ref="userEcharts"></div>
        </el-card>
        <el-card style="height:260px">
          <div style="height:240px;" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// 导入axios封装api方法
import { getData } from '../../../api/data.js'
// 引入npm包里面的echarts  5版本的引入
import * as echarts from 'echarts'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'User',
  data() {
    return {
      userImg: require('@/assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  // 使用axios封装的api方法
  mounted() {
    // 页面加载, 从模拟数据中请求数据
    getData().then(res => {
      // 将获得全部数组对象复制结构 得到 code与data
      const { code, data } = res.data
      //
      if (code === 20000) {
        // 将请求到的data中的第一列图标数据注入到vue实例的data中, 以供渲染
        this.tableData = data.tableData
        // 将请求的data中的订单数据, 注入到vue实例的data中
        const order = data.orderData
        const xData = order.date

        //订单图
        // 处理订单数据 这里的keys 是对象第一组数据的属性名
        const keyArray = Object.keys(order.data[0])
        const series = []
        // forEach遍历keyArray并改变keyArray
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]), // 这里是将data里面的每一项遍历, 每一项里面的与key属性名对应的数值, 返回成一个数组,
            // 比如 遍历key=苹果时, data数组里面存的就是关于苹果的所有的属性值的数组
            // sereis村着几个对象, 第一个对象:{苹果,[若干个数值],类型}
            type: 'line'
          })
        })
        //订单图
        // 订单折线图echarts的配置项
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {

          },
          legend: {
            data: keyArray
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        console.log(series);
        E.setOption(option)

        // 用户图
        // 用户图的配置项
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            // 两个图例, 就需要两个对象
            {
              name: '新增用户',
              data: data.userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            },

          ],
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)

        //品牌图 饼图
        const videoOption = {
          legend: {
            orient: "vertical",
            left: "right",
            data: data.videoData.map(item=>item.name)
          },
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videoData,
              type: 'pie'
            }
          ],
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }


    })
  }
}
</script>

<style>
</style>