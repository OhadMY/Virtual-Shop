import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {
  passwordValidator,
  idValidator,
  emailValidator,
} from './custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isAuthenticated: boolean = false;
  public eMailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  public isLinear: boolean = false;
  public registerForm1: FormGroup;
  public registerForm2: FormGroup;
  public requiredMsg: string = 'Field is required.';
  public cities: Array<string> = [
    'Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Rishon LeZion',
    'Petah Tikva',
    'Ashdod',
    'Netanya',
    'Beer Sheva',
    'Nahariya',
    'Holon',
  ];
  public hintColor: string = '#ff0000';

  constructor(
    private formBuilder: FormBuilder,
    public _r: Router,
    public _data: DataService
  ) {
    this.registerForm1 = this.formBuilder.group(
      {
        id: [
          null,
          {
            validators: [
              Validators.required,
              Validators.min(100000000),
              Validators.max(1000000000),
            ],
            asyncValidators: [idValidator],
          },
        ],
        userName: [
          null,
          {
            validators: [
              Validators.required,
              Validators.pattern(this.eMailPattern),
            ],
            asyncValidators: [emailValidator],
          },
        ],
        password: [null, Validators.required],
        passwordConfirm: [null, Validators.required],
      },
      { validator: passwordValidator }
    );

    this.registerForm2 = this.formBuilder.group({
      city: [null, Validators.required],
      street: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
  }

  ngOnInit() {
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.isAuthenticated = true;
    } catch (error) {
      this.isAuthenticated = false;
    }
    if (this.isAuthenticated) this._r.navigate(['/home']);
  }

  requiredValidation1(field: string) {
    return this.registerForm1.get(field).errors?.required;
  }

  requiredValidation2(field: string) {
    return this.registerForm2.get(field).errors?.required;
  }
}
