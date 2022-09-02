import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'job-listings',
    loadChildren: () => import('./features/job-listings/job-listings.module').then((m) => m.JobListingsModule),
  },
  {
    path: '**',
    redirectTo: 'job-listings',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
