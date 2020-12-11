import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPaginaComponent } from './login-pagina/login-pagina.component';
import { BestellingenComponent } from './bestellingen/bestellingen.component';
import { BestellingDetailComponent } from './bestellingen/bestelling-detail/bestelling-detail.component';
import { ProductenComponent } from './producten/producten.component';
import { ProductService } from './shared/product.service';
import { CommonModule } from '@angular/common';
import { WinkelwagenService } from './shared/winkelwagen.service';
import { WinkelwagenComponent } from './winkelwagen/winkelwagen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPaginaComponent,
    BestellingenComponent,
    BestellingDetailComponent,
    ProductenComponent,
    WinkelwagenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [ProductService, WinkelwagenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
