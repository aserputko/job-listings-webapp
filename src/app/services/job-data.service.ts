import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '@core/job/job.entity';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobDataService {
  private readonly api = '';

  constructor(private readonly httpClient: HttpClient) {}

  getJobs(): Observable<Job[]> {
    const url = `${this.api}/assets/data.json`;
    return this.httpClient.get<Job[]>(url);
  }
}
