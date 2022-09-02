import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  addJobFilterInitialized,
  fetchJobsInitialized,
  removeAllJobFiltersInitialized,
  removeJobFilterInitialized,
} from '@core/job/job.actions';
import { Job } from '@core/job/job.entity';
import { selectFilteredJobs, selectJobFilters } from '@core/job/job.selectors';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface JobsViewModel {
  jobs: Job[];
  filters: string[];
}

export const selectJobsViewModel = () => {
  return createSelector(selectFilteredJobs(), selectJobFilters(), (jobs, filters): JobsViewModel => {
    return { jobs, filters };
  });
};

@Component({
  selector: 'app-job-listings',
  template: `
    <nav class="navbar navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">&nbsp;</span>
      </div>
    </nav>
    <div *ngIf="vm$ | async as vm" class="container">
      <div *ngIf="vm.filters.length !== 0" class="d-flex p-3 mb-4 bg-white border">
        <div class="flew-wrap flex-fill">
          <span
            class="badge bg-secondary fs-6 m-2 cursor-pointer"
            *ngFor="let filter of vm.filters"
            (click)="onRemoveJobFilter(filter)"
            >{{ filter }} <i class="bi bi-x-lg ms-1"></i
          ></span>
        </div>

        <div class="d-flex justify-content-center align-items-start pt-1">
          <button type="button" class="btn btn-link" (click)="onClearAllJobFilters()">Clear</button>
        </div>
      </div>

      <div class="card mb-4" *ngFor="let job of vm.jobs">
        <div class="row g-0">
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <img [src]="job.logo" [alt]="job.company" class="" />
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <h5 class="card-title">
                    <span class="me-4 text-primary">{{ job.company }}</span>
                    <span *ngIf="job.new" class="badge rounded-pill bg-primary me-2 text-uppercase">New!</span>
                    <span *ngIf="job.featured" class="badge rounded-pill bg-dark me-2 text-uppercase">Featured</span>
                  </h5>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 pb-4 pb-md-0">
                  <h4 class="card-text">{{ job.position }}</h4>
                  <p class="card-text text-secondary">{{ job.postedAt }} * {{ job.contract }} * {{ job.location }}</p>
                </div>
                <div class="col-md-6">
                  <div class="flew-wrap">
                    <span class="badge bg-secondary cursor-pointer fs-6 me-2 mb-2" (click)="onAddJobFilter(job.role)">{{
                      job.role
                    }}</span>
                    <span
                      class="badge bg-secondary cursor-pointer fs-6 me-2 mb-2"
                      *ngFor="let language of job.languages"
                      (click)="onAddJobFilter(language)"
                      >{{ language }}</span
                    >
                    <span
                      class="badge bg-secondary cursor-pointer fs-6 me-2 mb-2"
                      *ngFor="let tool of job.tools"
                      (click)="onAddJobFilter(tool)"
                      >{{ tool }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListingsComponent implements OnInit {
  vm$!: Observable<JobsViewModel>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.vm$ = this.store.select(selectJobsViewModel());

    this.store.dispatch(fetchJobsInitialized());
  }

  onAddJobFilter(filter: string) {
    this.store.dispatch(addJobFilterInitialized({ filter }));
  }

  onRemoveJobFilter(filter: string) {
    this.store.dispatch(removeJobFilterInitialized({ filter }));
  }

  onClearAllJobFilters() {
    this.store.dispatch(removeAllJobFiltersInitialized());
  }
}
