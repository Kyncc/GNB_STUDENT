# Induction Book(归纳本)

> Base on Vue.js and Dcloud Hybrid App

## App Market Download(IOS and Android)

![DownloadPicture](http://okkula0y9.bkt.clouddn.com/student.png)

## License

MIT

## Technology Overview

### Compiler Environment

-	[vuxLoader](https://github.com/airyland/vux-loader)

### Cross Platform

-	[Dcloud](http://www.dcloud.io/runtime.html)

### Main Javascript Framwork

-	[vue](http://cn.vuejs.org/guide/)

-	[vue-router](http://router.vuejs.org/zh-cn/index.html)

-	[vuex](http://vuex.vuejs.org/zh-cn/index.html)

-	[Axios - Http Client](https://github.com/mzabriskie/axios)

-	[vuex-router-sync - Keep vue-router and vuex store in sync](https://github.com/vuejs/vuex-router-sync)

### Plugins

-	[Cropper.js - Image cropping plugin](https://fengyuanchen.github.io/cropperjs/)

-	[PhotoSwipe - JavaScript image gallery for mobile](https://github.com/dimsemenov/PhotoSwipe)

### UI Compoents

-	[Vux - Vue UI Components](https://vuxjs.gitbooks.io/vux/content/about/component-standard.html)

-	[Vue-infinite-loading - An infinite scroll plugin for Vue ](https://peachscript.github.io/vue-infinite-loading/#!/slots)

-	[Vue-lazyload - An Image lazyload plugin for Vue](https://github.com/hilongjw/vue-lazyload)

## File Structure
----------

```
├── build       # webpack编译配置
├── config      # webpack配置
├── dist        # 打包后文件（此目录放在HBuilder中）
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

### How to run it

## Install
```
npm install 
```

## Development
```
npm run dev     //Into development enviroment

```
### Build
```
npm run build   //打包生成的目录在dist下
npm run build --report   //打包并生成报告
```