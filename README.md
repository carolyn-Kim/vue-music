# vue-music

> 基于vue(2.5.2) + vuex + vue-router + axios + better-scroll + postcss + es6 + good-storage等开发的一款移动端webapp。
>
> 为了让自己更加熟练的使用vue全家桶、模块化开发，es6，postcss等等知识

## 技术栈

- Vue-cli
- Vue-router：路由，其中推荐页面使用Lazy Loading Routes技术来实现异步加载路由
- vuex：状态管理
- vue-lazyload：图片懒加载
- better-scroll：移动端滚动插件
- postcss
- es6
- eslint
- fastclick：解决click移动浏览器的300ms的延迟

## 实现功能页面

- 推荐页面 
  - 轮播图
  - 推荐歌单
- 歌手页面
  - 歌手列表
  - 字母索引
- 排行页面
  - 排行歌曲
- 搜索页面
  - 搜索歌手、歌曲
  - 上拉刷新
  - 搜索历史
- 播放器内核页面
  - audio
  - 随机播放、顺序播放、单曲循环、收藏
- 播放列表
  - 当前播放列表，收藏、添加歌曲、删除
- 播放历史
  - 播放过的歌单
- 用户中心
  - 搜索历史
  - 收藏
- 歌单详情
  - 歌曲
- 歌手详情
  - 歌手
- 排行榜详情
  - 排行榜



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
