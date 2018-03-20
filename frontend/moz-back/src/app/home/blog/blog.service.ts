import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Blog } from './blog.model';
@Injectable()
export class BlogService {
    private blogUrl = 'api/blogs';
    constructor(public http: Http) {

    }
    getBlogs(): Promise<Blog[]> {
        return this.http.get(this.blogUrl)
            .toPromise()
            .then(response => {
                console.log(response.json());
                return response.json() as Blog[];
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}
