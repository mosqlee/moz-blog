import { LoginData } from './../model/login-data.model';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public loginUrl = '/api/login';
  public subject: Subject<User> = new Subject<User>();
  constructor(public http: Http) { }
  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }
  public login(user: LoginData) {
    return this.http.post(this.loginUrl, JSON.stringify(user), { headers: this.headers }).
    map((res: Response) => {
      const use = res.json();
      console.log(res);
      // if (use) {
      //   this.subject.next(Object.assign({}, use));
      // }
      return res;
      }).subscribe((data) => {
        console.log(data, 'login success');
      });
  }

}
