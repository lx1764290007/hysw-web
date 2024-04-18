module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "google",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "block-scoped-var": 0,
    // if while function 后面的{ 必须与if在同一行，java风格。
    "brace-style": [2, "1tbs", {"allowSingleLine": true}],
    // react prop参数校验关闭
    "react/prop-types": "off",
    "operator-linebreak": [2, "after"], // 换行时运算符在行尾还是行首
    "padded-blocks": 0, // 块语句内行首行尾是否要空行
    "prefer-const": 0, // 首选const
    "prefer-spread": 0, // #首选展开运算
    "prefer-reflect": 0, // #首选Reflect的方法
    "quotes": [1, "double"], // #引号类型 `` "" ''
    "quote-props": 0, // #对象字面量中的属性名是否强制双引号
    "comma-dangle": [2, "never"],
    "max-len": [0, 180, 4] // 字符串最大长度
  }
};
