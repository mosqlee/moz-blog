import { TestBed } from '@angular/core/testing';
import { Blog } from '../blog/blog.model';
import { GetBlogDetailService } from './get-blog-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private getBlog: GetBlogDetailService,
    private blog: Blog,
  ) { }

  public isNew: boolean = false;

  conf = new EditorConfig();
  
  markdown = '1';
  
  id : string;

  public cates = [
    {id: 0 , value: '前端技术'},
    {id: 1, value: '后端技术'},
    {id: 2, value: '生活随笔'},
    {id: 3, value: '面试心得'}
  ];

  public states = [
    {name: "发布", value: 1},
    {name: "草稿", value: 1}
  ];
  public privates = [
    {name:"公开", value:1},
    {name:"私密", value:2}
  ];
  // 同步属性内容
  syncModel(str): void {
    // this.blog.content = str;
    this.markdown = str;
    this.blog.detail = this.markdown;
  }
  ngOnInit() {
    this.activatedRoute.paramMap
       .map((params: ParamMap) => {
         console.log(params.get('id'));
         return params;
        }
        )
      .switchMap((params: ParamMap) => {
        if(params.get('id')){
          this.id = params.get('id');
          this.getBlog.getBlogDetail(params.get('id'));
          this.isNew = false;
        }else{
          this.isNew = true;
        }
        return this.getBlog.currentBlog;
      })
      .subscribe(blog => {
        console.log(blog, 'blog');
        this.blog = blog;
        this.markdown = blog.detail;
        console.log(this.markdown);
      });
  }
  submit(par:any): void {
    console.log(par, "argument");
    console.log(this.blog);
    if(this.isNew){ 
      this.getBlog.postBlogDetail(this.blog).then(res=>{
        if(res.json().data.code === 1){
          this.route.navigate(['/main/blogList'])
        }
      })
    }else {
      this.getBlog.putBlogDetail(this.id, this.blog);
      this.getBlog.newEditResult.subscribe(res=>{
        if(res){
          this.route.navigate(['/main/blogList'])
        } else{
          alert(res);
        }
      })
    }
  }
}