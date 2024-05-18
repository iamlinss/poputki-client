import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  registrationProgress: 'email' | 'info' | 'gender' | 'password' | 'success' | null = null;
  addCarProgress: 'registration' | 'brand' | 'model' | 'color' | 'success' | null = null;
  addTripProgress:
    | 'car'
    | 'start'
    | 'finish'
    | 'date'
    | 'time'
    | 'price'
    | 'comment'
    | 'details'
    | 'success'
    | null = null;
}
