# 归纳本学生端

> 基于Vue(1.0).js和Dcloud(H5+)混合技术Hybrid App


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
<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.

  We’re ecstatic about both the developer experience and end-user performance, so we decided to share it with the community.
</details>

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
    ├── App.vue     # 入口页面
    ├── main.js     # 入口JS
    ├── store.js    # Store
    ├── index.html  # html模版
    ├── src         # 开发目录
        ├── api         # 用来放置接口
        ├── assets      # 静态资源文件
        ├── common      # 公共文件模块
        ├── main        # 主页模块
        ├── login       # 登陆模块
        ├── camera      # 拍错题模块
        ├── collect     # 收藏本模块
        ├── remember    # 记错题模块
        ├── map         # 知识图谱模块
        ├── brush       # 刷错题模块
        ├── error       # 归纳本（错题统计）模块
        ├── picture     # 拍错题模块
        ├── message     # 消息模块
        ├── users       # 个人中心
            ├── pages               # 页面文件
            ├── modules             # 逻辑
            ├── action.js           # action
            └── mutatuinTypes.js    # mutatuinTypes


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
  