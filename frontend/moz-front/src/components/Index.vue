<template>
  <div class="nav-container">
    <nav>
      <div class="nav-basic-info" to="/home">
        <img class="nav-avatar" src="../assets/logo.png" alt="">
        <p class="nav-name mg-none">
          <strong>蚊子锅</strong>
        </p>
        <p>Frontend Engineer</p>
      </div>
      <ul class="route-list">
        <router-link v-for="item in routeList" :key="item.name" :to="item.route" tag="li" active-class>
          <i class="iconfont nav-icon" :class="item.class"></i>
          <span class="hide-768">{{item.name}}</span>
        </router-link>
        <p style="display: none">{{blog.length}}</p>
      </ul>
    </nav>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      routeList: [
        {route: '/home/1', name: '首页 ', class: 'icon-home'},
        {route: '/category', name: '分类', class: 'icon-categoryselected'},
        {route: '/about', name: '联系我', class: 'icon-email'}
      ]
    }
  },
  computed: {
    ...mapState({
      blog: state => state.blogs.bolg_array
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav-container{
  position: relative;
}
nav {
  position: fixed;
  left: 0;
  z-index: 20;
  height: 100vh;
  background: url('../assets/cover.jpg');
  color: #ebebeb;
}
.nav-basic-info{
  padding-top: 40px;
  color: #ebebeb;
  cursor: pointer;
}
.main {
  min-height: 100vh;
}
.iconfont{
  font-size: 1.33333em;
}
.nav-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
@media only screen and (min-width:1024px) {
  .main {
    float: right;
    padding-top: 15px;
    width: calc(100% - 250px)
  }
  nav {
    width: 250px;
  }
}
@media only screen and (max-width:767px) {
  .main {
    float: right;
    padding-top: 15px;
    width: 100%
  }
    nav {
    left: -250px;
    width: 250px;
  }
}
li {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding-left: 55px;
  width: 100%;
  cursor: pointer;
}
@media only screen and (min-width:768px) and (max-width:1024px) {
  .main {
    float: right;
    padding-top: 15px;
    width: calc(100% - 50px)
  }
  nav {
    width: 50px;
  }
  .nav-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .nav-basic-info{
    font-size: 12px;
  }
  .hide-768 {
    display: none;
  }
  li {
    padding-left: 14px;
  }
}
ul {
  list-style-type: none;
  margin-top: 23px;
  padding: 0;
  width: 100%;
}
li:hover {
  font-weight: 600;
}
.nav-icon{
  margin-right: 15px;
}
a {
  color: #42b983;
}
</style>
