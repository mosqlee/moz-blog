import axios from 'axios'

const state = {
  bolg_array: [],
  total_page: 1,
  current_page: 1
}

const mutations = {
  query (state, data) {
    state.bolg_array = data.res.blog
    state.total_page = data.res.total
    state.current_page = data.res.current
  }
}

const actions = {
  query ({ commit }, page) {
    axios.get(`/api/blog?page=${page.page}`)
      .then((res) => {
        console.log(res)
        commit({
          type: 'query',
          res: res.data.data
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
