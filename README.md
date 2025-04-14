<h1 align="center">Welcome to fast-image-editor 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="http://39.97.252.98:3000/doc" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/jiechud/fast-image-editor/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/jiechud/fast-image-editor/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jiechud/fast-image-editor" />
  </a>
</p>

> 一块开源图片编辑器，采用React+Typescript+React-Konva开发。

### 推荐一款AI对话平台 EVO Chat
>
Evo Chat（Evolution Chat）是一个现代化的开源 AI 对话平台。致力于打造最优雅的大模型交互入口。它支持对接 ChatGPT，Deepseak， 等主流大语言模型（LLM）服务商，并在此基础上不断进化，识库增强、多模态处理、MCP（Model Control Protocol）等扩展能力，让 AI 能力更加丰富。支持全平台部署（Web、App、Windows、Mac、Linux），为用户提供无处不在的 AI 能力入口。

* 访问地址：https://hevoai.com
* github: https://github.com/evo-family/evo-chat

### 🏠 [Homepage](https://github.com/jiechud/fast-image-editor#readme)

### ✨ [演示地址](http://39.97.252.98:3000/)

![示例图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97cb450cd5664d92b6d9ccffa4ef9998~tplv-k3u1fbpfcp-watermark.awebp)


## Install

```sh
yarn install
```

## Usage

```sh
yarn run start
```

## Run tests

```sh
yarn run test
```


## 项目目录
```
.
├── canvas-components  
│   ├── canvas         //画布组件
│   ├── layout         //页面布局
│   ├── shape-panel    // 右侧面板
│   └── transformer-wrapper // 支持transformer高阶组件
├── components
│   ├── color-select   // 颜色选择器
│   ├── context-menu   // 右键菜单
│   ├── image          // 图片
│   ├── text           // 文本
│   ├── text-input     // 文本输入
│   └── toolbar        // 导航
├── enum.ts
├── global.css
├── hooks
│   └── useImage.tsx  // 图片kooks
├── models1           // 状态管理
│   ├── canvasDataModel.ts
│   └── canvasModel.ts
├── pages
│   ├── index.less
│   └── index.tsx
├── styles
│   ├── index.less
│   └── theme
├── typing.ts
└── utils
    └── util.ts
```
## 功能特性

目前主要实现了简单的图片编辑，支持文字，图片等。

### 已支持的功能列表

- [x] layout布局
- [x] 文字编辑组件
- [x] 图片编辑组件
- [x] 画布放大缩小
- [x] 画布右键菜单
- [x] 图片下载
- [x] 背景图支持



### 待实现的功能列表

- [ ] 工具类操作支持上一步下一步
- [ ] 图形组件
- [ ] 标记组件
- [ ] 画布多个元素组合
- [ ] 文字组件增加，字体丰富，透明度等。
- [ ] 画布参考线
- [ ] 画布多个尺寸，支持多平台
- [ ] 接入后台，实现登录，保存模板


## 系列文章

* [两个周末写了个图片编辑器](https://juejin.cn/post/6996926544182542366)
* [给图片编辑器添加了辅助线](https://juejin.cn/post/6997926959917318181)
* [给图片编辑器添加了【撤销重做】功能](https://juejin.cn/post/6998287682593882142)
* [给图片编辑器添加了【框选节点】功能](https://juejin.cn/post/7003604608320798734)
## 项目架构

项目用React umi开发框架，采用typescript编写，图片编辑功能用的是`react-konva`,考虑后期可能核心的编辑功能整体做成一个组件，所以没有umi里提供的`useModel`去做状态处理，采用的是`flooks`。


技术栈
|  技术   | 说明  | 官网  |
|  ----  | ----  |  ---- |
| typescript  | JavaScript 的一个超集,支持 ECMAScript 6 |  https://www.tslang.cn/      |
| umi  | 插件化的企业级前端应用框架。 |  https://umijs.org/zh-CN      |
| react-konva |用于使用[React](http://facebook.github.io/react/)绘制复杂的画布图形 。 |  https://github.com/konvajs/react-konva     |
| immer | 创建不可变数据 |  https://immerjs.github.io/immer/docs/introduction |
| flooks  | 一个 React Hooks 状态管理器，支持惊人的 re-render 自动优化 |  https://github.com/nanxiaobei/flooks    |
| ahooks |  提供了大量自应用的高级 Hooks |  https://github.com/alibaba/hooks |
| react-color| 一个React颜色选择器   | https://github.com/casesandberg/react-color  |

## 联系我

建立了一个微信交流群，请添加微信号`q1454763497`,备注`image editor`,我会拉你进群

## Author

👤 **杰出D**

* Website: https://juejin.cn/user/2981531265821416/posts
* Github: [@jiechud](https://github.com/jiechud)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jiechud/fast-image-editor/issues). You can also take a look at the [contributing guide](https://github.com/jiechud/fast-image-editor/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [杰出D](https://github.com/jiechud).<br />
This project is [MIT](https://github.com/jiechud/fast-image-editor/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
