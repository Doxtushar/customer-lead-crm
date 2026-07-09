import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { ApiError } from '../models/api.model';
import { environment } from '../../../environments/environment';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const notifications = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && request.url !== environment.api.login && request.url !== environment.api.users) {
        authService.logout();
        router.navigateByUrl('/login');
      }

      const apiError: ApiError = {
        message: readErrorMessage(error),
        status: error.status,
        details: error.error
      };

      notifications.error(apiError.message);
      return throwError(() => apiError);
    })
  );
};

function readErrorMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string') {
    return error.error;
  }

  return error.error?.message ?? error.message ?? 'Something went wrong';
}
