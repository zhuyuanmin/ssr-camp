const express = require('express')
const axios = require('axios')
const puppeteer = require('puppeteer')
const app = express()

// async function test() {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://kaikeba.com/')
//   await page.screenshot({ path: 'kaikeba.png' })
//   await browser.close()
// }
const urlCache = {}
app.get('*', async (req, res) => {
  if (urlCache[req.url]) {
    return res.send(urlCache[req.url])
  }
  if (req.url === '/favicon.ico') {
    return res.send({code: 0})
  }
  const url = 'http://localhost:9093' + req.url
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: ['networkidle0']
  })
  const html = await page.content()
  urlCache[req.url] = html
  res.send(html)
})

app.listen(8050, () => {
  console.log('ssr server start at http://localhost:8050')
})
