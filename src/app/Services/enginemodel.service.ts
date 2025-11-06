import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { engineModel,eCDIS} from '../Models/engineModel.model';
import {environment} from '../../environments/environment';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EnginemodelService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'enginemodel/';
  private eCDISurl = this.baseUrl + 'ecdis/';
  constructor(private httpClient : HttpClient) { }

   //Get engine Data
 GetEngineModelList(id: number): Observable<engineModel[]> {
  return this.httpClient.get<engineModel[]>(this.linkurl+'filter?id='+id, httpOptions);  
  }

  // delete engine Data
  DeleteEngineModel(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    }

    // Add New engine
  AddEngineModel(engine: engineModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addEngineModel', JSON.stringify(engine), httpOptions)
      .pipe( catchError(this.handleError) );
  }

  //Update engine
  UpdateEngineModel(id: number, model: engineModel): Observable<any> {
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

//#region ECIS
//Get engine Data
GetECDISList(id: number): Observable<eCDIS[]> {
  return this.httpClient.get<eCDIS[]>(this.eCDISurl+'filter?id='+id, httpOptions);  
  }

  // delete engine Data
  DeleteECDIS(id: number) {
    return this.httpClient.delete(this.eCDISurl + id, httpOptions);
    }

    // Add New engine
  AddECDIS(engine: eCDIS): Observable<any> {
    return this.httpClient.post(this.eCDISurl + 'addECDIS', JSON.stringify(engine), httpOptions)
      .pipe( catchError(this.handleError) );
  }

  //Update engine
  UpdateECDIS(id: number, model: eCDIS): Observable<any> {
    const newurl = `${this.eCDISurl}${id}`;
    return this.httpClient.put(newurl, model, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

//#endregion


//Get engine Data
GetEngineMakerList(id: number): Observable<engineModel[]> {
  return this.httpClient.get<engineModel[]>(this.linkurl+'filterEngine?id='+id, httpOptions);  
  }

  // delete engine Data
  DeleteEngineMaker(id: number) {
    return this.httpClient.delete(this.linkurl + 'deleteEngineMaker?id=' + id, httpOptions);
    }

    // Add New engine
  AddEngineMaker(engine: any): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addEngineMaker', JSON.stringify(engine), httpOptions)
      .pipe( catchError(this.handleError) );
  }

  //Update engine
  UpdateEngineMaker(model: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateEngineMaker', model, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



}
