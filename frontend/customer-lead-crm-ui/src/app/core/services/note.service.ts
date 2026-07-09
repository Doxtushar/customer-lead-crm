import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudApiService } from './crud-api.service';
import { Note } from '../models/note.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NoteService extends CrudApiService<Note> {
  constructor() {
    super(inject(HttpClient), environment.api.notes);
  }
}
