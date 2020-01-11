let express = require('express')
const app = express()

app.get('/api/user/info', (req, res) => {
  res.json({
    code: 0,
    data: {name: '开课吧', best: '大圣'}
  })
})

app.post('/api/course/list', (req, res) => {
  res.json({
    code: 0,
    list: [
      { name: 'web全栈', id: 1 },
      { name: 'js高级', id: 2 },
      { name: 'web小白', id: 3 },
      { name: 'java架构师', id: 4 },
      { name: 'python学习', id: 5}
    ]
  })
})

app.listen(9090, () => {
  console.log(`mock启动在 http://localhost:9090`)
})
