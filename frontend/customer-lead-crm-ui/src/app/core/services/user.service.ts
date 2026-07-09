import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudApiService } from './crud-api.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService extends CrudApiService<User> {
  constructor() {
    super(inject(HttpClient), environment.api.users);
  }
}
