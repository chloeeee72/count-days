import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "src/index.ts", // 主入口文件
  output: [ // 输出配置
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins: [ // 插件配置
    resolve({
      browser: true
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript(),
    terser()
  ],
};
