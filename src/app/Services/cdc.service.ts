import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CDC } from '../Models/cdc.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CDCService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'CDC/';
  constructor(private httpClient: HttpClient) { }
  private crewId = localStorage.getItem('crewId');

  //Get CDC Data
  getCDCList(status: number,crewid:any): Observable<CDC[]> {
    return this.httpClient.get<CDC[]>(this.linkurl + 'filter?status=' + status + '&crewId=' + crewid, httpOptions);
  }

  checkCDC(cdcNumber: number): Observable<CDC[]> {
    return this.httpClient.get<CDC[]>(this.linkurl + 'checkCDC?cdc=' + cdcNumber , httpOptions);
  }

  checkCDCApplicant(cdcNumber: number): Observable<any> {
    return this.httpClient.get<any>(this.linkurl + 'checkCDCApplicant?cdc=' + cdcNumber , httpOptions);
  }

  //Get CDC Data
  getAllCDC(): Observable<CDC[]> {
    return this.httpClient.get<CDC[]>(this.linkurl + 'getAllCDC', httpOptions);
  }
  // delete CDC Data
  DeleteCDC(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }
  // Add New CDC
  AddCDC(formData: any,crewId:any): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addCDC?crewId=' + crewId, formData, httpOptions)
      .pipe(catchError(this.handleError));
  }
  //Update CDC
  UpdateCDC(id: number, formData: any): Observable<any> {
    const newurl = `${this.linkurl}${id}`;
    return this.httpClient.put(newurl, formData, httpOptions)
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

    return throwError("Some thing went wrong. Please check if record already exist.");
  }
}

