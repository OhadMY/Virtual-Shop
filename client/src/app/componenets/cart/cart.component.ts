import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartItems from 'src/app/models/cartitems.model';
import { DataService } from 'src/app/services/data.service';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public openCart: any = null;

  public displayedColumns: string[] = [
    'image',
    'product',
    'quantity',
    'price',
    'total',
    'edit',
  ];

  constructor(
    public _r: Router,
    public _store: StoreComponent,
    public _data: DataService
  ) {}

  async ngOnInit(): Promise<void> {
    const jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    this.openCart = await this._data.getUserCart(decodedJwtData.user.userId);
    await this._data.GetAllCartProducts(this.openCart.shoppingCartId);
  }
}
