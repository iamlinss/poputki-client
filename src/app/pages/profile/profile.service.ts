import {Injectable} from '@angular/core';
import {ApiService} from '../../common/services/api.service';
import {CarData, DriverTripData, EditProfileData, PassengerData, PassengerTripData, ProfileData, TripData} from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  constructor(private apiService: ApiService) {}

  public addCar(userId: string, data: CarData) {
    const url = `/cars/${userId}`;
    return this.apiService.httpPost(url, data);
  }

  public getPrice(cityFrom: string, cityTo: string) {
    const url = `/cars/price?cityFrom=${encodeURIComponent(cityFrom)}&cityTo=${encodeURIComponent(cityTo)}`;
    return this.apiService.httpGet<number>(url);
}

  public addTrip(data: TripData) {
    const url = `/trips/create`;
    return this.apiService.httpPost(url, data);
  }

  public getTripPassengers(tripId: string) {
    const url = `/trips/${tripId}/passengers`;
    return this.apiService.httpGet<PassengerData[]>(url);
  }

  public changePassengerStatus(id: number| undefined, status: string) {
    const url = `/trips/${id}/passenger-status`;
    const params = { status };

    return this.apiService.httpPut(url, null, params );
}

public changeTripStatus(id: number| undefined, status: string) {
  const url = `/trips/${id}/status`;
  const params = { status };

  return this.apiService.httpPut(url, null, params );
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
    return this.apiService.httpGet<PassengerTripData[]>(url);
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
