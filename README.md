# NFT

将目录树的路径信息转换为镜像JS对象结构


### install

      npm install nft

### 使用方法


```js
let NFT = require('nft')

let modules = NFT(options)
```

### NFT(options)

*  `options` *Object*

      *  `path` *String* - 指定递归目录（必填）

      *  `contain` *Array* - 仅包含指定文件或目录，不能与exclude同时使用（可选）

      *  `exclude` *Array* - 排除指定文件或目录，不能与contain同时使用（可选）

      *  `file(filePath, filename)` *Function* - 文件类型递归触发函数

            *  `filePath` *String* - 文件绝对路径

            *  `fileName` * - 包含后缀的文件名

      *  `directory(dirPath, dirName)` *Function* - 目录类型递归触发函数

            *  `dirPath` *Object* - 目录绝对路径

            *  `dirName` *Object* - 目录名称


### 示例

```js
let NFT = require('batch-import')

let files = NFT({
 "extend": {
      "path": "app/extend",
      "exclude": ['e'],
      file(filePath, filename) {

      },
      directory(dirPath, dirName) {

      }
   },
   "controllers": {
      "path": "app/controllers",
      "contain": ["_route.js"],
      "exclude": ['c1'],
      file(filePath, filename) {

      },
      directory(dirPath, dirName) {

      }
   },
   "models": {
      "path": "app/models",
      "exclude": ['c1.js'],
      file(filePath, filename) {

      },
      directory(dirPath, dirName) {

      }
   }
})
```