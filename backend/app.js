const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


var indexRouter = require('./routers/index')
var usersRouter = require('./routers/users')
var noticesRouter = require('./routers/notices')
var eventsRouter = require('./routers/events')

var app = express()

// 允许所有跨域请求
app.use(cors())
// 控制台中显示简洁的开发日志
app.use(morgan('dev'))
// 解析 JSON 格式的请求体
app.use(express.json())
// 解析请求中的 Cookie
app.use(cookieParser())
app.use(express.urlencoded({}))
// 指定一个文件夹，让其中的文件可以直接通过浏览器访问
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/notices', noticesRouter)
app.use('/events', eventsRouter)

module.exports = app