import { Blog } from '../blog/blog.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {ResponseData} from '../../model/response-data.model';
@Injectable()
export class GetBlogDetailService {
  private url = 'api/blog';
  public subject: Subject<Blog> = new Subject<Blog>();
  public newEditResult: Subject<boolean> = new Subject<boolean>();
  public get currentBlog(): Observable<Blog> {
    return this.subject.asObservable();
  }
  constructor(
    private http: HttpClient
  ) { }
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
  getBlogDetail(id: string): Promise<Blog> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then((res: any) => {
        if (res) {
          const blog = res.data;
          this.subject.next(Object.assign({}, blog));
          return res.data as Blog;
        }
      })
      .catch(this.handleError);
  }
  // 修改博客详情
  putBlogDetail(id: string, blog: Blog): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, blog).toPromise()
      .then((res: any) => {
        if (res.code === 1) {
          this.newEditResult.next(true);
        }
      });
  }
  postBlogDetail(blog: Blog) {
    const url = this.url;
    return this.http.post(url, blog)
      .toPromise();
      // .then(res => {
      //   if (res.json().data.code === '1') {
      //     this.newEditResult.next(res.json().data);
      //   }
      // })
  }
}
