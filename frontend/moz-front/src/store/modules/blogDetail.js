import axios from 'axios'

const state = {
  detail: {}
}

const mutations = {
  getBlog (state, data) {
    console.log(data.res)
    state.detail = data.res
  }
}

const actions = {
  getBlog ({ commit }, page) {
    axios.get(`/api/blog/${page.page}`)
      .then((res) => {
        console.log(res)
        commit({
          type: 'getBlog',
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
