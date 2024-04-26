import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterProgressService {
  progressState: 'email' | 'info' | 'gender' | 'password' | null = null;
}
