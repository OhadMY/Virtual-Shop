import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';

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
  public openCart: any = null;
  public openCartTotalPrice: number = null;

  constructor(public _fb: FormBuilder, public _data: DataService) {}

  async ngOnInit(): Promise<void> {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      // console.log(jwtData);
      // console.log(decodedJwtData);
      this.userName = decodedJwtData.user.firstName;
      this.isAuthenticated = true;
      if (decodedJwtData.user.userType === 0) this.isUserConnected = true;
      else this.isAdminConnected = true;
      if (this.isAuthenticated) {
        this.openCart = await this._data.getUserCart(
          decodedJwtData.user.userId
        );
        this.openCart.cartCreationTime = moment(
          this.openCart.cartCreationTime
        ).format('DD-MM-YYYY');
        this.openCartTotalPrice = await this._data.getTotalPrice(
          this.openCart.shoppingCartId
        );
      }
    } catch (error) {
      this.isAuthenticated = false;
    }
  }
  requiredValidation1(field: string) {
    return this.loginForm.get(field).errors?.required;
  }
}
