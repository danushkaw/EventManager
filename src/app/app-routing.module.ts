import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

// Components
import {HomeComponent} from './home/home.component';
import {AddeventComponent} from './event/addevent.component';
import {UpdateEventComponent} from './event/update-event.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'newEvent', component: AddeventComponent},
  {path: 'edit/:id', component: UpdateEventComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
