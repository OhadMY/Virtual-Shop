import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AboutComponent } from './componenets/about/about.component';
import { HeaderComponent } from './componenets/header/header.component';
import { HomeComponent } from './componenets/home/home.component';
import { LoginComponent } from './componenets/login/login.component';
import { StatisticsComponent } from './componenets/statistics/statistics.component';
import { RegisterComponent } from './componenets/register/register.component';
import { StoreComponent } from './componenets/store/store.component';
import { CartComponent } from './componenets/cart/cart.component';
import { ProductFormComponent } from './componenets/product-form/product-form.component';
import { AddModalComponent } from './componenets/add-modal/add-modal.component';
import { CheckoutComponent } from './componenets/checkout/checkout.component';
import { ReceiptComponent } from './componenets/receipt/receipt.component';
import { OrderComponent } from './componenets/order/order.component';
import { DownloadModalComponent } from './componenets/download-modal/download-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    StatisticsComponent,
    RegisterComponent,
    StoreComponent,
    CartComponent,
    ProductFormComponent,
    AddModalComponent,
    CheckoutComponent,
    ReceiptComponent,
    OrderComponent,
    DownloadModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTabsModule,
    Ng2SearchPipeModule,
    MatTooltipModule,
    MatTableModule,
    CdkTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
