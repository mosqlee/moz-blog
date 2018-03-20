<template>
  <div>
    <article class="blog-item-container" v-for="item in items" :key="item.id">
        <div class="blog-title-intro">
            <router-link tag="h2"
            :to="{ name: 'blogDetail', params: { id: item.id }}">{{item.title}}</router-link>
            <p class="blog-time">{{item.createAt | formatDate(item.category)}}</p>
            <p class="blog-intro">{{item.intro}}</p>
        </div>
        <img class="blog-item-img" :src="item.img" alt="">
    </article>
  </div>
</template>

<script>
export default {
  name: 'blog',
  props: {
    items: Array
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .blog-item-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 40px auto;
    }
    h2 {
      cursor: pointer;
    }
    .blog-item-img {
        width: 150px;
        height: 150px;
        flex-shrink: 0;
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
