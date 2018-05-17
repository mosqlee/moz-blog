import { GetBlogDetailService } from './../blog-detail/get-blog-detail.service';
import {AfterViewInit, Attribute, Directive, EventEmitter, Input, Output} from '@angular/core';
import {EditorConfig} from './model/editor-config';

declare var editormd: any;
declare var $: any;

@Directive({
  selector: '[appEditorMd]',
  inputs: ['data', 'editormdConfig']
})
export class EditorMdDirective implements AfterViewInit {
  @Input() editormdConfig: EditorConfig; // 配置选项
  @Output() onEditorChange: EventEmitter<string> = new EventEmitter<string>(); // 发射器
  editor: any; // editormd编辑器
  get: any;
  constructor(
    @Attribute('id') private id: string,
    getBlogDetailService: GetBlogDetailService
) {
  this.get = getBlogDetailService;
  }

  ngAfterViewInit(): void {
    this.editor = editormd(this.id, this.editormdConfig); // 创建编辑器
    const that = this;
    const out = this.onEditorChange;
    const textarea = $('#' + this.id + ' :first'); // 获取textarea元素
    // 当编辑器内容改变时，触发textarea的change事件
    this.editor.on('change', function () {
      out.emit(textarea.val());
    });
    this.get.currentBlog.subscribe(
      (d) => {
        console.log('subject');
        this.editor.setMarkdown(d.content);
      }
    );
  }
}
