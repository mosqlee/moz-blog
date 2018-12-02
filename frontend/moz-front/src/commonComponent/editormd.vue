<template>
  <div id='editor-md'>
    <textarea style='display:none;' name='editor-md-doc' ></textarea>
  </div>
</template>

<script>
import $script from 'scriptjs'
import $ from 'jquery'

export default {
  props: {
    detail: {
      require: false,
      default: '###sfddfasdf'
    }
  },
  methods: {
    init () {
      let testEditormdView = window.editormd.markdownToHTML('editor-md', {
        markdown: this.detail, // + '\r\n' + $('#append-test').text(),
        // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode: 'style,script,iframe', // you can filter tags decode
        // toc: false,
        tocm: true, // Using [TOCM]
        // tocContainer: '#custom-toc-container', // 自定义 ToC 容器层
        // gfm: false,
        // tocDropdown: true,
        // markdownSourceCode: true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji: true,
        taskList: true,
        tex: true, // 默认不解析
        flowChart: true, // 默认不解析
        sequenceDiagram: true // 默认不解析
      })
      console.log(testEditormdView)
      // console.log('返回一个 jQuery 实例 =>', testEditormdView);
      // 获取Markdown源码
      // console.log(testEditormdView.getMarkdown())
      // alert(testEditormdView.getMarkdown())
    }
  },

  created () {
    window.$ = window.jQuery = $
    const path = '/static/editor.md/lib/'
    Promise.all(
      [
        $script(`${path}marked.min.js`),
        $script(`${path}prettify.min.js`),
        $script(`${path}raphael.min.js`),
        $script(`${path}underscore.min.js`),
        $script(`${path}sequence-diagram.min.js`),
        $script(`${path}flowchart.min.js`),
        $script(`${path}jquery.flowchart.min.js`),
        $script(`/static/editor.md/editormd.min.js`)
      ]
    ).then(res => {
      setTimeout(() => {
        this.init()
      }, 1000)
    })
    // scriptLoader('/static/editor.md/editormd.js').then(res => {
    //   loadEditorMd = true
    // })
  },
  mounted () {
    // const interval = setInterval(() => {
    //   if (scriptLoader) {
    //     clearInterval(interval)
    //     console.log(this)
    //     this.init()
    //   }
    // }, 300)
  }
}
</script>

<style>
</style>
