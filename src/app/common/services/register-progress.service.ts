import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  registrationProgress: 'email' | 'info' | 'gender' | 'password' | 'success'| 'role' | null = null;
  addCarProgress: 'registration' | 'brand' | 'model' | 'color' |'maxSeats' | 'success' | null = null;
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
