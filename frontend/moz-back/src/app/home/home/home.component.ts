import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  homeNav = [{name: '轮播图管理', route: 'carousel'}];
  constructor() { }

  ngOnInit() {
  }

}
