import { LoginData } from './../model/login-data.model';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import Cookie from 'js-cookie';
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
      const response = res.json();
      const token = response.data.token;
      const use:User = response.data.auth;
      console.log(response);
      if (use) {
        this.subject.next(Object.assign({}, use));
      }
      if (token){
        // 储存token到本地
        window.localStorage.setItem("jwtToken", token);
      }
      return res;
      }).subscribe((data) => {
        console.log(data, 'login success');
      });
  }

}
