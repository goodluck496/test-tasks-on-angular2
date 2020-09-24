import { CommonModule }            from '@angular/common';
import { HttpClientModule }        from '@angular/common/http';
import { NgModule }                from '@angular/core';
import { ReactiveFormsModule }     from '@angular/forms';
import { MatProgressBarModule }    from '@angular/material/progress-bar';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }          from './app-routing.module';
import { AppComponent }              from './app.component';
import { CurrencyRateModule }        from './modules/currency-rate/currency-rate.module';
import { AnyRateTablePageComponent } from './pages/any-rate-table/any-rate-table.component';
import { CurrencyRatePageComponent } from './pages/currency-rate/currency-rate.component';
import { ShareModule }               from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    AnyRateTablePageComponent,
    CurrencyRatePageComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    CurrencyRateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
