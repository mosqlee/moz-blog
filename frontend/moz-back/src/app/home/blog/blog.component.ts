import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { fadeIn } from './../../animations/fade-in';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [fadeIn]
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  _dataSet = [];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs()
      .then((blogs) => {
        this.blogs = blogs;
      });
  }

}
