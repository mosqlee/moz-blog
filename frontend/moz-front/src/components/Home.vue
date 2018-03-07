<template>
    <div>
    <section class="blog-item-container">
        <blog :items="data"></blog>
    </section>
    </div>
</template>

<script>
import Blog from '../commonComponent/blog-item'
export default {
  name: 'Home',
  components: {Blog},
  data () {
    return {
      data: [{
        title: 'learn rxjs',
        intro: `sdfasdfwasdfasdfasdrqwerwerwqerwasdfasasdfasdfdfqerqwerwqerqwewqerwqerqweasasdfsadfdfasdsadfsadffasdfrqwer
        qwerqwesdfaasdfsadfasdfasdfsdfsarqwerqwer
        qwerqwasdfasasdfasdfasdfdfasdfasdfasdffsadferwqer`,
        id: Math.floor(Math.random() * 10),
        createAt: Date.parse(new Date()),
        updateAt: Date.parse(new Date()) + 21000,
        img: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520414235775&di=94d02d3aa3b0fa0fcc1fe369861e72d0&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F314e251f95cad1c847e70404733e6709c93d51b1.jpg`,
        category: `计算机基础`
      }]
    }
  },
  beforeCreate: function () {
    console.log(this.data)
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
