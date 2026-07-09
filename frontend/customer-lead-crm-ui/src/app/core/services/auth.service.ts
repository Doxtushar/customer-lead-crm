import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { CurrentUser, LoginRequest, LoginResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

const SESSION_KEY = 'customer-lead-crm-session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userSubject = new BehaviorSubject<CurrentUser | null>(this.readSession());

  readonly user$ = this.userSubject.asObservable();

  login(credentials: LoginRequest): Observable<CurrentUser> {
    return this.http.get<User[]>(environment.api.users).pipe(
      map((users) => {
        const matchedUser = users.find((user) =>
          user.active !== false &&
          user.username === credentials.username &&
          user.password === credentials.password
        );

        if (!matchedUser) {
          throw new Error('Invalid username or password');
        }

        return this.toCurrentUser(credentials.username, matchedUser);
      }),
      tap((user) => this.saveSession(user))
    );
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return Boolean(this.userSubject.value);
  }

  get token(): string | undefined {
    return this.userSubject.value?.token;
  }

  private toCurrentUser(username: string, response: LoginResponse | User): CurrentUser {
    return {
      username: response.username ?? username,
      name: 'fullName' in response ? response.fullName : response.name ?? response.username ?? username,
      role: response.role,
      token: 'token' in response ? response.token ?? response.accessToken : undefined
    };
  }

  private saveSession(user: CurrentUser): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private readSession(): CurrentUser | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as CurrentUser;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }
}
