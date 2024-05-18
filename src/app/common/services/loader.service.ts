import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.setLoading(false);
  }

  setLoading(status: boolean) {
    this.isLoading_.next(status);
  }

  get isLoading$() {
    return this.isLoading_.asObservable();
  }
}
