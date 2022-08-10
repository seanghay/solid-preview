import { defineConfig } from 'rollup'
import run from "@rollup/plugin-run";
import resolve from "@rollup/plugin-node-resolve";
import pkg from './package.json'
import babel from '@rollup/plugin-babel'

const dev = process.env.NODE_ENV !== "production";

export default defineConfig({
  input: "./src/main.jsx",
  output: {
    file: pkg.main,
    format: pkg.type
  },
  external: [
    "solid-js", 
    "solid-js/web", 
    "@solidjs/router", 
    "express",
    "puppeteer-core",
    "http-graceful-shutdown"
  ],
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    babel({
      babelHelpers: "bundled",
      presets: [
        [
          "solid", {
            generate: "ssr",
            hydratable: false
          }]
      ]
    }),
    process.env.ROLLUP_RUN && run({
      args: ["-r", "dotenv/config"],
    })
  ]
})