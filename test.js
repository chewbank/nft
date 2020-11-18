"use strict"

let NFT = require('.')

let container = NFT({
   "extend": {
      "path": "app/extend",
      "exclude": ['e'],
      // "suffix": ".js",
      file(filePath, filename) {
         // console.log(filePath, filename)
      },
      directory(dirPath, dirName) {
         // console.log(dirPath, dirName)
      }
   },
   "controllers": {
      "path": "app/controllers",
      // "contain": ["_route.js"],
      // "exclude": ['c1'],
      file(filePath, filename) {
         // console.log(filePath, filename)
      },
      directory(dirPath, dirName) {
         // console.log(dirPath, dirName)
      }
   },
   "models": {
      "path": "app/models",
      "exclude": ['c1.js'],
      file(filePath, filename) {
         // console.log(filePath, filename)
      },
      directory(dirPath, dirName) {
         // console.log(dirPath, dirName)
      }
   }
})

console.log(container)
