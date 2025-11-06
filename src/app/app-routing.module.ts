import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { AuthGuardService as Guard } from 'src/app/Services/auth-guard.service';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = 
[
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent}, 
  { path: 'logindata', loadChildren: () => import('./Pages/logindata/logindata.module').then(m => m.LogindataModule) },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 
}
