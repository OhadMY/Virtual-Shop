import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public isAuthenticatedUser: boolean = false;

  constructor(public _r: Router, public _data: DataService) {}

  async ngOnInit(): Promise<void> {
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (
        decodedJwtData.user.userType === 0 &&
        this._data.cartItems.length !== 0
      )
        this.isAuthenticatedUser = true;
    } catch (error) {
      this.isAuthenticatedUser = false;
    }
    if (!this.isAuthenticatedUser) this._r.navigate(['/home']);
  }
}
