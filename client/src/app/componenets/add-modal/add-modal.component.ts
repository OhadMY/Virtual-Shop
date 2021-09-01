import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
})
export class AddModalComponent implements OnInit {
  quantity: number = 1;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity === 1) return;
    this.quantity--;
  }
}
