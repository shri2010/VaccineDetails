import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidTestingLabsComponent } from './covid-testing-labs/covid-testing-labs.component';
import { HospitalsIndiaComponent } from './hospitals-india/hospitals-india.component';
import { VaccineDetailsComponent } from './vaccine-details/vaccine-details.component';

const routes: Routes = [
  { path: 'VaccineDetails', component: VaccineDetailsComponent },
  { path: 'HospitalDetails', component: HospitalsIndiaComponent },
  { path: 'CovidTesting', component: CovidTestingLabsComponent },
  { path: '',   redirectTo: 'VaccineDetails', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
