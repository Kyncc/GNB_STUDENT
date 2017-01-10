# 归纳本学生端

> 基于Vue(1.x).js和Dcloud(H5+)混合技术Hybrid App

## 使用技术简介

### 编译环境
- [VueLoader][4]

### Hybird框架
- [跨平台技术-H5+][1]

### 数据视图控制
- [Vue.js][2]
- [路由-VueRouter][3]  
- [单项数据流-Vuex][6]
- [VueRouter和Vuex流同步-Vuex-router-sync][7]

### 功能组件
- [时间格式化-Moment.js][8]
- [图片控制剪裁-Cropper.js][11]

### UI组件
- [手机UI库-Vux][5]
- [手机UI库-Mint][14]
- [触摸手势组件-VueTouch][9]
- [加载数据组件-Vue-infinite-loading][10]
- [图片懒加载-Vue-lazyload][12]
- [灯箱-PhotoSwipe][13]
 
## 文件夹结构
   
    ├── build       # webpack编译配置
    ├── config      # webpack配置
    ├── dist        # 打包后文件（此目录放在HBuilder中）
    ├── app.vue     # 入口页面
    ├── main.js     # 入口JS
    ├── store.js    # Store
    ├── index.html  # html模版
    ├── src         # 开发目录
        ├── api         # 用来放置接口
        ├── assets      # 静态资源文件
        ├── common      # 公共文件模块
        ├── components  # 组件
        ├── router      # 整体路由
            ├── user        # 个人中心
            ├── bag         # 书包
            ├── index       # 首页
            ├── interact    # 互动
        ├── login       # 登陆注册模块
        ├── features    # 功能模块
            ├── camera      # 拍错题模块
            ├── collect     # 收藏本模块
            ├── remember    # 记错题模块
            ├── message     # 消息模块
            ├── report      # 成绩报告单模块
            ├── brush       # 题型汇总模块
            ├── error       # 题型归纳
            ├── break       # 斩题列表
            ├── pass        # 弃题列表
            ├── brush       # 刷错题
            ├── textbook    # 我的教材
            ├── workbook    # 我的练习册


## 安装

    npm install //安装依赖包

## 使用

    npm run dev     //进入开发模式
    npm run build   //打包生成的目录在dist下


  [1]: http://www.dcloud.io/runtime.html
  [2]: http://cn.vuejs.org/guide/
  [3]: http://router.vuejs.org/zh-cn/index.html
  [4]: http://vue-loader.vuejs.org/en/index.html
  [5]: https://vuxjs.gitbooks.io/vux/content/about/component-standard.html
  [6]: http://vuex.vuejs.org/zh-cn/index.html
  [7]: https://github.com/vuejs/vuex-router-sync
  [8]: http://momentjs.cn/
  [9]: https://github.com/vuejs/vue-touch
  [10]: https://peachscript.github.io/vue-infinite-loading/#!/slots
  [11]: https://fengyuanchen.github.io/cropperjs/
  [12]: https://github.com/hilongjw/vue-lazyload
  [13]: https://github.com/dimsemenov/PhotoSwipe
  [14]: https://github.com/ElemeFE/mint-ui/tree/1.x
  