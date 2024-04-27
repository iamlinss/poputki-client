import {Injectable} from '@angular/core';
import {ApiService} from '../../common/api.service';
import {AuthData, RegisterData} from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(private apiService: ApiService) {}

  public login(data: AuthData) {
    const url = '/util/login';
    return this.apiService.httpPost(url, data);
  }

  public register(data: RegisterData) {
    const url = `/util/register`;
    return this.apiService.httpPost(url, data);
  }

  public checkEmail(email: string) {
    const url = `/util/checkEmail?email=${email}`;
    return this.apiService.httpGet(url);
  }
}
