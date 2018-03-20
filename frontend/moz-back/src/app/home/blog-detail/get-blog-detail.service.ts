import { BlogModel } from './blog.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GetBlogDetailService {
    private url = 'api/blogDetail';
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
            return res.json() as BlogModel;
        })
            .catch(this.handleError);
    }

}
