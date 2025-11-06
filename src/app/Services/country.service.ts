import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from '../Models/country.model';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'country/';
  constructor(private httpClient: HttpClient) { }

  // Get countries data
  GetCountryList(id: number): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.linkurl + 'filter?id=' + id, httpOptions);
  }
  // delete Country
  DeleteCountry(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    // this.router.navigateByUrl("/reload");
  }
  // Add Country
  AddCountry(country: Country): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addCountry', JSON.stringify(country), httpOptions)
      .pipe(catchError(this.handleError));
  }
  // update Country
  UpdateCountry(country: Country): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateCountry', country, httpOptions)
      .pipe(catchError(this.handleError));
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
