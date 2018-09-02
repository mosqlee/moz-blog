import { TestBed } from '@angular/core/testing';
import { BlogModel } from './blog.model';
import { GetBlogDetailService } from './get-blog-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { EditorConfig } from '../editor/model/editor-config';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private getBlog: GetBlogDetailService,
    private blog: BlogModel,
  ) { }

  conf = new EditorConfig();
  markdown = '1';
  category = [
    {id: 0 , value: '前端技术'},
    {id: 1, value: '后端技术'},
    {id: 2, value: '生活随笔'},
    {id: 3, value: '面试心得'}
  ];
  // 同步属性内容
  syncModel(str): void {
    // this.blog.content = str;
    this.markdown = str;
    console.log(this.markdown);
  }
  ngOnInit() {
    this.route.paramMap
      //  .map((params: ParamMap) => {
      //    console.log(params.get('id'))})
      .switchMap((params: ParamMap) => this.getBlog.getBlogDetail(+params.get('id')))
      .subscribe(blog => {
        console.log(blog);
        this.blog = blog;
        this.markdown = blog.content;
        console.log(this.markdown);
      });
  }
  submit(): void {
    console.log('test');
  }
}
