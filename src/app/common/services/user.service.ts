import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {BehaviorSubject, Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthorized$?: Observable<boolean> = of(!!localStorage.getItem('token'));
  userId: string | null = null;
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor() {
    const role = localStorage.getItem('role');
    this.roleSubject.next(role);
  }

  updateAuth() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userId = jwtDecode(token!).iss!;
    }

    const role = localStorage.getItem('role');
    this.roleSubject.next(role);
    this.isAuthorized$ = of(!!token);
  }
}
