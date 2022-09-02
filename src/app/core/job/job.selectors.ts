import { filterJobs } from '@core/job/job.entity';
import { jobAdapter, JobState, jobStateName } from '@core/job/job.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectJobState = createFeatureSelector<JobState>(jobStateName);
const { selectEntities, selectAll } = jobAdapter.getSelectors(selectJobState);

export const selectAllJobs = () => createSelector(selectAll, (all) => all);
export const selectJobEntities = () => createSelector(selectEntities, (entities) => entities);
export const selectJobById = (id: string) => createSelector(selectJobEntities(), (entities) => entities[id]);
export const selectJobFilters = () => createSelector(selectJobState, (state) => state.filters);
export const selectFilteredJobs = () =>
  createSelector(selectAllJobs(), selectJobFilters(), (jobs, filters) => filterJobs(jobs, filters));
