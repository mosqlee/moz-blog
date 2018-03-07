<template>
  <article class="blog-item-container">
      <div class="blog-title-intro">
          <h2>{{item.title}}</h2>
          <p class="blog-time">{{item.createAt | formatDate(item.category)}}</p>
          <p class="blog-intro">{{item.intro}}</p>
      </div>
      <img class="blog-item-img" :src="item.img" alt="">
  </article>
</template>

<script>
export default {
  name: 'blog',
  props: {
    item: {
      title: String,
      intro: String,
      createAt: Number,
      id: Number,
      updateAt: Number,
      img: String,
      category: String
    }
  },
  data () {
    return {}
  },
  filters: {
    formatDate: (value, cate) => {
      if (!value) return ''
      const date = new Date(value)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDay()
      return `${month}月 ${day},${year} about ${cate}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .blog-item-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 20px auto;
    }
    h2 {
      cursor: pointer;
    }
    .blog-item-img {
        width: 150px;
        height: 150px;
    }
    .blog-time {
        font-size: 14px;
        color: #9eabb3;
    }
    .blog-intro {
        margin-right: 10px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .blog-title-intro {
        text-align: left;
    }
    @media only screen and (max-width:768px) {
      .blog-item-img {
        display: none;
      }
      .blog-title-intro{
          padding: 0 20px;
      }
    }
</style>
