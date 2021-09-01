import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import ProductsModel from 'src/app/models/products.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(public _r: Router, public _data: DataService) {}

  public opened: boolean = true;
  public isAuthenticated: boolean = false;
  public isAdminConnected: boolean = false;
  public isUserConnected: boolean = false;
  public openCart: any = null;
  public openCartTotalPrice: number = null;
  public products: Array<ProductsModel> = [];
  public categories: Array<any> = [];
  public filteredString: string;

  async ngOnInit(): Promise<void> {
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
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
        this.products = await this._data.getAllProds();
        this.categories = await this._data.getProdCategories();
      }
    } catch (error) {
      this.isAuthenticated = false;
    }
    if (!this.isAuthenticated) this._r.navigate(['/home']);
  }

  HandleSideBar() {
    this.opened = !this.opened;
  }
}
