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
  public loginPressed = false;

  constructor(public _fb: FormBuilder, public _data: DataService) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  requiredValidation1(field: string) {
    return this.loginForm.get(field).errors?.required;
  }
}
