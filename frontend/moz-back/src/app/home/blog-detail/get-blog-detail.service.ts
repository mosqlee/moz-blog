import { Blog } from '../blog/blog.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GetBlogDetailService {
    private url = 'api/blog';
    public subject: Subject<Blog> = new Subject<Blog>();
    public newEditResult: Subject<boolean> = new Subject<boolean>();
    public get currentBlog(): Observable<Blog> {
        return this.subject.asObservable();
    }
    constructor(
       private http: Http
    ) {}
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
    getBlogDetail(id: string): Promise<Blog> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(res => {
            if (res) {
                const blog = res.json().data;
                this.subject.next(Object.assign({}, blog));
                return res.json() as Blog;
            }
        })
            .catch(this.handleError);
    }
    putBlogDetail(id: string, blog: Blog): Promise<void> {
        const url = `${this.url}/${id}`;
        return this.http.put(url, blog).toPromise()
        .then(res => {
            if (res.json().data === 1) {
                this.newEditResult.next(res.json().data);
            }
        });
    }

}
