import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccineDetailsComponent } from './vaccine-details/vaccine-details.component';

const routes: Routes = [
  { path: 'VaccineDetails', component: VaccineDetailsComponent },
  { path: '',   redirectTo: 'VaccineDetails', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
