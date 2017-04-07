# 归纳本学生端

> 基于Vue.js(2.x)和Dcloud(H5+)混合技术Hybrid App 

# 苹果安卓市场下载

![商店下载](http://okkula0y9.bkt.clouddn.com/student.png)


### 编译环境

-	[VueLoader](http://vue-loader.vuejs.org/en/index.html)

	### Hybird框架

-	[跨平台技术-H5+](http://www.dcloud.io/runtime.html)

	### 数据视图控制

-	[Vue2](http://cn.vuejs.org/guide/)

-	[路由-VueRouter2](http://router.vuejs.org/zh-cn/index.html)

-	[http请求-Axios](https://github.com/mzabriskie/axios)

-	[单项数据流-Vuex](http://vuex.vuejs.org/zh-cn/index.html)

-	[VueRouter和Vuex流同步-Vuex-router-sync](https://github.com/vuejs/vuex-router-sync)

	### 功能组件

-	[图片控制剪裁-Cropper.js](https://fengyuanchen.github.io/cropperjs/)

	### UI组件

-	[手机UI库-Vux](https://vuxjs.gitbooks.io/vux/content/about/component-standard.html)

-	[加载数据组件-Vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/#!/slots)

-	[图片懒加载-Vue-lazyload](https://github.com/hilongjw/vue-lazyload)

-	[灯箱-PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

文件夹结构
----------

```
├── build       # webpack编译配置
├── config      # webpack配置
├── dist       # 打包后文件（此目录放在HBuilder中）
├── app.vue     # 入口页面
├── main.js     # 入口JS
├── store.js    # store
├── index.html  # html模版
├── components  # 公用的组件
├── src         # 开发目录
    ├── router      # 主体模块
    ├── features    # 功能模块
        ├── common      # 全局功能函数（HTTP配置,弹窗等）
        ├── workbook    # 习题册记错题模块
        ├── collect     # 收藏本模块
        ├── correct     # 纠错模块
        ├── myclass     # 我的班级
        ├── report      # 知识图谱模块
        ├── settings    # 设置
        ├── about       # 关于
```

### 安装

```
npm install //安装依赖包
```

### 使用

```
npm run dev     //进入开发模式
npm run build   //打包生成的目录在dist下
npm run build --report   //打包并生成报告
```
