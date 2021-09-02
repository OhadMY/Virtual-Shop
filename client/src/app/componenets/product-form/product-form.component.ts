import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { StoreComponent } from '../store/store.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  public productForm: FormGroup;
  public requiredMsg = 'Field is required.';
  public categories: Array<any> = [];

  constructor(
    public _data: DataService,
    private formBuilder: FormBuilder,
    public _store: StoreComponent
  ) {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      category_id: null,
    });
  }

  async ngOnInit(): Promise<void> {
    this.categories = await this._data.getProdCategories();
    console.log(this.categories);
  }
}
