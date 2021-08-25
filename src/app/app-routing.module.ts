import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import {ObrazovanjeComponent} from './components/obrazovanje/obrazovanje.component';
import { SektorComponent } from './components/sektor/sektor.component';
import { RadnikComponent } from './components/radnik/radnik.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';

const routes: Routes = [
  {path:'preduzece', component: PreduzeceComponent},
  {path:'obrazovanje', component: ObrazovanjeComponent},
  {path: 'sektor', component: SektorComponent},
  {path: 'radnik', component:RadnikComponent},
  {path: 'home', component:HomeComponent},
  {path:'author', component:AuthorComponent},
  {path:'about', component:AboutComponent},
  {path:'', redirectTo: 'Home', pathMatch:'full'}// ukoliko pogodimo praznu putanju, a nismo dodali pathmatch dobicemo endless petlju 
  //redirekcija ide iz navigacionog bara 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
