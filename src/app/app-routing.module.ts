import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestellingenComponent } from './bestellingen/bestellingen.component';
import { LoginPaginaComponent } from './login-pagina/login-pagina.component';
import { ProductenComponent } from './producten/producten.component';
import { WinkelwagenComponent } from './winkelwagen/winkelwagen.component';


const appRoutes: Routes = [
    {path: 'bestelling', component: BestellingenComponent, children: [
        {path: ':id', component: BestellingenComponent},
    ]},
    {path: 'producten', component: ProductenComponent},
    {path: 'login', component: LoginPaginaComponent},
    {path: 'winkelwagen', component: WinkelwagenComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule ]
})
export class AppRoutingModule{

}