import { LoginData } from './../model/login-data.model';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  public user: LoginData = new LoginData();

  _submitForm() {
    this.user = Object.assign({}, this.validateForm.value);
    console.log(this.user);
    this.loginService.login(this.user);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder,
  public loginService: LoginService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
