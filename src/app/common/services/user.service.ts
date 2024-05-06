import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthorized$?: Observable<boolean> = of(false);

  constructor() {}

  updateAuth() {
    this.isAuthorized$ = of(!!sessionStorage.getItem('token'));
  }
}
