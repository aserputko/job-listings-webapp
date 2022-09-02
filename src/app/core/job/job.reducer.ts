import {
  addJobFilterInitialized,
  fetchJobsSucceeded,
  removeAllJobFiltersInitialized,
  removeJobFilterInitialized,
} from '@core/job/job.actions';
import { addJobFilter, Job, removeJobFilter } from '@core/job/job.entity';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const jobStateName = 'job';
export interface JobState extends EntityState<Job> {
  filters: string[];
}
export const jobAdapter = createEntityAdapter<Job>({});
export const jobInitialState: JobState = jobAdapter.getInitialState({
  filters: [],
});

export const jobReducer = createReducer(
  jobInitialState,
  on(fetchJobsSucceeded, (state, action) => {
    return jobAdapter.setAll(action.jobs, state);
  }),
  on(addJobFilterInitialized, (state, action) => {
    const filters = addJobFilter(action.filter, state.filters);
    return { ...state, filters };
  }),
  on(removeJobFilterInitialized, (state, action) => {
    const filters = removeJobFilter(action.filter, state.filters);
    return { ...state, filters };
  }),
  on(removeAllJobFiltersInitialized, (state, action) => {
    return { ...state, filters: [] };
  }),
);
