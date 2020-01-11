import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
import { Redirect } from 'react-router-dom'

function User(props) {
  return <Redirect to="/"></Redirect>
  // return (
  //   <div>
  //     <h1>
  //       你好 {props.userInfo ? props.userInfo.name : ''}， 你们是最棒的 {props.userInfo ? props.userInfo.best : ''}
  //     </h1>
  //   </div>
  // )
}

User.loadData = store => {
  return store.dispatch(getUserInfo())
}

export default connect(
  state => ({userInfo: state.user.userInfo}),
  {getUserInfo}
)(User)
