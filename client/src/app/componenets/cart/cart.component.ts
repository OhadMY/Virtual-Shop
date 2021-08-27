import { Component, OnInit } from '@angular/core';

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
  public cartItems: Array<any> = [];

  constructor() {}

  ngOnInit(): void {}
}
