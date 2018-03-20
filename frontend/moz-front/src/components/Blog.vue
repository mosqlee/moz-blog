<template>
  <div>
    <h2>{{blog.title}}</h2>
    <p class="blog-time">{{blog.createAt | formatDate(blog.category)}}</p>
    <div class="blog-detail" v-html="blog.detail"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Blog',
  data () {
    return {
      data: 'test'
    }
  },
  computed: {
    ...mapState({
      blog: state => state.blogDetail.detail
    })
  },
  methods: {
    query: function (id) {
      id = id | 1
      this.$store.dispatch({
        type: 'getBlog',
        id: id
      })
    }
  },
  created: function () {
    this.query(this.$route.params.id)
    console.log(this.$store)
  }
}
</script>
<style>
  .blog-detail {
    margin: 20px 20px;
  }
</style>
