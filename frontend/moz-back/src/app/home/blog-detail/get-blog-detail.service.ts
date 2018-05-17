import { BlogModel } from './blog.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GetBlogDetailService {
    private url = 'api/blogDetail';
    public subject: Subject<BlogModel> = new Subject<BlogModel>();
    public get currentBlog(): Observable<BlogModel> {
        return this.subject.asObservable();
    }
    constructor(
       private http: Http
    ) {}
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
    getBlogDetail(id: number): Promise<BlogModel> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(res => {
            if (res) {
                this.subject.next(Object.assign({}, res.json()));
                return res.json() as BlogModel;
            }
        })
            .catch(this.handleError);
    }

}
