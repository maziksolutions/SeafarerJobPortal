import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User, PrincipalListTree,signAuthority } from '../Models/user';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AnyAaaaRecord } from 'dns';

const token = localStorage.getItem("userToken");

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'bearer ' + token
    // 'Content-Type': "application/json"
  })
};
const httpnewOptions = {
  headers: new HttpHeaders({
    Authorization: 'bearer ' + token
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiurl;
  private linkurl = this.baseUrl + 'Users/';
  private treeurl = this.baseUrl + 'vessel/';
  private loggedIn = false;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.loggedIn = !!localStorage.getItem('userToken');
  }
  dialogData: any;
  // Get all users
  GetUsersList(status: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.linkurl + 'getUsers?status=' + status);
  }
  // Get all users
  GetUsersById(userId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.linkurl + 'getuserprofile?id=' + userId, httpOptions);
  }

  getapplicanrprofile(ApplicantId: number): Observable<any> {
    return this.httpClient.get<any>(this.linkurl + 'getapplicanrprofile?id=' + ApplicantId, httpOptions);
  }

  //Get PrincpalTree
  getPrincipalTree(): Observable<PrincipalListTree[]> {
    return this.httpClient.get<PrincipalListTree[]>(this.treeurl + 'PrincipalListTree');
  }
  // delete user
  DeleteUser(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }
  // Add user
  AddUser(formData: any): Observable<any> {   
    return this.httpClient.post(this.linkurl + 'addUser', formData, httpnewOptions)
      .pipe(catchError(this.handleError));
  }
  // update user
  UpdateUser(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateUser', formData, httpOptions)
      .pipe(catchError(this.handleError));
  }
 
  // change password
  changePassword(userId: number): Observable<any> {
    return this.httpClient.put(this.linkurl + 'resetPassword?userId=' + userId, httpOptions)
      .pipe(catchError(this.handleError));
  }
  // login user with JWT Token authentication
  userAuthentication(userName: string, password: string): Observable<any> {    
    return this.httpClient.post<any>(this.linkurl + 'login', { userName, password })
      .pipe(map(user => {
        return user;
      }));
  }

  ApplicantLogin(userName: string, password: string): Observable<any> {   
    return this.httpClient.post<any>(this.linkurl + 'ApplicantLogin', { userName, password })
      .pipe(map(user => {
        return user;
      }));
  }


  login(userName: string, password: string) {
    return this.httpClient.post(this.linkurl + 'authenticate', { userName, password })
      .pipe();
  }
  getUserClaims() {
    return this.httpClient.get(this.linkurl + '/api/GetUserClaims');
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  // remove user from local storage to log user out
  logoutUser() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
  //reset password
  resetPassword(user: User): Observable<any> {
    return this.httpClient.put(this.linkurl + 'resetPassword', user, httpOptions)
      .pipe(catchError(this.handleError));
  }
   //update password   //
   Passwordchange(formData: any): Observable<any> {
     return this.httpClient.put(this.linkurl + 'passwordchange', formData, httpOptions)
       .pipe(catchError(this.handleError));
   }


   ApplicantPasswordchange(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'ApplicantPasswordchange', formData, httpOptions)
      .pipe(catchError(this.handleError));
  }

    changeapplicantPassword(formdata: any): Observable<any> {
      return this.httpClient.post(this.linkurl + 'updateConfirmPassword', formdata)
        .pipe(catchError(this.handleError));
    }



 // Check old password
 CheckOldPassword(password: string) : Observable<any> {
   return this.httpClient.put(this.linkurl + 'checkoldpassword?pwd='+password, httpOptions)
     .pipe(catchError(this.handleError));
 }

 CheckOldApplicantPassword(password: string) : Observable<any> {
  return this.httpClient.put(this.linkurl + 'CheckOldApplicantPassword?pwd='+password, httpOptions)
    .pipe(catchError(this.handleError));
}
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
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
  /**generate PDF */
exportVesselData(vesselIds: any,type:AnyAaaaRecord): Observable<any> {
  return this.httpClient.get(this.linkurl + 'exportData?vesselIds='+vesselIds+'&type='+type,httpOptions )
    .pipe(map(Filepath => {
      return Filepath;
    }));
}

ImportVesselData(formData: any): Observable<any> {   
  return this.httpClient.post(this.linkurl + 'importData', formData, httpnewOptions)
    .pipe(catchError(this.handleError));
}
}
