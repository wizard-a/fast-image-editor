# Fast-Image-Editor

## 演示地址
[演示地址](http://39.97.252.98:3000/)

## 快速启动
-   `git clone git@github.com:jiechud/fast-image-editor.git`
-   `yarn install || npm install`
-   `yarn dev` 启动服务
-   打开浏览器

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

建立了一个微信交流群，如需沟通讨论，请加入。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24b984de53f64a419ba9ae0d92621a47~tplv-k3u1fbpfcp-watermark.image)

二维码过期，请添加微信号`q1454763497`,备注`image editor`,我会拉你进群

## 地址

* [演示地址](http://39.97.252.98:3000/)
* [代码地址](https://github.com/jiechud/fast-image-editor)


## 总结
大家可以尝试一下，有bug可以提[issues](https://github.com/jiechud/fast-image-editor/issues)，我会第一时间修复.

大家觉得有帮助，请在[github](https://github.com/jiechud/fast-image-editor)帮忙star一下。

