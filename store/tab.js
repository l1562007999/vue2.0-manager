export default {
    state: {
        isCollapse: false,
        // 定义一个初始数据, 迎来存储侧边栏点击事件的状态
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 定义一个mutation 来改变tabList中的数据
        selectMenu(state, val) {  //传入的val是一个对象, tablList是一个元素为对象的数组
            // 如果默认不是Home页, 则对传进来的路径进行处理
            if (val.name !== 'home') {
                state.currentMenu = val
                // findIndex() 方法为数组中的每个元素都调用一次函数执行：
                // 循环的数组中的每一个对象都保存了path,name,label,icon这四个属性
                // 检查当前点击的路径是否与tabList的每一个路径的name一致, 如果不存在即-1, 则加入tabList数组中
                const result = state.tabsList.findIndex(item => item.name === val.name)

                if (result === -1) {
                    // 如果点击menu过来的val不存在, 即-1, 则添加这个路径
                    state.tabsList.push(val)
                } else {
                    state.currentMenu = null
                }
            }
        },
        // 关闭tag时删除当前的tabsList里面的数据
        closeTag(state, val) {
            // 传入的val即当前点击的路径对象 与 tabsList中数据的匹配 匹配成功后则返回这个匹配的对象 
            const result = state.tabsList.findIndex(item => item.name === val.name)
            //   并试图删除这个匹配的路径对象
            state.tabsList.splice(result, 1)
            // 在CommonTag组件中嗲用这个cloaseTag
        },
    }
}