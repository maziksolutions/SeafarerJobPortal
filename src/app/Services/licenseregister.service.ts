import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { licenseRegisterModel } from '../Models/licenseRegister.model';
import { environment } from '../../environments/environment';
import { rankRegisterModel } from '../Models/rankRegister.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class licenseregisterService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'LicenceRegister/';
  constructor(private httpClient: HttpClient) { }

  //
  GetFilterLicenceRegisterList(id: number): Observable<licenseRegisterModel[]> {
    return this.httpClient.get<licenseRegisterModel[]>(this.linkurl + 'Getfilter?id=' + id, httpOptions);
  }
  //Get Rank List
  GetRankregisterList(): Observable<rankRegisterModel[]> {
    return this.httpClient.get<rankRegisterModel[]>(this.linkurl + 'filter?id=0', httpOptions);
  }

  GetLicenseByRank(rankid: number): Observable<licenseRegisterModel[]> {
    rankid
    return this.httpClient.get<licenseRegisterModel[]>(this.linkurl + 'licensebyrank?rankid=' + rankid, httpOptions);
  }

  //Get license Data
  GetlicenseRegisterList(id: number): Observable<licenseRegisterModel[]> {
    return this.httpClient.get<licenseRegisterModel[]>(this.linkurl + 'filter?id=' + id, httpOptions);
  }

    //Get license Data
    GetlicenseGetById(id: number): Observable<licenseRegisterModel[]> {
      return this.httpClient.get<licenseRegisterModel[]>(this.linkurl + 'GetById?id=' + id, httpOptions);
    }
  
  // delete license Data
  Deletelicense(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }

  // Add New license
  Addlicense(form: licenseRegisterModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addLicence', JSON.stringify(form), httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Update license
  Updatelicense(model: licenseRegisterModel): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateLicence', model, httpOptions)
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

