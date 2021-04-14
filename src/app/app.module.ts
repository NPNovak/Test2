import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoodsComponent } from './goods/goods.component';
import { GoodsDetailComponent } from './goods/goods-detail/goods-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GoodsSimiliarComponent } from './goods/goods-similiar/goods-similiar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodsDetailComponent,
    GoodsSimiliarComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
