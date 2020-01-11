import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import routes from '../src/App'
import { Route, StaticRouter, matchPath, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/components/Header'
import csrConfig from './config'
// const  request = require('request')
// const bodyParser = require('body-parser')
const proxy = require('http-proxy-middleware')
const path = require('path')
const fs = require('fs')
// const favicon = require('serve-favicon')
const baseURL = 'http://localhost:9090'

const store = getServerStore()
const app = express()
app.use(express.static('public'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(favicon(path.resolve('public/images', 'favicon.ico')))

app.use('/api', proxy({
  target: baseURL,
  changeOrigin: true
}))

function csrRender(res) {
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}

app.get('*', (req, res) => {
  if (csrConfig.csr === true) {
    console.log('url参数开启csr降级')
    return csrRender(res)
  }
  /* if (req.path.startsWith('/api')) {
    request({
      url: baseURL + req.path,
      method: req.method,
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: req.body
    }, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        res.json(body)
      }
    })
    return
  } */
  const promises = [] // 存储网络请求
  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        promises.push(loadData(store))
        // const promise = new Promise((resolve, reject) => {
        //   loadData(store).then(resolve).catch(resolve)
        // })
        // promises.push(promise)
      }
    }
  })

  // 等待所有网络请求结束再渲染
  Promise.allSettled(promises).then(() => {
    const context = {
      css: []
    }
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header/>
          <Switch>
            {routes.map(route => <Route {...route}></Route>)}
          </Switch>
        </StaticRouter>
      </Provider>
    )

    if (context.statusCode) {
      res.status(context.statusCode)
    }

    if (context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }

    const css = context.css.join('\n')

    res.send(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>react ssr</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__context = ${JSON.stringify(store.getState())}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  }).catch(error => {
    console.log(error)
    res.send('报错页面')
  })
})

app.listen(9093, () => {
  console.log(`服务器启动在 http://localhost:9093`)
})
