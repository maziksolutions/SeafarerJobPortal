import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { shipTypeModel,VesselChange } from '../Models/shipType.model';
import {environment} from '../../environments/environment';
// import { NumberFormat } from 'xlsx/types';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};
const httpOps={
  headers:new HttpHeaders({
    //  Responsety : Text
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShiptypeService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'shiptype/';
  constructor(private httpClient : HttpClient) { }

 //Get ship Data
 GetShipTypeData(id: number): Observable<shipTypeModel[]> {
  return this.httpClient.get<shipTypeModel[]>(this.linkurl+'filter?id='+id, httpOptions);  
  }

   // delete ship Data
   DeleteShipType(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
    // this.router.navigateByUrl("/reload");
    }

    // Add New ship
  AddShipType(ship: shipTypeModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addShipType', JSON.stringify(ship), httpOptions)
      .pipe(catchError(this.handleError) );
  }

  UpdateShipType(id: number, model: shipTypeModel): Observable<any> {
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


  //#region Vessel CHnage Activity

   //Get ship Data
 GetVesselChangeData(): Observable<VesselChange[]> {
  return this.httpClient.get<VesselChange[]>(this.linkurl+'getAllVesselChange', httpOptions);  
  }

  // Add New ship chaneg activity
  vesselchangeactivity(ship: VesselChange): Observable<any> {
    
    return this.httpClient.post(this.linkurl + 'vesselchangeactivity', JSON.stringify(ship), httpOptions)
      .pipe(catchError(this.handleError) );
  }
  // Add New ship chaneg activity
  Updatevesselchangeactivity(ship: VesselChange): Observable<any> {
    
    return this.httpClient.put(this.linkurl + 'updatevesselchangeactivity', JSON.stringify(ship), httpOptions)
      .pipe(catchError(this.handleError) );
  }

  //reverse vessel change activity
  ReverseVesselChange(vesselId:number,OldVesselId:any): Observable<string> {
    var headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.get<any>(this.linkurl+'ReverseVesselChange?vesselId='+vesselId+'&OldVesselId='+OldVesselId, { headers, responseType: 'text' as 'json' });  
    } 

  //#endregion
}
