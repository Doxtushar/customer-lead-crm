import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudApiService } from './crud-api.service';
import { FollowUp } from '../models/follow-up.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FollowUpService extends CrudApiService<FollowUp> {
  constructor() {
    super(inject(HttpClient), environment.api.followUps);
  }
}
