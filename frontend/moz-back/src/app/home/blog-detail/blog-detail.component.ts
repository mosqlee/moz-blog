import { TestBed } from '@angular/core/testing';
import { BlogModel } from './blog.model';
import { GetBlogDetailService } from './get-blog-detail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
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

  ngOnInit() {
    this.route.paramMap
      //  .map((params: ParamMap) => {
      //    console.log(params.get('id'))})
      .switchMap((params: ParamMap) => this.getBlog.getBlogDetail(+params.get('id')))
      .subscribe(blog => {
        console.log(blog);
        this.blog = blog;

      });


  }

}
