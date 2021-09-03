import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';
import ProductsModel from 'src/app/models/products.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(
    public _r: Router,
    public _data: DataService,
    public dialog: MatDialog
  ) {}

  public opened: boolean = true;
  public isAuthenticated: boolean = false;
  public isAdminConnected: boolean = false;
  public isUserConnected: boolean = false;
  public openCart: any = null;
  public categories: Array<any> = [];
  public filteredString: string;

  async ngOnInit(): Promise<void> {
    try {
      const jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.isAuthenticated = true;
      if (decodedJwtData.user.userType === 0) this.isUserConnected = true;
      else this.isAdminConnected = true;
      if (this.isUserConnected) {
        this.openCart = await this._data.getUserCart(
          decodedJwtData.user.userId
        );
        this.openCart.cartCreationTime = moment(
          this.openCart.cartCreationTime
        ).format('DD-MM-YYYY');
        await this._data.getTotalPrice(this.openCart.shoppingCartId);
      }
      await this._data.getAllProds();
      this.categories = await this._data.getProdCategories();
    } catch (error) {
      this.isAuthenticated = false;
    }
    if (!this.isAuthenticated) this._r.navigate(['/home']);
  }

  HandleSideBar() {
    this.opened = !this.opened;
  }

  openDialog(prodId: number, shoppingCartId: number) {
    let dialogRef = this.dialog.open(AddModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this._data.addProdToCart(prodId, result, shoppingCartId);
    });
  }

  editProduct(product: ProductsModel) {
    this._data.prodForEdit = product;
    this._data.editMode = true;
  }
}
