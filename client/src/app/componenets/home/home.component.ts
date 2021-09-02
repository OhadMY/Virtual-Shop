import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public colspan = 1;
  constructor() {}

  ngOnInit(): void {
    // if (window.innerWidth < 1000) {
    //   this.colspan = 3;
    // }
  }
}
