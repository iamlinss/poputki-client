import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {CityData} from '../../pages/profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(private apiService: ApiService) {}

  public getCitiesList() {
    const url = `/data/cities`;
    return this.apiService.httpGet<CityData[]>(url);
  }
}
