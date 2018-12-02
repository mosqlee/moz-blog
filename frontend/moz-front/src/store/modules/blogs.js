import axios from 'axios'

const state = {
  bolg_array: [],
  total_page: 1,
  current_page: 1
}

const mutations = {
  query (state, {data}) {
    state.bolg_array = data.list
    const {
      total
    } = data.pagination
    state.total_page = Math.ceil(total / data.pagination.page_size)
    state.current_page = data.pagination.page
  }
}

const actions = {
  query ({ commit }, page) {
    axios.get(`/api/blog?page=${page.page}`)
      .then((res) => {
        console.log(res)
        commit({
          type: 'query',
          data: res.data.data
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
