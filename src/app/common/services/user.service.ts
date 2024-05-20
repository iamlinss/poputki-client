import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthorized$?: Observable<boolean> = of(!!localStorage.getItem('token'));
  userId: string | null = null;

  constructor() {}

  updateAuth() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userId = jwtDecode(token!).iss!;
    }

    this.isAuthorized$ = of(!!token);
  }
}
