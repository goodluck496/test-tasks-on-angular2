import { NgModule }              from '@angular/core';
import { Routes, RouterModule }      from '@angular/router';
import { AnyRateTablePageComponent } from './pages/any-rate-table/any-rate-table.component';
import { CurrencyRatePageComponent } from './pages/currency-rate/currency-rate.component';

const routes: Routes = [
  {path: 'any-rate-table', component: AnyRateTablePageComponent},
  {path: 'currency-rate', component: CurrencyRatePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
