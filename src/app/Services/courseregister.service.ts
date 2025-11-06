import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { courseRegisterModel } from '../Models/courseRegister.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseregisterService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'courseregister/';
  constructor(private httpClient: HttpClient) { }

  //Get course Data
  GetCourseRegisterList(id: number): Observable<courseRegisterModel[]> {
    return this.httpClient.get<courseRegisterModel[]>(this.linkurl + 'filter?id=' + id, httpOptions);
  }

  GetFilterCourseRegisterList(id: number): Observable<courseRegisterModel[]> {
    return this.httpClient.get<courseRegisterModel[]>(this.linkurl + 'Getfilter?id=' + id, httpOptions);
  }
  GetCourseById(id: number): Observable<courseRegisterModel[]> {
    return this.httpClient.get<courseRegisterModel[]>(this.linkurl + 'GetById?id=' + id, httpOptions);
  }
  // delete course Data
  DeleteCourse(id: number) {
    return this.httpClient.delete(this.linkurl+'deleteCourse?id='+id, httpOptions);
  }

  // Add New course
  AddCourse(course: courseRegisterModel): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addCourse', JSON.stringify(course), httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Update course
  UpdateCourse(id: number, model: courseRegisterModel): Observable<any> {
    // const newurl = `${this.linkurl+ 'updateCourse'}${id}`;
    return this.httpClient.put(this.linkurl+'updateCourse?id='+id, model, httpOptions)
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


  //#region   Course Cost

  //Get course Data
  GetCourseCosts(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.linkurl + 'CourseCost?id=' + id, httpOptions);
  }

    //Get course Data
    GetCourseCostbyCourse(courseId: number): Observable<any[]> {
      return this.httpClient.get<any[]>(this.linkurl + 'CourseCostByCourseId?courseId=' + courseId, httpOptions);
    }

  GetCourseCostById(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.linkurl + 'CourseCostByID?id=' + id, httpOptions);
  }
  // delete course Data
  DeleteCourseCost(id: number) {
    return this.httpClient.delete(this.linkurl + 'deleteCourseCost?id=' + id, httpOptions);
  }

  // delete course Data
  changeStatus(id: number): Observable<any> {
    return this.httpClient.put(this.linkurl + 'changeStatus?id=' + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );;
  }

  // Add New course
  AddCourseCost(course: any): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addCourseCost', JSON.stringify(course), httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Update course
  UpdateCourseCost(model: any): Observable<any> {
    const newurl = `${this.linkurl + 'updateCourseCost'}`;
    return this.httpClient.put(newurl, model, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //#endregion
}
