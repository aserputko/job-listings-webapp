import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobEffects } from '@core/job/job.effects';
import { jobReducer, jobStateName } from '@core/job/job.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(jobStateName, jobReducer), EffectsModule.forFeature([JobEffects])],
})
export class CoreModule {}
