# 归纳本学生端

> 基于Vue.js和Dcloud(H5+)混合技术Hybrid App


## 使用技术简介

 1. [调用跨平台功能-H5+][1] 
 2. [Vue.js-MVVM框架][2]
 3. [Vue.js的路由-VueRouter][3]  
 4. [Vue.js推荐的打包编译环境-VueLoader][4] 
 5. [Vue.js手机组件库-Vux][5] 
 6. [Vue.js单项数据流-Vuex][6]

##文件夹结构

    ├── build       # webpack编译配置
    ├── config      # webpack配置
    ├── dist        # 打包后文件（此目录放在HBuilder中）
    ├── App.vue     # 入口页面
    ├── main.js     # 入口JS
    ├── store.js    # Store
    ├── index.html  # html模版
    ├── src         # 开发目录
        ├── api         # 用来放置接口
        ├── assets      # 静态资源文件 
        ├── main        # 主页模块 
        ├── login       # 登陆模块
            ├── users       # 个人中心
            ├── pages               # 页面文件 
            ├── modules             # 逻辑
            ├── action.js           # action
            └── mutatuinTypes.js    # mutatuinTypes
     

###安装

    npm install //安装依赖包

### 使用

    npm run dev     //进入开发模式
    npm run build   //打包生成的目录在dist下


  [1]: http://www.dcloud.io/runtime.html
  [2]: http://cn.vuejs.org/guide/
  [3]: http://router.vuejs.org/zh-cn/index.html
  [4]: http://vue-loader.vuejs.org/en/index.html
  [5]: https://vuxjs.gitbooks.io/vux/content/about/component-standard.html
  [6]: http://vuex.vuejs.org/zh-cn/index.html