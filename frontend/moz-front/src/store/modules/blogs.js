import axios from 'axios'

const state = {
  bolg_array: []
}

const mutations = {
  query (state, data) {
    state.bolg_array = data.res
  }
}

const actions = {
  query ({ commit }, somthing) {
    axios.get('/api/blog')
      .then((res) => {
        console.log(res.data)
        commit({
          type: 'query',
          res: res.data.blog
        })
      })
      .catch(e => console.log(e))
  }
}
export default {
  state,
  mutations,
  actions
}
