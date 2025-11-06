import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorityModel } from '../Models/authority.model';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'authority/';
  constructor(private httpClient: HttpClient) { }

 //Get
 GetAuthorityList(id: number): Observable<AuthorityModel[]> {
  return this.httpClient.get<AuthorityModel[]>(this.linkurl+'filter?id='+id, httpOptions);  
  }

  // delete
  DeleteAuthority(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    // this.router.navigateByUrl("/reload");
    }

    // Add 
  AddAuthority(budget: AuthorityModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addAuthority', JSON.stringify(budget), httpOptions)
      .pipe( catchError(this.handleError) );
  }

 //Update
  UpdateAuthority(id: number, model: AuthorityModel): Observable<any> {
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
