import { Injectable } from '@angular/core';
import { fetchJobsFailed, fetchJobsInitialized, fetchJobsSucceeded } from '@core/job/job.actions';
import { Job } from '@core/job/job.entity';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JobDataService } from '@services/job-data.service';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class JobEffects {
  fetchJobsInitialized$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchJobsInitialized),
      concatMap((action) => {
        return this.jobDataService.getJobs().pipe(
          map((jobs: Job[]) => fetchJobsSucceeded({ jobs })),
          catchError((error: Error) => of(fetchJobsFailed({ error: error.message }))),
        );
      }),
    );
  });
  constructor(private readonly actions$: Actions, private readonly jobDataService: JobDataService) {}
}
