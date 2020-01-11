const GET_USER_INFO = 'USER/USER_INFO'

const changeUserInfo= data => ({
  type: GET_USER_INFO,
  data
})

export const getUserInfo = () => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/user/info')
      .then(res => {
        const { data } = res.data
        dispatch(changeUserInfo(data))
      })
  }
}

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...state, userInfo: action.data }
    default:
      return state
  }
}
