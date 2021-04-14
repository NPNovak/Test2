import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GoodsComponent} from './goods/goods.component';

const routes: Routes = [
  { path: 'goods', component: GoodsComponent },
  { path: '',   redirectTo: 'goods', pathMatch: 'full' },
  { path: '**', component: GoodsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
