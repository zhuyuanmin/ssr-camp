import React from 'react'
import { Route } from 'react-router-dom'

function Status({code, children}) {
  return <Route render={({staticContext}) => {
    if (staticContext) {
      staticContext.statusCode = code
    }
    return children
  }}></Route>
}

function NotFound(props) {
  return <Status code={404}>
    <h1>大兄弟瞅啥呢</h1>
    <img id="img-404" src="/images/404.jpg" alt=""/>
  </Status>
}

export default NotFound
