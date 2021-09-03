import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  public openCart: any = null;
  public openCartTotalPrice: number = null;
  public displayedColumns: string[] = [
    'image',
    'product',
    'quantity',
    'price',
    'total',
  ];

  constructor(public _data: DataService) {}

  async ngOnInit(): Promise<void> {
    const jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    this.openCart = await this._data.getUserCart(decodedJwtData.user.userId);
    await this._data.GetAllCartProducts(this.openCart.shoppingCartId);
    this.openCartTotalPrice = await this._data.getTotalPrice(
      this.openCart.shoppingCartId
    );
  }
}
