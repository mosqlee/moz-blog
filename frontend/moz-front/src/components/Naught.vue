<template>
  <div>
    <div class="naught-container">
        <h1>are we clear?</h1>
        <button
          :style="`left:${btnCoordi.x}px; top:${btnCoordi.y}px`"

          class="btn-move"
          @mouseover="onMouseIn"
        >
            test
        </button>
        <button>
            {{data}}
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Naught',
  data () {
    return {
      data: 'leave',
      x: 0,
      y: 0,
      containerCoordi: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    btnCoordi: {
      get: function () {
        return {x: this.x, y: this.y}
      },
      set: function (newV) {
        const {x, y} = newV
        console.log(x, y)
        // const scopedZone = {
        //   x:{min:x - 80, max: x+80},
        //   y:{min:y - 40, max: y+40}
        // }
        this.x = 100
        this.y = 100
      }
    }
  },
  methods: {
    onMouseIn (e) {
      console.log(e)
      this.btnCoordi = e
    }
  },
  mounted () {
    const container = document.querySelector('.naught-container')
    this.containerCoordi = {
      x: container.offsetLeft,
      y: container.offsetTop
    }
  }
}
</script>

<style scoped>
  .naught-container{
    position: relative;
    margin: 0 auto;
    margin-top: 40px;
    width: 600px;
    height: 300px;
    border: 1px solid #333;
  }
  .btn-move{
    position: absolute;
    width: 80px;
    height: 40px;
  }
</style>
