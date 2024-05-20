import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../services/user.service';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isAuthorized$!.pipe(
    map((isAuthorized) => {
      if (isAuthorized) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    }),
    catchError(() => {
      router.navigateByUrl('/login');
      return of(false);
    }),
  );
};
