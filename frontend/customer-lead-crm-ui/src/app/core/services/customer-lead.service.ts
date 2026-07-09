import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudApiService } from './crud-api.service';
import { CustomerLead } from '../models/customer-lead.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerLeadService extends CrudApiService<CustomerLead> {
  constructor() {
    super(inject(HttpClient), environment.api.customerLeads);
  }
}
