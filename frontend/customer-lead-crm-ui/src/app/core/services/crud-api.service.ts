import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CrudApiService<T extends { id?: number }> {
  protected constructor(
    protected readonly http: HttpClient,
    private readonly endpoint: string
  ) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  create(payload: T): Observable<T> {
    return this.http.post<T>(this.endpoint, payload);
  }

  update(id: number, payload: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
