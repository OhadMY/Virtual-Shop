import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import UsersModel from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public connectedUser: UsersModel;
  public isAdmin = null;
  public isConnected: boolean = false;

  constructor(public _r: Router) {}

  public async getTotalProds() {
    try {
      const res = await fetch('http://localhost:1000/products/totalproducts');
      const prod = await res.json();
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  public async getTotalOrders() {
    try {
      const res = await fetch(
        'http://localhost:1000/shoppingcarts/totalorders'
      );
      const order = await res.json();
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  public async login(eMail: string, userPassword: string) {
    try {
      const res = await fetch('http://localhost:1000/users/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ eMail, userPassword }),
      });
      // console.log(res);
      const data = await res.json();
      // console.log(data);

      if (res.status == 200) {
        localStorage.token = data.token;
        this.connectedUser = data.user;
        if (this.connectedUser.userType === 1) this.isAdmin = false;
        else this.isAdmin = true;
        this.isConnected = true;
        window.location.href = 'http://localhost:4200/home';
      } else {
        console.log(JSON.stringify(data));
        alert('Wrong Credentials');
      }
    } catch (error) {
      console.log(error);
      alert('Wrong Credentials');
    }
  }

  public async logout() {
    try {
      await fetch('http://localhost:1000/users/logout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
      localStorage.clear();
      this.isConnected = false;
      window.location.href = 'http://localhost:4200/home';
    } catch (error) {
      console.log(error);
    }
  }

  public async register(
    eMail: string,
    userPassword: string,
    userId: number,
    city: string,
    street: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const res = await fetch('http://localhost:1000/users/register', {
        method: 'POST',
        headers: {
          //   authorization: localStorage.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          eMail,
          userPassword,
          userId,
          city,
          street,
          firstName,
          lastName,
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status == 200 || res.status == 201) {
        alert('Successfully Registered !!');
        this._r.navigateByUrl('/home');
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.log('herte');
      console.log(error);
    }
  }
}
