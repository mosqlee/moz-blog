<template>
  <div class="hello">
    {{data}}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      data: 'home works'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
