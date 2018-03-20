import { BlogModel } from './blog-detail/blog.model';
import { GetBlogDetailService } from './blog-detail/get-blog-detail.service';
import { BlogService } from './blog/blog.service';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogComponent } from './blog/blog.component';
import { homeRoute } from './home.route';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { EditorMdModule } from '';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(homeRoute),
    EditorMdModule
  ],
  providers: [BlogService, GetBlogDetailService, BlogModel],
  declarations: [HomeComponent, BlogDetailComponent, NewsComponent, BlogComponent]
})
export class HomeModule { }
