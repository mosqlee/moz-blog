import {CanActivate} from '@angular/router';

export class LoginGard implements CanActivate {
  // TODO: 验证登录是否有效
  canActivate(){
    const isLoged:boolean = !!window.localStorage.getItem("jwtToken");
    console.log(isLoged);
    return isLoged;
  }
}