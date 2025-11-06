import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccessRights } from '../Models/access-rights.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApplyAccessRightsService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'AccessRights/';
  //private userId = localStorage.getItem('userid');
  constructor(private httpClient: HttpClient) { }

  //Get 
  applyAccessRights(url: string): Observable<AccessRights[]> {   
    return this.httpClient.get<AccessRights[]>(this.linkurl + 'checkAccessRights?userId=' + localStorage.getItem('userid') + '&url=' + url, httpOptions);
  }

/*** Access rights to hide menus Start */

applyViewAccessRights(url: string): Observable<AccessRights[]> {     
  return this.httpClient.get<AccessRights[]>(this.linkurl + 'checkViewRights?userId=' + localStorage.getItem('userid') + '&url=' + url, httpOptions);
}

/** Close */

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
