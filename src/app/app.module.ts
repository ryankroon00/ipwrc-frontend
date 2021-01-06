import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPaginaComponent } from './login-pagina/login-pagina.component';
import { BestellingenComponent } from './bestellingen/bestellingen.component';
import { BestellingDetailComponent } from './bestellingen/bestelling-detail/bestelling-detail.component';
import { ProductenComponent } from './producten/producten.component';
import { CommonModule } from '@angular/common';
import { WinkelwagenService } from './shared/winkelwagen.service';
import { WinkelwagenComponent } from './winkelwagen/winkelwagen.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './shared/product/product.service';
import { UserService } from './shared/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ContactComponent } from './contact/contact.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ApiManager } from './shared/api-manager.service';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPaginaComponent,
    BestellingenComponent,
    BestellingDetailComponent,
    ProductenComponent,
    WinkelwagenComponent,
    LoadingSpinnerComponent,
    ContactComponent,
    AlertComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [ProductService, WinkelwagenService, UserService, ApiManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
