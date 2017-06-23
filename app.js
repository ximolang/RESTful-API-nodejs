// 测试数据
let listArr = []


const express = require('express')
const bodyParser = require('body-parser')
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
  res.json({message: "欢迎访问通过Nodejs构建的RESTful API"})
})

// 获取数据列表 GET '/lists'

router.route('/lists').get(function (req, res) {
  // 此处为查询数据逻辑

  if (listArr.length === 0) {
    res.json({
      message: "列表为空！"
    })
  }
  res.json(listArr)
  
})

// 增加一条数据 POST '/lists'

router.route('/lists').post(function (req, res) {
  // 此处为模拟获取数据逻辑
  const id = req.body.id
  const title = req.body.title
  const content = req.body.content
  const date = Date.now()

  listArr.push({
    id: id,
    title: title,
    content: content,
    date: date
  })

  res.json({message: '数据创建成功！'})
})

// 根据id获取一条数据 GET 'lists/:list_id'
router.route('/lists/:list_id').get(function (req, res) {

  const listid = req.params.list_id

  // 模拟查询取数据
  let item = null
  listArr.forEach(function (obj){
    if (obj.id == listid) item = obj
  })

  res.json(item)

})


app.use('/api',router)

app.listen(port)

console.log(`Server start at localhost:${port}`)