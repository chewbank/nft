'use strict';

const fs = require('fs')
const path = require("path")
const exclude = [".DS_Store", '.vscode', '.git', 'node_modules']

class Parser {

   constructor(options) {

      this.options = options
      this.container = {}

   }

   /**
    * 模块目录递归遍历器（当找不到目录时停止递归）
    * @param {*} $path 模块路径
    * @param {*} option 选项
    * @param {*} container 模块导出容器
    */
   recursion($path, option, container) {

      try {
         var readdir = fs.readdirSync($path)
      } catch (err) {
         return
      }

      for (let name of readdir) {

         // 内置的排除目录项
         if (exclude.indexOf(name) > -1) {
            continue
         }

         // 目录、模块路径过滤
         if (option.contain) {
            if (option.contain.indexOf(name) === -1) {
               continue
            }
         } else if (option.exclude) {
            if (option.exclude.indexOf(name) > -1) {
               continue
            }
         }

         let absolutePath = path.join($path, name)

         let stat = fs.statSync(absolutePath);

         // 文件类型
         if (stat.isFile()) {

            // .js文件类型
            if (/\.js$/.test(name)) {

               let index = name.indexOf('.js')

               let filename = name.slice(0, index)

               container[filename] = { filePath: absolutePath, fileName: name }

               if (option.file) {
                  option.file(absolutePath, name)
               }

            }

         }

         // 目录类型
         else {

            container[name] = {}

            if (option.directory) {
               option.directory(absolutePath, name)
            }

            this.recursion(absolutePath, option, container[name])

         }

      }

   }

}

/**
 * 
 * @param {Object} options 选项
 * @param {Object} container 将模块挂载到指定容器
 */
module.exports = function (options, container = {}) {

   if (!options instanceof Object) return

   let parser = new Parser(options, container);

   let cwd = process.cwd()

   for (let name in options) {
      let option = options[name]
      container[name] = {}
      let directoryPath = path.join(cwd, option.path)
      parser.recursion(directoryPath, option, container[name])
   }

   return container

}