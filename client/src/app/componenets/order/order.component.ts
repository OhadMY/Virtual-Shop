import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import UsersModel from 'src/app/models/users.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public connectedUser: UsersModel | null;
  public orderForm: FormGroup;
  public requiredMsg: string = 'Field is required.';
  public minDate: Date;
  public unavailableDates = [];
  public deliveryCities: Array<string> = [
    'Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Rishon LeZion',
    'Petah Tikva',
    'Ashdod',
    'Netanya',
    'Beer Sheva',
    'Nahariya',
    'Holon',
  ];

  constructor(private formBuilder: FormBuilder, public _data: DataService) {
    this.orderForm = this.formBuilder.group({
      deliveryCity: [null, Validators.required],
      deliveryStreet: [null, Validators.required],
      deliveryDate: [null, Validators.required],
      creditCard: [
        null,
        [
          Validators.required,
          Validators.min(10000000000000),
          Validators.max(9999999999999999),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    this.connectedUser = decodedJwtData.user;
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  requiredValidation(field: string) {
    return this.orderForm.get(field).errors?.required;
  }

  setUserStreet() {
    this.orderForm.patchValue({
      deliveryStreet: this.connectedUser.street,
    });
  }

  setUserCity() {
    this.orderForm.patchValue({
      deliveryCity: this.connectedUser.city,
    });
  }

  get creditCard() {
    return this.orderForm.get('creditCard').value;
  }

  myFilter = (d: Date | null): boolean => {
    const time = moment(d).format('YYYY-MM-DD');
    if (!this.unavailableDates) return true;
    return !this.unavailableDates.find((date) => {
      return moment(date._id.deliveryDate).format('YYYY-MM-DD') === time;
    });
  };
}
