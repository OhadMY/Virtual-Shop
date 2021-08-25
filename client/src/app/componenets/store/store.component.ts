import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(public _r: Router, public _data: DataService) {}
  public isToken: boolean;

  ngOnInit(): void {
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      // let decodedJwtData = JSON.parse(decodedJwtJsonData);
      // console.log(jwtData);
      // console.log(decodedJwtJsonData);
      // console.log(decodedJwtData);
      this.isToken = true;
    } catch (error) {
      this.isToken = false;
    }
    console.log(this.isToken);
    if (!this.isToken) this._r.navigate(['/home']);
  }
}
