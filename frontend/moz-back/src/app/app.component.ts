import { User } from './model/user.model';
import { LoginService } from './login/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public currentUser: User;
  constructor(
    public loginService: LoginService,
    public router: Router
  ) {}
  ngOnInit() {
    this.loginService.currentUser.subscribe(
      (data) => {
        this.currentUser = data;
        console.log(data);
        this.router.navigateByUrl('main');
      }
    );
  }
}
