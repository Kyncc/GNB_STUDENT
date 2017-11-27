# Induction Book For Teacher(归纳本教师端)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build status](https://ci.appveyor.com/api/projects/status/2qu59n38tva8mb40/branch/dev?svg=true)](https://ci.appveyor.com/project/HopeFE/gnb-teacher/branch/dev) [![Dependencies](https://david-dm.org/HopeFE/GNB_STUDENT/status.svg)](https://david-dm.org/HopeFE/GNB_TEACHER)
 [![devDependencies](https://david-dm.org/HopeFE/GNB_TEACHER/dev-status.svg)](https://david-dm.org/HopeFE/GNB_TEACHER?type=dev)
> Base on Vue.js and DCloud Hybrid App

## App Market Download(IOS and Android)

![DownloadPicture](http://okkula0y9.bkt.clouddn.com/teacher.png)

### 编译环境

-	[DCloud](http://www.dcloud.io/runtime.html)

### Main Javascript Framework

-	[vue](http://cn.vuejs.org/guide/)

-	[vue-router](http://router.vuejs.org/zh-cn/index.html)

-	[vuex](http://vuex.vuejs.org/zh-cn/index.html)

-	[Axios - Http Client](https://github.com/mzabriskie/axios)

-	[vuex-router-sync - Keep vue-router and vuex store in sync](https://github.com/vuejs/vuex-router-sync)

### UI Compoents

-	[Vux - Vue UI Components](https://vux.li/#/)

### Plugins

-	[Cropper.js - Image cropping plugin](https://fengyuanchen.github.io/cropperjs/)

-	[PhotoSwipe - JavaScript image gallery for mobile](https://github.com/dimsemenov/PhotoSwipe)

-	[Vue-lazyload - An Image lazyload plugin for Vue](https://github.com/hilongjw/vue-lazyload)

## File Structure Introduction

```
├── build       # webpack Build
├── config      # webpack Config
├── distT       # Dist Folder
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
        ├── assemble    # 组卷中心
        ├── points      # 我的积分
        ├── assemble    # 我的组卷
          ├── chapter      # 章节考点
          ├── download     # 组卷编辑
        |── homework    # 布置作业
        ├── workbook    # 查答案
        ├── correct     # 纠错
        ├── example     # 例题
        ├── error       # 查看错题
        ├── workbook    # 批改作业
        ├── myclass     # 我的班级
        ├── statistics  # 错题统计
          ├── error          # 同学错题
          ├── errorClass     # 班级错题
        ├── myDownload  # 我的下载
        ├── message     # 消息
        ├── invite      # 我的邀请
        ├── login       # 登陆
        ├── settings    # 设置
        ├── about       # 关于归纳本
```

### Getting Started


## Install
```
npm/yarn install
npm/yarn run dev
open http://localhost:8088
```

### Build
```
npm/yarn run build
npm/yarn run build --report 查看打包JS大小
open Files in DistT Folder
```
## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Induction Book For Teacher(归纳本-教师端)</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">HopeFE</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
