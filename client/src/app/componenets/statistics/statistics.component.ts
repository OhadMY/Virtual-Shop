import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public numOfProducts: any;
  public numOfOrders: any;

  constructor(public _data: DataService) {}

  ngOnInit(): void {
    this._data.getTotalProds().then((res) => {
      this.numOfProducts = res;
    });
    this._data.getTotalOrders().then((res) => {
      this.numOfOrders = res;
    });
  }
}
