import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrewAddress } from '../Models/crew-address.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CrewAddressService {

  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'CrewAddress/';
  private corresLinkUrl = this.baseUrl + 'CrewCorrespondenceAddress/';
  constructor(private httpClient: HttpClient) { }
  // Get
  getCrewAddress(id: number,crewid: string): Observable<CrewAddress[]> {
    return this.httpClient.get<CrewAddress[]>(this.linkurl + 'filter?id=' + id + '&crewId=' + crewid, httpOptions);
  }

  CheckEmail(EmailId): Observable<CrewAddress[]> {
    return this.httpClient.get<CrewAddress[]>(this.linkurl + 'CheckEmail?email=' + EmailId, httpOptions);
  }


  CheckApplicantEmail(EmailId): Observable<any> {
    return this.httpClient.get<any>(this.linkurl + 'CheckApplicantEmail?email=' + EmailId, httpOptions);
  }
  getPanamaAddress(id: number, crewId:number): Observable<CrewAddress[]> {
    return this.httpClient.get<CrewAddress[]>(this.linkurl + 'filter?id=' + id + '&crewId=' + crewId, httpOptions);
  }
  // Get
  getCorresAddress(status: number, crewid : string): Observable<CrewAddress[]> {
    return this.httpClient.get<CrewAddress[]>(this.corresLinkUrl + 'getAll?status=' + status + '&crewId=' + crewid, httpOptions);
  }
  // delete
  deleteCrewAddress(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }
  // delete
  deleteCorresAddress(id: number) {
    return this.httpClient.delete(this.corresLinkUrl + id, httpOptions);
  }
  // Add
  addCrewAddress(crew: CrewAddress, crewId: number): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addCrewAddress?crewId=' + crewId, JSON.stringify(crew), httpOptions)
      .pipe(catchError(this.handleError));
  }
  // Add
  addCorresAddress(crew: CrewAddress, crewId: number): Observable<any> {
    return this.httpClient.post(this.corresLinkUrl + 'addCorrespondence?crewId=' + crewId, JSON.stringify(crew), httpOptions)
      .pipe(catchError(this.handleError));
  }
  // Update
  updateCrewAddress(id: number, crew: CrewAddress): Observable<any> {
    const newurl = `${this.linkurl}${id}`;
    return this.httpClient.put(newurl, crew, httpOptions)
      .pipe(catchError(this.handleError));
  }
  // Update
  updateCorresAddress(crew: CrewAddress): Observable<any> {
    return this.httpClient.put(this.corresLinkUrl + 'updateCorrespondence', crew, httpOptions)
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
