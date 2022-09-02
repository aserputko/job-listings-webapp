import { Job } from '@core/job/job.entity';
import { createAction, props } from '@ngrx/store';

const prefix = '[Job]';

/** Fetch Jobs **/
export const fetchJobsInitialized = createAction(`${prefix} Fetch Jobs Initialized`);
export const fetchJobsSucceeded = createAction(`${prefix} Fetch Jobs Succeeded`, props<{ jobs: Job[] }>());
export const fetchJobsFailed = createAction(`${prefix} Fetch Jobs Failed`, props<{ error: string }>());

/** Add Job Filter **/
export const addJobFilterInitialized = createAction(
  `${prefix} Add Job Filter Initialized`,
  props<{ filter: string }>(),
);

/** Remove Job Filter **/
export const removeJobFilterInitialized = createAction(
  `${prefix} Remove Job Filter Initialized`,
  props<{ filter: string }>(),
);
export const removeAllJobFiltersInitialized = createAction(`${prefix} Remove All Job Filters Initialized`);
