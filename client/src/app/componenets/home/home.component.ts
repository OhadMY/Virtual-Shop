import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public _r: Router, public _data: DataService) {}

  ngOnInit(): void {
    console.log('test');
    console.log('data ' + this._data.isConnected);
    let isToken = false;
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      // console.log(jwtData);
      // console.log(decodedJwtJsonData);
      // console.log(decodedJwtData);
      isToken = true;
    } catch (error) {
      isToken = false;
    }
    if (!isToken) this._r.navigate(['/login']);
  }
}
