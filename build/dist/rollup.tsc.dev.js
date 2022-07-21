"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _rollupPluginTypescript = _interopRequireDefault(require("rollup-plugin-typescript2"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-26 17:26:37
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:42:59
 */
// 告诉 Rollup 如何查找外部模块
var input = (0, _path.resolve)(__dirname, '../packages'); // 入口文件

var output = (0, _path.resolve)(__dirname, '../lib'); // 输出文件

var _default = [{
  input: "".concat(input, "/index.ts"),
  output: {
    format: 'es',
    file: "".concat(output, "/index.esm.js")
  },
  plugins: [(0, _rollupPluginTerser.terser)(), (0, _pluginNodeResolve["default"])(), (0, _rollupPluginCommonjs["default"])({
    include: 'node_modules/**',
    ignoreGlobal: true,
    sourceMap: false,
    namedExports: {}
  }), (0, _rollupPluginTypescript["default"])({
    useTsconfigDeclarationDir: false,
    tsconfigOverride: {
      include: ['packages/**/*'],
      exclude: ['node_modules']
    },
    abortOnError: false
  })]
}];
exports["default"] = _default;