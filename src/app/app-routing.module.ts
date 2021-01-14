import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AppComponent } from './app.component';
import { BestellingenComponent } from './bestellingen/bestellingen.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPaginaComponent } from './login-pagina/login-pagina.component';
import { ProductenComponent } from './producten/producten.component';
import { WinkelwagenComponent } from './winkelwagen/winkelwagen.component';


const appRoutes: Routes = [
    {path: '', component: ContactComponent},
    {path: 'bestelling', component: BestellingenComponent, children: [
        {path: ':id', component: BestellingenComponent},
    ]},
    {path: 'admin', component: AdminPageComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'producten', component: ProductenComponent},
    {path: 'login', component: LoginPaginaComponent},
    {path: 'winkelwagen', component: WinkelwagenComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'page not found!'}},
    { path: '**', redirectTo: '/not-found'}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}