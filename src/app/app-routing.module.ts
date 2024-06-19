import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusketComponent } from './busket/busket.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'busket', component: BusketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
