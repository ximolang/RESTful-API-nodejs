# RESTful-API-Nodejs

## 一、REST风格应用的需求

1. 处理CURD
2. 标准的URL （http://example.com/api/lists http://example.com/api/lists/:list_id）
3. 用HTTP动词，GET、POST、PUT、DELETE等
4. 返回JSON数据
5. 打印日志

## 二、搭建项目结构

    - node_modules
    - package.json
    - README.md
    - app.js

## 三、 搭建测试

```
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let port = process.env.PORT || 4000

const router = express.Router()

router.get('/', function (req, res) {
  res.json({message: "this is a test~"})
})

app.use('/api',router)

app.listen(port)

console.log(`Server start at localhost:${port}`)
```

## 四、规划 RESTful API

| 路由 | HTTP | 描述 |
| --- | ---- | ----|
| /api/lists | GET | 获取数据列表，JSON解析为数组格式 |
| /api/lists | POST | 创建一条列表项数据 |
| /api/lists/:list_id | GET | 根据id获取一条列表项数据 |
| /api/lists/:list_id | POST | 根据id更新一条列表项数据 |
| /api/lists/:list_id | DELETE | 根据id删除一条列表项数据 |

## 五、mongoDB数据存储

安装mongoDB之后启动服务：`mongod --config /usr/local/etc/mongod.conf` (mac)

通过mongoose连接数据库：
```
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017'
mongoose.connect(url)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database opend!')
})
```

