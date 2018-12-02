<template>
  <div class="blog-detail-container">
    <h2 class="text-center">{{blog.title}}</h2>
    <p class="blog-time text-center">{{blog.createAt | formatDate(blog)}}</p>
    <!-- <div class="blog-detail" v-html="blog.detail"></div> -->
    <editor-md :detail="blog.detail"></editor-md>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import editormd from '../commonComponent/editormd'
export default {
  name: 'Blog',
  data () {
    return {
      data: 'test'
    }
  },
  components: {
    'editor-md': editormd
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
    console.log(this.$route.params.id)
  }
}
</script>
<style>
  .blog-detail {
    margin: 20px 20px;
  }
  .blog-detail-container{
    padding: 0 20px;
  }
</style>
