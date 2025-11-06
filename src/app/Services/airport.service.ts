import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AirportModel } from '../Models/airport.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'airport/';
  constructor(private httpClient: HttpClient) { }

  //Get airport data
  GetAirportList(id: number): Observable<AirportModel[]> {
    return this.httpClient.get<AirportModel[]>(this.linkurl + 'filter?id=' + id, httpOptions);
  }
  // delete airport Data
  DeleteAirport(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }
  // Add New airport
  AddAirport(airport: AirportModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addAirport', JSON.stringify(airport), httpOptions)
      .pipe(catchError(this.handleError));
  }
  // update airport
  UpdateAirport(id: number, model: AirportModel): Observable<any> {
    const newurl = `${this.linkurl}${id}`;
    return this.httpClient.put(newurl, model, httpOptions)
      .pipe(catchError(this.handleError));
  }
  // filter airport 
  filterAirportsByCityId(cityId: number) {
    return this.httpClient.get<AirportModel[]>(this.linkurl + 'getAirportsByCityId?cityId=' + cityId, httpOptions);
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

    return throwError("Some thing went wrong. Please check if record already exist.");
  }

}
