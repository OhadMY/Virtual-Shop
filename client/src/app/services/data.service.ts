import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import CartItems from '../models/cartitems.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public _r: Router) {}

  public cartItems: CartItems[] = [];
  public totalPrice: number = 0;

  // User Routes
  public async login(eMail: string, userPassword: string) {
    try {
      const res = await fetch('http://localhost:1000/users/login', {
        method: 'POST',
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ eMail, userPassword }),
      });
      const data = await res.json();
      if (res.status == 200) {
        localStorage.token = data.token;
        window.location.href = 'http://localhost:4200/home';
      } else {
        alert('Wrong Credentials');
      }
    } catch (error) {
      console.log(error);
      alert('Wrong Credentials');
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
          authorization: localStorage.token,
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
      const data = await res.json();
      if (res.status == 200 || res.status == 201) {
        alert('Successfully Registered !!');
        this._r.navigateByUrl('/home');
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async logout() {
    try {
      await fetch('http://localhost:1000/users/logout', {
        method: 'POST',
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
      });
      localStorage.clear();
      window.location.href = 'http://localhost:4200/home';
    } catch (error) {
      console.log(error);
    }
  }

  // ShoppingCarts Routes
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

  public async getUserCart(userId: number) {
    try {
      const res = await fetch(
        `http://localhost:1000/shoppingcarts/usercart/${userId}`
      );
      const data = await res.json();
      const test = data[0];
      return test;
    } catch (error) {
      console.log(error);
    }
  }

  public async getTotalPrice(shoppingCartId: number) {
    try {
      const res = await fetch(
        `http://localhost:1000/shoppingcarts/totalprice/${shoppingCartId}`
      );
      const data = await res.json();
      if (data.length === 0) return 0;
      else {
        const total = data[0].Total;
        console.log(total);
        this.totalPrice = total;
        return total;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // New
  public async GetAllCartProducts(cartId: number) {
    try {
      const res = await fetch(
        `http://localhost:1000/shoppingcarts/allcartprods/${cartId}`,
        {
          headers: {
            authorization: localStorage.token,
            'content-type': 'application/json',
          },
        }
      );
      const productslist = await res.json();
      this.cartItems = productslist;
      return productslist;
    } catch (error) {
      console.log(error);
    }
  }
  // New

  public async emptyCart(cartId: number) {
    try {
      await fetch(`http://localhost:1000/shoppingcarts/emptycart/${cartId}`, {
        method: 'DELETE',
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
      });
      this.cartItems = [];
      this.totalPrice = 0;
    } catch (error) {
      console.log(error);
    }
  }

  // Products Routes
  public async getTotalProds() {
    try {
      const res = await fetch('http://localhost:1000/products/totalproducts');
      const prod = await res.json();
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllProds() {
    try {
      const res = await fetch('http://localhost:1000/products', {
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
      });
      const products = await res.json();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  public async getProdCategories() {
    try {
      const res = await fetch('http://localhost:1000/products/prodcategories', {
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
      });
      const categories = await res.json();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  public async getProdCategoryById(prodCategoryId: number) {
    try {
      const res = await fetch(
        `http://localhost:1000/products/prodcategory/${prodCategoryId}`,
        {
          headers: {
            authorization: localStorage.token,
            'content-type': 'application/json',
          },
        }
      );
      const category = await res.json();
      console.log(category);
      return category;
    } catch (error) {
      console.log(error);
    }
  }

  public getCartSum(): number {
    return this.totalPrice;
  }
}
