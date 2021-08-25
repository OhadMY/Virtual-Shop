import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public requiredMsg: string = 'Field is required.';
  public loginForm: FormGroup;
  public isAuthenticated: boolean = false;
  public isAdminConnected: boolean = false;
  public isUserConnected: boolean = false;
  public userName: string = null;
  public openCart = null;
  public welcomeMessage: string = null;

  constructor(public _fb: FormBuilder, public _data: DataService) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      console.log(jwtData);
      console.log(decodedJwtData);
      this.userName = decodedJwtData.user.firstName;
      this.isAuthenticated = true;
      if (decodedJwtData.user.userType === 0) this.isUserConnected = true;
      else this.isAdminConnected = true;
    } catch (error) {
      this.isAuthenticated = false;
    }
  }
  requiredValidation1(field: string) {
    return this.loginForm.get(field).errors?.required;
  }
}
