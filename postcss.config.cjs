module.exports = {
  plugins: {
    "postcss-pxtorem": process.env.VITE_IS_APP
      ? {
          // 如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 rootValue 配置调整
          // rootValue({ file }) {
          //   return file.indexOf("vant") !== -1 ? 37.5 : 75
          // },
          rootValue: 37.5, // 根元素的 font-size
          unitPrecision: 5, // 允许 REM 单位增长到的十进制数
          propList: ["*"], // 可以从 px 更改为 rem 的属性
          selectorBlackList: [".xxxx"], // 要忽略的选择器并保留为 px
          replace: true, // 替换包含 rems 的规则，而不是添加回退
          mediaQuery: false, // 允许在媒体查询中转换 px
          minPixelValue: 0 // 设置要替换的最小像素值
        }
      : undefined
  }
}
