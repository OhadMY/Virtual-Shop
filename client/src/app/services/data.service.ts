import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import CartItems from '../models/cartitems.model';
import ProductsModel from 'src/app/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public _r: Router) {}

  public products: Array<ProductsModel> = [];
  public cartItems: CartItems[] = [];
  public totalPrice: number = 0;
  public cartId: number;
  public editMode: boolean = false;
  public prodForEdit: ProductsModel;

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
  public async getUserCart(userId: number) {
    try {
      const res = await fetch(
        `http://localhost:1000/shoppingcarts/usercart/${userId}`
      );
      const data = await res.json();
      const cart = data[0];
      this.cartId = cart.shoppingCartId;
      return cart;
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
      let total;
      if (data.length === 0) {
        this.totalPrice = 0;
        total = 0;
        return total;
      } else {
        total = data[0].Total;
        this.totalPrice = total;
        return total;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public getCartSum(): number {
    return this.totalPrice;
  }

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

  public async addProdToCart(prodId: number, quantity: number, cartId: number) {
    try {
      let exists = false;
      let prodInCartId;
      for (let cart of this.cartItems)
        if (cart.prodId === prodId) {
          prodInCartId = cart.prodInCartId;
          exists = true;
        }
      if (!exists) {
        await fetch(
          `http://localhost:1000/shoppingcarts/addproduct/${prodId}`,
          {
            method: 'POST',
            headers: {
              authorization: localStorage.token,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              cartId,
              quantity,
            }),
          }
        );
      } else {
        await fetch(
          `http://localhost:1000/shoppingcarts/addquantity/${prodInCartId}`,
          {
            method: 'PUT',
            headers: {
              authorization: localStorage.token,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              quantity,
            }),
          }
        );
      }
      await this.GetAllCartProducts(this.cartId);
      await this.getTotalPrice(this.cartId);
    } catch (error) {
      console.log(error);
    }
  }

  public async addOneProdQuantity(prodInCartId: number) {
    try {
      await fetch(
        `http://localhost:1000/shoppingcarts/addoneprod/${prodInCartId}`,
        {
          method: 'PUT',
          headers: {
            authorization: localStorage.token,
            'content-type': 'application/json',
          },
        }
      );
      await this.GetAllCartProducts(this.cartId);
      await this.getTotalPrice(this.cartId);
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteProduct(prodInCartId: number) {
    try {
      await fetch(
        `http://localhost:1000/shoppingcarts/deleteproduct/${prodInCartId}`,
        {
          method: 'DELETE',
          headers: {
            authorization: localStorage.token,
            'content-type': 'application/json',
          },
        }
      );
      await this.GetAllCartProducts(this.cartId);
      await this.getTotalPrice(this.cartId);
    } catch (error) {
      console.log(error);
    }
  }

  public async removeOneProdQuantity(prodInCartId: number, quantity: number) {
    try {
      await fetch(
        `http://localhost:1000/shoppingcarts/removeoneprod/${prodInCartId}`,
        {
          method: 'PUT',
          headers: {
            authorization: localStorage.token,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            quantity,
          }),
        }
      );
      await this.GetAllCartProducts(this.cartId);
      await this.getTotalPrice(this.cartId);
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
      this.products = products;
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

  public async createNewProduct(
    prodName: number,
    prodPrice: number,
    prodImage: string,
    categoryId: number
  ) {
    try {
      await fetch(`http://localhost:1000/products/newproduct`, {
        method: 'POST',
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          prodName,
          prodPrice,
          prodImage,
          categoryId,
        }),
      });
      await this.getAllProds();
    } catch (error) {
      console.log(error);
    }
  }

  public async editProduct(
    prodId: number,
    prodName: number,
    prodPrice: number,
    prodImage: string,
    categoryId: number
  ) {
    try {
      await fetch(`http://localhost:1000/products/editproduct/${prodId}`, {
        method: 'PUT',
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          prodName,
          prodPrice,
          prodImage,
          categoryId,
        }),
      });
      await this.getAllProds();
    } catch (error) {
      console.log(error);
    }
  }

  public async closeCart(shoppingCartId: number) {
    try {
      await fetch(
        `http://localhost:1000/shoppingcarts/closecart/${shoppingCartId}`,
        {
          method: 'PUT',
          headers: {
            authorization: localStorage.token,
            'content-type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Orders Routes
  public async getTotalOrders() {
    try {
      const res = await fetch('http://localhost:1000/orders/totalorders');
      const order = await res.json();
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  public async createNewOrder(
    userId: number,
    cartId: number,
    totalPrice: number,
    deliveryCity: string,
    deliveryStreet: string,
    deliveryDate: string,
    creditCard: number
  ) {
    try {
      await fetch(`http://localhost:1000/orders/neworder`, {
        method: 'POST',
        headers: {
          authorization: localStorage.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          cartId,
          totalPrice,
          deliveryCity,
          deliveryStreet,
          deliveryDate,
          creditCard,
        }),
      });
      await this.getAllProds();
    } catch (error) {
      console.log(error);
    }
  }
}
