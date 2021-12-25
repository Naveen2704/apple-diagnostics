import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './main/footer/footer.component';
import { ProfileComponent } from './main/profile/profile.component';
import { OrdersComponent } from './main/orders/orders.component';
import { CartComponent } from './main/cart/cart.component';
import { TestsComponent } from './main/tests/tests.component';
import { PackagesComponent } from './main/packages/packages.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceOrderComponent } from './main/place-order/place-order.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    OrdersComponent,
    CartComponent,
    TestsComponent,
    PackagesComponent,
    PlaceOrderComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
