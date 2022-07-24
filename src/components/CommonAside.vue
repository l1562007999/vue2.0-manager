<template>
  <!-- 侧边菜单栏渲染 -->
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <!-- 添加标题: 通用后台管理 -->
    <h3> {{isCollapse? '后台':'通用后台管理系统'}}</h3>
    <!-- // 渲染没有子项目的菜单 -->
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- // 渲染有子项目的菜单 -->
    <el-submenu :index="item.path+''" v-for="item in hasChildren" :key="item.path">
      <!-- 一级菜单 -->
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group v-for="(subItem) in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他地方',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '桃花源',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '幽然亭',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name
      })
    }
  },
  computed: {
    // 对菜单渲染列表进行过滤
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
  }
}
</style>