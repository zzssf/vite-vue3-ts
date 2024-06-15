module.exports = {
  // 使用 CommonJS 规范导出配置对象
  extends: [
    "stylelint-config-standard", // 继承了标准的 CSS 规范
    "stylelint-config-standard-vue" // 继承了针对 Vue 文件的规范
  ],
  plugins: ["stylelint-order"], // 使用了 stylelint-order 插件，用于控制样式声明的顺序
  rules: {
    // 配置规则
    "at-rule-no-unknown": null, // 禁止未知的 at 规则，但在特定语法的处理上会单独设置
    "block-no-empty": true, // 禁止空的代码块
    "color-no-invalid-hex": true, // 禁止无效的十六进制颜色表示
    "selector-type-no-unknown": [true, { ignoreTypes: ["/^custom-/"] }], // 在选择器中，禁止未知的元素类型选择器，但允许以 "custom-" 开头的选择器
    "no-descending-specificity": null, // 允许较低特异性的选择器在后面覆盖较高特异性的选择器
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }], // 在选择器中，禁止未知的伪类选择器，但允许 "global" 伪类选择器
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "font-size",
      "font-family",
      "font-weight",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition"
    ]
  },
  overrides: [
    // 针对不同类型文件的特定配置
    {
      files: ["**/*.(vue|html)"], // 对所有的 Vue 文件
      customSyntax: "postcss-html" // 使用 postcss-html 解析样式语法
    },
    {
      files: ["**/*.(vue|less)"], // 对所有的 Less 文件
      customSyntax: "postcss-less" // 使用 postcss-less 解析样式语法
    },
    {
      files: ["**/*.(vue|scss)"], // 对所有的 SCSS 文件
      customSyntax: "postcss-scss" // 使用 postcss-scss 解析样式语法
    }
  ]
}
