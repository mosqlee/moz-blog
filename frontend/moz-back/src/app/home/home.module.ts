import { homeRoute } from './home.route';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { CarouselListComponent } from './carousel-list/carousel-list.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(homeRoute),
  ],
  declarations: [HomeComponent, CarouselListComponent, NewsComponent]
})
export class HomeModule { }
