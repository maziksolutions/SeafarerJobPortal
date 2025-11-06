import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CDC } from '../Models/cdc.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'Applicant/';
  constructor(private httpClient: HttpClient) { }
  private crewId = localStorage.getItem('crewId');

  // Add new applicant
  addApplicant(formdata: any): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addApplicant', formdata)
      .pipe(catchError(this.handleError));
  }

  // GetApplicant(id: number): Observable<any> {
  //   alert(id)
  //   return this.httpClient.get<any>(this.linkurl +'GetAllApplicants?id='+id, httpOptions);  
  //   }
  changeapplicantPassword(formdata: any): Observable<any> {debugger
    return this.httpClient.post(this.linkurl + 'updateConfirmPassword', formdata)
      .pipe(catchError(this.handleError));
  }


  DeleteApplicant(id: number) {
    return this.httpClient.delete(this.linkurl+'DeleteApplicant/' + id, httpOptions);
  }

  
    GetAllApplicants(status: number): Observable<any[]> {
      return this.httpClient.get<any[]>(this.linkurl + 'GetAllApplicants?status=' + status , httpOptions);
    }

    ApplicantByid(id):Observable<any>{      
      return  this.httpClient.get<any>(this.linkurl+'ApplicantById/'+id,httpOptions).pipe(catchError(this.handleError));
              }

              GetApplicantbyidd(id: number): Observable<any> {
                return this.httpClient.get<any>(this.linkurl + 'GetAppl/' + id, httpOptions).pipe(catchError(this.handleError));
                }

  // Update
  updateApplicantPersonalInfo(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateApplicantPersonalInfo', formData)
      .pipe(catchError(this.handleError));
  }

  // Update
  updatePhysicalInfo(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateApplicantPhysicalInfo', formData)
      .pipe(catchError(this.handleError));
  }
  
//#region Applicant Address 
addApplicantAddress(applicant: any, applicantId: number): Observable<any> 
{
  return this.httpClient.post(this.linkurl + 'addApplicantAddress?applicantId=' + applicantId, JSON.stringify(applicant), httpOptions)
    .pipe(catchError(this.handleError));
}
  updateApplicantaddress(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateApplicantaddress', formData)
      .pipe(catchError(this.handleError));
  }

getApplicantAddress(id,applicantId): Observable<any> {
  return this.httpClient.get<any>(`${this.linkurl}getApplicantAddress/${id}/${applicantId}`, httpOptions);
}
//#endregion


//#region Applicant Travel

  //Get Passport Data
  GetApplicantTravel(status: number,crewId: any): Observable<any[]> {
    return this.httpClient.get<any>(this.linkurl + 'filterApplicant?status=' + status + '&crewId=' +crewId, httpOptions);
  }

  AddApplicantTravel(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'addApplicantTravel', formData)
      .pipe(catchError(this.handleError));
  }
  
  updateApplicantTravel(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'UpdateApplicantTravel', formData)
      .pipe(catchError(this.handleError));
  }


  DeleteApplicantTravel(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }

//#endregion

//#region  Applicant License

addApplicantLicense(formData: any): Observable<any> {
  return this.httpClient.post(this.linkurl + 'addApplicantLicence', formData)
    .pipe(catchError(this.handleError));
}

GetApplicantLicense(status: number,applicantId: any): Observable<any[]> {
  return this.httpClient.get<any>(this.linkurl + 'filterApplicantLicence?status=' + status + '&applicantid=' +applicantId, httpOptions);
}

updateApplicantLicense(formData: any): Observable<any> {
  return this.httpClient.put(this.linkurl + 'updateApplicantLicense', formData)
    .pipe(catchError(this.handleError));
}


DeleteApplicantLicence(id: number) {
  return this.httpClient.delete(this.linkurl+'DeleteApplicantLicence/' + id, httpOptions);
}

//#endregion



//#region Aplicant Assignments

AddApplicantAssignments(formData: any): Observable<any> {
  return this.httpClient.post(this.linkurl + 'addApplicantAssignments', formData)
    .pipe(catchError(this.handleError));
}

GetApplicantAssignments(status: number,applicantid: any): Observable<any[]> {
  return this.httpClient.get<any>(this.linkurl + 'filterAplicantAssignments?status=' + status + '&applicantid=' +applicantid, httpOptions);
}

updateApplicantAssignments(formData: any): Observable<any> {
  return this.httpClient.put(this.linkurl + 'updateApplicantAssignments', formData)
    .pipe(catchError(this.handleError));
}

DeleteApplicantAssignments(id: number) {
  return this.httpClient.delete(this.linkurl+'DeleteApplicantAssignments/' + id, httpOptions);
}

//#endregion



//#region Applicant Courses

addApplicantCourses(formData: any): Observable<any> {
  return this.httpClient.post(this.linkurl + 'addApplicantCourses', formData)
    .pipe(catchError(this.handleError));
}

GetApplicantCourses(status: number,applicantId: any): Observable<any[]> {
  return this.httpClient.get<any>(this.linkurl + 'filterAplicantCourses?status=' + status + '&applicantid=' +applicantId, httpOptions);
}

updateApplicantCourses(formData: any): Observable<any> {
  return this.httpClient.put(this.linkurl + 'updateApplicantCourses', formData)
    .pipe(catchError(this.handleError));
}

DeleteApplicantCourses(id: number) {
  return this.httpClient.delete(this.linkurl+'DeleteApplicantCourse/' + id, httpOptions);
}

ApproveApplicant(id: number, approvedBy: any) {debugger

  return this.httpClient.post(`${this.linkurl}ApproveApplicant/${id}?approvedBy=${approvedBy}`,{},httpOptions);
  
}
checkUsernameAvailability(username: string): Observable<{ available: boolean; message: string }> {
  // if (!username || username.trim().length < 3) {
  //   return of({ available: false, message: 'Enter at least 3 characters' });
  // }

  return this.httpClient
    .get<{ available: boolean; message: string }>(
      this.linkurl + 'checkUsername?username=' + username
    )
    .pipe(
      catchError(() => of({ available: false, message: 'Error checking username' }))
    );
}





//#endregion


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

    // if (error.error.indexOf('Cannot insert duplicate key row in object') > -1) {
    //   return throwError('**Already exist. Please check & enter unique data.');
    // } else {
    //   return throwError('Some thing went wrong.');
    // }
console.log(error.error.toString())
console.log(error.toString())
    if (error.error.toString().indexOf('InvalidOperationException') > -1) 
    return throwError("Cannot insert duplicate name & DOB. Candidate with same name & date of birth is already there. Please check with administrator.");
    else
    return throwError("Some thing went wrong.Please check with administrator.");
  }

}
