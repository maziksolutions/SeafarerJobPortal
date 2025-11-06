import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { managerModel} from '../Models/manager.model';
import {environment} from '../../environments/environment';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'manager/';
  constructor(private httpClient : HttpClient) { }

   //Get manager Data
 GetManagerList(id: number): Observable<managerModel[]> {
  return this.httpClient.get<managerModel[]>(this.linkurl+'filter?id='+id, httpOptions);  
  }

  // delete manager Data
  DeleteManager(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    }

    // Add New manager
  AddManager(manager: managerModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addManager', JSON.stringify(manager), httpOptions)
      .pipe( catchError(this.handleError) );
  }

  //Update manager
  UpdateManager(id: number, model: managerModel): Observable<any> {
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

  //#region   
  //Update manager
  managerNameChange(id: number, model: any): Observable<any> {
   
    return this.httpClient.post(this.linkurl + 'managerNameChange?managerId='+id, model, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  } 

   //Update manager
   reverseNameChange(id: number): Observable<any> {   
    return this.httpClient.post(this.linkurl + 'reverseNameChange?id='+id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  } 

  //Get manager Data
  GetManagerLog(id: number): Observable<any[]> {
  return this.httpClient.get<any[]>(this.linkurl+'GetManagerLog?id='+id, httpOptions);  
  }
  //#endregion
}
