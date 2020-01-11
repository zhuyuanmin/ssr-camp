import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import routes from '../src/App'
import { getClientStore } from '../src/store/store'
import Header from '../src/components/Header'

const store = getClientStore()
// 注水（注入事件） 客户端入口
const Page =
  <Provider store={store}>
    <BrowserRouter>
    <Header/>
    <Switch>
      {routes.map(route => <Route {...route}></Route>)}
    </Switch>
    </BrowserRouter>
  </Provider>

if (window.__context) {
  ReactDom.hydrate(Page, document.getElementById("root"))
} else {
  ReactDom.render(Page, document.getElementById("root"))
}
