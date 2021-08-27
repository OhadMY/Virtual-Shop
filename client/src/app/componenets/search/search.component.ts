import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchFormControl: FormControl;
  constructor(public _data: DataService) {
    this.searchFormControl = new FormControl();
  }

  ngOnInit(): void {}
}
