import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { rankRegisterModel } from '../Models/rankRegister.model';
import { environment} from '../../environments/environment';
import {map, filter, catchError, mergeMap } from 'rxjs/operators';
const httpOptions={
  headers:new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RankregisterService {
  baseUrl = environment.apiurl;
  
  private linkurl = this.baseUrl + 'RankRegister/';
  constructor(private httpClient : HttpClient) { }

  //Get rank Data
 GetRankList(id: number): Observable<rankRegisterModel[]> {
  return this.httpClient.get<rankRegisterModel[]>(this.linkurl +'filter?id='+id, httpOptions);  
  }
  
   //Get rank Data
 GetRankForUnion(type: string): Observable<rankRegisterModel[]> {
  return this.httpClient.get<rankRegisterModel[]>(this.linkurl +'type?type='+type, httpOptions);  
  }

  // delete rank Data
  DeleteRank(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    }

    // Add New rank
  AddRank(rank: rankRegisterModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addRank', JSON.stringify(rank), httpOptions)
      .pipe( catchError(this.handleError) );
  }

  //Update rank
  UpdateRank(id: number, model: rankRegisterModel): Observable<any> {
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
    
    // if (error.error.indexOf("Cannot insert duplicate key row in object") > -1) {
    //   return throwError("** Rank already exist. Please check & enter unique data.");
    // } else {
    //   return throwError("Some thing went wrong.");
    // }
    return throwError("Some thing went wrong. Please check if record already exist.");
  }
}
