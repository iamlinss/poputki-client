import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject('BACKEND_API_URL') private apiUrl: string
  ) {
  }

  httpGet<T>(url: string, parameters?: HttpParams | { [param: string]: string | string[]; }): Observable<T> {
    return this.responseProceed(this.http.get(this.apiUrl + url, {params: parameters}));
  }

  httpPatch<T>(url: string, parameters?: HttpParams | { [param: string]: string | string[] | any[]; }): Observable<T> {
    return this.responseProceed(this.http.patch(this.apiUrl + url, {params: parameters}));
  }

  httpPatchGroup<T>(url: string, body: any | null = null): Observable<T> {
    return this.responseProceed(this.http.patch(this.apiUrl + url, body));
  }

  httpGetBlob(url: string): Observable<Blob> {
    return this.http.get(this.apiUrl + url, {responseType: 'blob'});
  }

  httpPostBlob(url: string, body: any | null): Observable<Blob> {
    return this.http.post(this.apiUrl + url, body, {responseType: 'blob'});
  }

  httpPost<T>(url: string, body: any | null = null): Observable<T> {
    return this.responseProceed(this.http.post(this.apiUrl + url, body));
  }

  httpPut<T>(url: string, body: any | null = null): Observable<T> {
    return this.responseProceed(this.http.put(this.apiUrl + url, body));
  }

  httpDelete<T>(url: string): Observable<T> {
    return this.responseProceed(this.http.delete(this.apiUrl + url));
  }

  httpDeleteGroup<T>(url: string, body: any | null = null): Observable<T> {
    return this.responseProceed(this.http.delete(this.apiUrl + url, body));
  }

  private responseProceed(response: Observable<any>): Observable<any> {
    return response.pipe(
      map((res: any) => {
        return this.unwrapResponse(res);
      })
    );
  }

  private unwrapResponse(responseBody: any) {
    return responseBody;
  }
}
