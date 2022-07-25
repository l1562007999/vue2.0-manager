<template>
  <div class="tabs">
    <el-tag size="small" v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name!== 'home' " :effect="$route.name ==tag.name? 'dark': 'plain'" @click="changeMenu(tag)" @close="handleClose(tag,index)">
      <!-- 拿到当前路由的名称 是 $route.name -->
      <!-- 定义changeMenu时间, 改变当前的路由路径 -->
      <!-- 显示对应的路径中文名称 -->
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    // 使用mapMutation
    ...mapMutations({
      close: 'closeTag'

    }),
    //点击tag的处理逻辑: 
    // 点击tag 会将当前route改变到对应的位置
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    // 关闭tag逻辑
    // 关闭最右侧tag 焦点左移
    // 关闭中间tag 焦点右移
    handleClose(tag, index) {
      // 得到当前tabsList里面的数组总长度 将之与index进行比较
      const length = this.tags.length - 1
      //调用mapMutation中的close函数删除点击的路径对象
      this.close(tag)
      //  如果 length与index 相等, 则说明点击的是最右侧的tabg,  否则就是中间的tag
      // 判断当前点击的关闭tag是否等于当前所在的路由路径  如果相等, 则不需要有上述判断逻辑, 即不干煸当前的tag的高亮焦点
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          // 跳转到当前tabsList中的上一位
          name: this.tags[index - 1].name
        })
        console.log(this.tags);  //查看一下当前tabsList
      } else {
        this.$router.push({
          // 关闭了一个tags之后 就恰好不需要+1了, 就是替代了当前的index数
          name: this.tags[index].name
        })
        // 之后还要在store中mutations来修改tabsList
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  padding-bottom: 0;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>