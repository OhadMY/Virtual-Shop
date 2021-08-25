import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(public _data: DataService) {}

  ngOnInit(): void {
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      this.isAuthenticated = true;
    } catch (error) {
      this.isAuthenticated = false;
    }
  }
}
