<template>
  <header>
    <!-- 头部左侧 -->
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"> </el-button>
      <!-- <h3 style="color:#fff">首页</h3> -->
      <!-- 面包屑组件 -->
      <el-breadcrumb separator=">">
        <!-- 拿到tags之后, 进行渲染 -->
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 头部右侧 -->
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" alt="头像">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'  // 在computed属性中使用
export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require('@/assets/images/user.png')
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  },
  computed:{
    ...mapState({
      // 这里拿到面包屑要渲染的路径数据
      // 这里的tab 是指store的modules里面的tab
      tags: state=>state.tab.tabsList
    })
    // ...mapState(['tabsList'])
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>