import { Component, OnInit } from '@angular/core';
import ProductsModel from 'src/app/models/products.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public displayedColumns: string[] = [
    'image',
    'item',
    'quantity',
    'price',
    'remove',
  ];
  public panelOpenState = false;
  public cartItems: Array<ProductsModel> = [];

  constructor() {}

  ngOnInit(): void {}
}
