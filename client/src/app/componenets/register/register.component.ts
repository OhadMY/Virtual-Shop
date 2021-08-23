import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { passwordValidator } from './custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isLinear: boolean = false;
  public registerForm1: FormGroup;
  public registerForm2: FormGroup;
  public requiredMsg: string = 'Field is required.';
  public cities: Array<string> = [
    'London',
    'Birmingham',
    'Leicester',
    'Southampton',
    'Leeds',
    'Manchester',
    'Liverpool',
  ];
  public hintColor: string = '#ff0000';

  constructor(
    private formBuilder: FormBuilder,
    public _r: Router,
    public _data: DataService
  ) {
    this.registerForm1 = this.formBuilder.group(
      {
        id: [null, [Validators.required, Validators.min(100000000)]],
        userName: [null, [Validators.required, Validators.email]],
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

  ngOnInit() {}

  register() {
    const newUser = {
      userId: this.registerForm1.get('id').value,
      eMail: this.registerForm1.get('userName').value,
      userPassword: this.registerForm1.get('password').value,
      city: this.registerForm2.get('city').value,
      street: this.registerForm2.get('street').value,
      firstName: this.registerForm2.get('firstName').value,
      lastName: this.registerForm2.get('lastName').value,
    };
    console.log(this.registerForm1.get('userName').value);
  }

  requiredValidation1(field: string) {
    return this.registerForm1.get(field).errors?.required;
  }

  requiredValidation2(field: string) {
    return this.registerForm2.get(field).errors?.required;
  }
}
