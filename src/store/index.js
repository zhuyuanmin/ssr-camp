const GET_LIST = 'INDEX/GET_LIST'

const changeList = list => ({
  type: GET_LIST,
  list
})

export const getIndexList = () => {
  return (dispatch, getState, $axios) => {
    return $axios.post('/api/course/list', { username: 'user1', password: '123' })
      .then(res => {
        const { list } = res.data
        dispatch(changeList(list))
      })
  }
}

const defaultState = {
  list: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return { ...state, list: action.list }
    default:
      return state
  }
}
