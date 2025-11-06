import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { cityModel } from '../Models/city.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'city/';
  constructor(private httpClient: HttpClient) { }

  //Get city Data
  GetCityist(status: number): Observable<cityModel[]> {
    return this.httpClient.get<cityModel[]>(this.linkurl + 'filter?id=' + status, httpOptions);
  }
  //Get city Data
  getCityById(status: number, selectedCountry: number): Observable<cityModel[]> {
    return this.httpClient.get<cityModel[]>(this.linkurl + 'getById?status=' + status + '&countryId=' + selectedCountry, httpOptions);
  }
  // filter cities by sending(according) state Id
  filterCitiesByStateId(stateId: number): Observable<cityModel[]> {
    return this.httpClient.get<cityModel[]>(this.linkurl + 'getCitiesByStates?stateId=' + stateId, httpOptions)
  }
  // delete city Data
  DeleteCity(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }
  // Add New city
  AddCity(city: cityModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addCity', JSON.stringify(city), httpOptions)
      .pipe(catchError(this.handleError));
  }
  // update city
  UpdateCity(id: number, model: cityModel): Observable<any> {
    const newurl = `${this.linkurl}${id}`;
    return this.httpClient.put(newurl, model, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // if (error.error.indexOf("Cannot insert duplicate key row in object") > -1) {
    //   return throwError("**Already exist. Please check & enter unique data.");
    // } else {
    //   return throwError("Some thing went wrong.");
    // }
    return throwError("Some thing went wrong.Please check with administrator.");
  }
}
