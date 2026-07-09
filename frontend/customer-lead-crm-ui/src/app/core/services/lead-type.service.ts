import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudApiService } from './crud-api.service';
import { LeadType } from '../models/lead-type.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeadTypeService extends CrudApiService<LeadType> {
  constructor() {
    super(inject(HttpClient), environment.api.leadTypes);
  }
}
