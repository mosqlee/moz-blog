<template>
    <div>
    <section class="blog-item-container">
      <blog :items="blog"></blog>
    </section>
    </div>
</template>

<script>
import Blog from '../commonComponent/blog-item'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {Blog},
  data () {
    return {
      data: 'test'
    }
  },
  // computed: mapGetters({
  //   blog: 'blogArray'
  // }),
  computed: {
    ...mapState({
      blog: state => state.blogs.bolg_array
    })
  },
  methods: {
    query: function () {
      this.$store.dispatch({
        type: 'query'
      })
    }
  },
  created: function () {
    this.query()
    setTimeout(() => {
      console.log(this.$store.state.blogs)
      // this.$store.state.blogs.bolg_array = [{title: 1}]
      console.log(this.$store.state.blogs.bolg_array)
    }, 2000)
  }
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
