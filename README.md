# Induction Book(归纳本)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build status](https://ci.appveyor.com/api/projects/status/8r82xwcsi2iujudj?svg=true)](https://ci.appveyor.com/project/HopeFE/gnb-student)
[![Dependencies](https://david-dm.org/HopeFE/GNB_STUDENT/status.svg)](https://david-dm.org/HopeFE/GNB_STUDENT)
> Base on Vue.js(v2.3) and DCloud Hybrid App

## App Market Download(IOS and Android)

![DownloadPicture](http://okkula0y9.bkt.clouddn.com/student.png)

## Technology Overview

### Compiler Environment

-	[vuxLoader](https://github.com/airyland/vux-loader)

### Cross Platform

-	[DCloud](http://www.dcloud.io/runtime.html)

### Main Javascript Framework

-	[vue](http://cn.vuejs.org/guide/)

-	[vue-router](http://router.vuejs.org/zh-cn/index.html)

-	[vuex](http://vuex.vuejs.org/zh-cn/index.html)

-	[Axios - Http Client](https://github.com/mzabriskie/axios)

-	[vuex-router-sync - Keep vue-router and vuex store in sync](https://github.com/vuejs/vuex-router-sync)

### Plugins

-	[Cropper.js - Image cropping plugin](https://fengyuanchen.github.io/cropperjs/)

-	[PhotoSwipe - JavaScript image gallery for mobile](https://github.com/dimsemenov/PhotoSwipe)

### UI Compoents

-	[Vux - Vue UI Components](https://vux.li/#/)

-	[Vue-lazyload - An Image lazyload plugin for Vue](https://github.com/hilongjw/vue-lazyload)

## File Structure Introduction

```
├── build       # webpack Build
├── config      # webpack Config
├── dist        # Dist Folder
├── app.vue     # Entry File
├── main.js     # Entry Js
├── store.js    # Vuex Main Stroe
├── router.js   # Main Router
├── theme.less  # Vux UI Color Config
├── index.html  # Html Template
├── components  # UI or Function Components
├── src         # Code Folder
    ├── router      # Main Pages
    ├── features    # Modules
        ├── common      # 全局功能函数
        ├── workbook    # 查答案
        ├── example     # 例题
        ├── collect     # 收藏本模块
        ├── correct     # 纠错
        ├── myclass     # 我的班级
        ├── error       # 错题本
        ├── myBook      # 我的习题册
        ├── report      # 知识图谱
        ├── message     # 消息
        ├── login       # 登陆
        ├── induce      # 题型归纳
        ├── settings    # 设置
        ├── about       # 关于归纳本
```

## Getting Started
> Recommend `yarn` to obtain a stable dependency package

### Install
```
yarn/npm install 
yarn run dev/npm run dev
open http://localhost:8080
```

### Build
```
yarn run build/npm run build
open Files in Dist Folder
```
## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Induction Book(归纳本)</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">HopeFE</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
