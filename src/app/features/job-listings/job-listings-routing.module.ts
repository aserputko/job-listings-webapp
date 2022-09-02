import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListingsComponent } from '@features/job-listings/job-listings.component';

const routes: Routes = [
  {
    path: '',
    component: JobListingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobListingsRoutingModule {}
