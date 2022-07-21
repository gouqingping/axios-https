"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _rollupPluginTypescript = _interopRequireDefault(require("rollup-plugin-typescript2"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

var _fs = require("fs");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2022-01-26 17:26:37
 * @LastEditors  : Pat
 * @LastEditTime : 2022-04-15 17:42:05
 */
// 告诉 Rollup 如何查找外部模块
var input = (0, _path.resolve)(__dirname, '../packages'); // 入口文件

var output = (0, _path.resolve)(__dirname, '../lib'); // 输出文件

var configs = [];

var readFields = function readFields(url) {
  (0, _fs.readdirSync)("".concat(input, "/").concat(url)).filter(function (cname) {
    return !["dist"].includes(cname);
  }).map(function (iname) {
    if (iname.indexOf('.ts') > -1) {
      iname.indexOf('.d.ts') == -1 && iname !== 'types.ts' && configs.push({
        input: "".concat(input, "/").concat(url, "/").concat(iname),
        plugins: [(0, _pluginNodeResolve["default"])(), (0, _rollupPluginCommonjs["default"])({
          include: 'node_modules/**',
          ignoreGlobal: true,
          sourceMap: false,
          namedExports: {}
        }), (0, _rollupPluginTypescript["default"])({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false
            },
            exclude: ['node_modules', 'dist', 'lib']
          },
          abortOnError: false,
          clean: true
        })],
        output: {
          name: 'index',
          file: "".concat(output, "/").concat(url, "/").concat(iname.replace('.ts', '.js')),
          format: 'es' //"amd", "cjs", "system", "es", "iife" or "umd"

        }
      });
    } else {
      readFields("".concat(url, "/").concat(iname));
    }
  });
};

(0, _fs.readdirSync)(input).filter(function (name) {
  return !['index.ts', 'types.ts', "dist"].includes(name);
}).map(function (name) {
  readFields(name);
});
var _default = configs;
exports["default"] = _default;