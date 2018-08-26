# 项目收获

## Webpack

### tree shaking
sideEffects: false | []

### chunk分离
webpack从4开始引入`optimization.splitChunks`取代原来的`CommonsChunkPlugin`，优化更彻底。

#### 拆块原则
- 共享模块或者node_modules下的模块
- 引入的模块大于30kb（未压缩前）
- 根据需要加载块时的最大并行请求数小于等于5
- 初始页面加载时的最大并行请求小于等于3

### 按需加载


### 缓存
- filename采用chunkhash，hash是构建相关的，chunkhash是chunk相关的
- 提取模版，`optimization.runtimeChunk`，创建单个运行时的bundle, optimization.splitChunks`，将第三方库提取到单个chunk中
- 模块标识符，HashModuleIdsPlugin使用模块路径生成hash，对应output的chunkhash
