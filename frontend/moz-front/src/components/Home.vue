<template>
    <div>
      <section class="blog-item-container">
        <blog :items="blog.bolg_array"></blog>
        <b-pagination-nav base-url="#/home/"
        :number-of-pages="blog.total_page"
        v-model="blog.current_page"/>
      </section>
    </div>
</template>

<script>
import Blog from '../commonComponent/blog-item'
import { mapState } from 'vuex'
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav'

export default {
  name: 'Home',
  components: {
    'blog': Blog,
    'b-pagination-nav': bPaginationNav
  },
  data () {
    return {
      data: 'test',
      currentPage: +this.$route.params.page
    }
  },
  // computed: mapGetters({
  //   blog: 'blogArray'
  // }),
  computed: {
    ...mapState({
      blog: state => state.blogs
    })
  },
  watch: {
    '$route': function (to, from) {
      this.query(this.$route.params.page)
    }
  },
  methods: {
    changePage: (page) => {
      this.query(page)
    },
    query: function (page) {
      if (page) {
        this.$store.dispatch({
          type: 'query',
          page: page
        })
      } else {
        this.$store.dispatch({
          type: 'query',
          page: 1
        })
      }
    }
  },
  created: function () {
    console.log(this.currentPage)
    this.query(this.$route.params.page)
    console.log(this)
  }
  // mounted: function () {
  //   setTimeout(() => {
  //     this.currentPage = +this.$route.params.page
  //     console.log(this.currentPage)
  //   }, 2000)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blog-item-container{
    margin: 0 auto;
    max-width: 750px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
