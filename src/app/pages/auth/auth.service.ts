import {Injectable} from '@angular/core';
import {ApiService} from '../../common/api.service';
import {AuthData} from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(private apiService: ApiService) {}

  public login(data: AuthData) {
    const url = '/util/login';
    return this.apiService.httpPost(url, data);
  }

  public checkEmail(email: string) {
    const url = `/util/checkEmail?email=${email}`;
    return this.apiService.httpGet(url);
  }

  public register() {
    const data = {
      id: 0,
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      password: 'string',
      cars: [
        {
          id: 0,
          brand: 'string',
          model: 'string',
          color: 'string',
          year: 0,
          plateNumber: 'string',
        },
      ],
    };
    const url = `/util/register`;
    return this.apiService.httpPost(url, data);
  }
}
