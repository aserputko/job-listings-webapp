import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobListingsRoutingModule } from '@features/job-listings/job-listings-routing.module';
import { JobListingsComponent } from '@features/job-listings/job-listings.component';

@NgModule({
  declarations: [JobListingsComponent],
  imports: [CommonModule, JobListingsRoutingModule, FormsModule],
})
export class JobListingsModule {}
