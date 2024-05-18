import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = sessionStorage.getItem('token');
  const router = inject(Router);

  return userService.isAuthorized$!.pipe(
    switchMap((res) => {
      if (res) {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }
      return next(req).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 403) {
            sessionStorage.removeItem('token');
            router.navigateByUrl('/login');
          }
          return throwError(() => err);
        }),
      );
    }),
  );
};
