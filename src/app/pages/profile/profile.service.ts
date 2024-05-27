import {Injectable} from '@angular/core';
import {ApiService} from '../../common/services/api.service';
import {CarData, DriverTripData, EditProfileData, ProfileData, TripData} from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  constructor(private apiService: ApiService) {}

  public addCar(userId: string, data: CarData) {
    const url = `/users/cars/${userId}`;
    return this.apiService.httpPost(url, data);
  }

  public addTrip(data: TripData) {
    const url = `/trips/create`;
    return this.apiService.httpPost(url, data);
  }

  public getUser(userId: string) {
    const url = `/users/${userId}`;
    return this.apiService.httpGet<ProfileData>(url);
  }

  public editProfile(userId: string, data: EditProfileData) {
    const url = `/users/${userId}`;
    return this.apiService.httpPut<ProfileData>(url, data);
  }

  public getUserDriverTrips(userId: string) {
    const url = `/trips/${userId}`;
    return this.apiService.httpGet<DriverTripData[]>(url);
  }

  public getUserPassegerTrips(userId: string) {
    const url = `/trips/brone/${userId}`;
    return this.apiService.httpGet<any>(url);
  }

  public getTripsList(filterData: any) {
    const url = `/trips/filter`;
    return this.apiService.httpPost<DriverTripData[]>(url, filterData);
  }

  public broneTrip(data: any) {
    const url = `/trips/brone`;
    return this.apiService.httpPost<any>(url, data);
  }
}
