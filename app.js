const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
let List = require('./models/list.js')

const url = 'mongodb://127.0.0.1:27017'
mongoose.connect(url)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database opend!')
})

// APP
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let port = process.env.PORT || 4000

const router = express.Router()

// 打印控制
router.use(function (req, res, next) {
  console.log(`The Request Info is ...\n`)
  next()
})

// 构建 RESTful API

// 默认根路由
router.get('/', function (req, res) {
  res.json({message: "Welcome!"})
})

// 获取数据列表 GET '/lists'

router.route('/lists').get(function (req, res) {
  // 此处为查询数据逻辑
  List.find(function (err, lists) {
    if (err) return res.send(err)
    res.json(lists)
  })
})

// 增加一条数据 POST '/lists'

router.route('/lists').post(function (req, res) {
  // 此处为获取数据逻辑
  const title = req.body.title
  const content = req.body.content
  let tagArr = []
  const tags = req.body.tags.trim()

  if (tags.indexOf(',') === -1) {
    tagArr = new Array(tags)
  } else {
    tagArr = tags.split(',')
  }

  let listitem = new List()
  listitem.title = title
  listitem.content = content
  listitem.tags = tagArr

  listitem.save(function (err) {
    if (err) res.send(err)
    res.json({message: '数据创建成功！'}) 
  })
})

// 根据id获取一条数据 GET 'lists/:list_id'
router.route('/lists/:list_id').get(function (req, res) {
  const listid = req.params.list_id
  // 查询取数据
  List.findById(listid, function (err, item) {
    if (err) res.send(err)
    res.json(item)
  })
})

// 根据id 删除一条数据
router.route('/lists/:list_id').delete(function (req, res) {
  const listid = req.params.list_id
  let query = List.find({_id: listid}).remove(function (err) {
    if (err) res.send(err)
    res.json({message: '删除成功！'})
  })
})

// 根据id 修改一条数据
router.route('/lists/:list_id').post(function (req, res) {
  const body = req.body
  const listid = req.params.list_id

  List.findOne({_id: listid}, function (err, doc) {
    if (err) res.send(err)
    for (key in body) {
      console.log(key,body[key])
      if (key) doc[key] = body[key]
    }
    doc.save(function (err) {
      if (err) res.send(err)
      res.send({message: '更新成功！'})
    })
  })

})





app.use('/api',router)

app.listen(port)

console.log(`Server start at localhost:${port}`)