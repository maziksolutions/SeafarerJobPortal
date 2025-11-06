import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { stateModel } from '../Models/state.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'state/';
  constructor(private httpClient: HttpClient) { }

  //Get 
  GetStateList(id: number): Observable<stateModel[]> {
    return this.httpClient.get<stateModel[]>(this.linkurl + 'filter?id=' + id, httpOptions);
  }
    //load on demand 
    GetLoadStates(id: number,pageNumber : number): Observable<stateModel[]> {
      return this.httpClient.get<stateModel[]>(this.linkurl + 'loaddata?id=' + id + '&pageNumber=' + pageNumber, httpOptions);
    }
  // filter states by sending(according) countryId
  filterStatesByCountryId(countryId: number): Observable<stateModel[]> {
    return this.httpClient.get<stateModel[]>(this.linkurl + 'getStatesByCountryId?countryId=' + countryId, httpOptions);
  }

  loadStatesByCountryId(countryId: number,status:number): Observable<stateModel[]> {
    return this.httpClient.get<stateModel[]>(this.linkurl + 'getStatesByCountryId?countryId=' + countryId+'&status='+status, httpOptions);
  }
  // delete 
  DeleteState(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }
  // Add 
  AddState(state: stateModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addState', JSON.stringify(state), httpOptions)
      .pipe(catchError(this.handleError));
  }
  // update 
  UpdateState(id: number, model: stateModel): Observable<any> {
    const newurl = `${this.linkurl}${id}`;
    return this.httpClient.put(newurl, model, httpOptions)
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
