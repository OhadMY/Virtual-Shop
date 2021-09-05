import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.css'],
})
export class DownloadModalComponent implements OnInit {
  constructor(public dialog: MatDialog, public _data: DataService) {}

  ngOnInit(): void {}
}
