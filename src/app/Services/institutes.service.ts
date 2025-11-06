import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstitutesModel} from '../Models/institutes.model';
import {environment} from '../../environments/environment';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InstitutesService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'institutes/';
  constructor(private httpClient : HttpClient) { }

  //Get
 GetInstitutesList(id: number): Observable<InstitutesModel[]> {
  return this.httpClient.get<InstitutesModel[]>(this.linkurl+'filter?id='+id, httpOptions);  
  }

  // delete 
  DeleteInstitute(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    }

    // Add 
  AddInstitute(institute: InstitutesModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addInstitute', JSON.stringify(institute), httpOptions)
      .pipe( catchError(this.handleError) );
  }

  //Update
  UpdateInstitute(id: number, model: InstitutesModel): Observable<any> {
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
