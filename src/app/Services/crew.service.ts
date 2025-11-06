import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrewModel, CrewPerformanceBonus } from '../Models/crew-model.model';
import { CrewSearch } from '../Models/crew-search.model';
import { Dashboard,Dashrank,CrewContract } from '../Models/crew-model.model';
import { environment } from '../../environments/environment';
import { DownloadPDF } from '../Models/download-pdf.model';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
let authToken = localStorage.getItem('userToken');

const httpOptions = {
  headers: new HttpHeaders({
   //  'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authToken
  })
};

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private google : any;
  baseUrl = environment.apiurl;
  stepUrl = environment.stepAPIURL;
  private linkurl = this.baseUrl + 'CrewDetails/';
  private steplinkUrl = this.stepUrl + 'CrewlinkAPI/';
  private linkdashboardurl = this.baseUrl + 'DashboardChart/';
  private pdfURL = this.baseUrl + 'pdf/';
  UserStatus: any[];
  constructor(private httpClient: HttpClient,) { }

  //Get all applicants 
  getAllApplicants(id: number): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getAllApplicants?id=' + id, httpOptions);
  }


    //Get all applicants 
    getNewApplicants(rankId: any, name: any, status: any, type:any, country: any,FilterType:any,UserId:any,from:any,to:any): Observable<CrewModel[]> {
      return this.httpClient.get<CrewModel[]>(this.linkurl + 'getNewApplicants?rankId=' + rankId+'&name='+name+'&status='+status+'&type='+type+'&country='+country+'&filtertype='+FilterType+'&addedBy='+UserId+'&from='+from+'&to='+to, httpOptions);
    }


 //Get all applicants 
 showAllRemarks(crewId: any): Observable<any> {
  return this.httpClient.get<any>(this.linkurl + 'showAllRemarks?crewId=' + crewId, httpOptions);
}


  //Get all crews data who's eployee no. will be generated
  getAllCrews(): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getAllCrews', httpOptions);
  }

  getsearch(search:any): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getsearch?searchcrew='+search, httpOptions);
  }

//Get all crews data who's eployee no. will be generated
GetFilteredCrew(status:any, rank:any, shipType:string, vessel:any, country:any,  pool:number,filterType:string, isexp:boolean,crewType:any,dept:any  ): Observable<CrewModel[]> {
  return this.httpClient.get<CrewModel[]>(this.linkurl + 'GetFilteredCrew?status='+status+'&rank='+rank+'&shipType='+shipType+'&vessel='+vessel+'&country='+country+'&pool='+pool+'&filterType='+filterType+'&isexp='+isexp+'&ct='+crewType+'&dept='+dept, httpOptions);
}

  //Get crew count
  GetCrewsCount(): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getCrewcount', httpOptions);
  }
  getCrews(pageNumber : number): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getCrews?pageNumber=' + pageNumber, httpOptions);
  }
//autocomplete
search(term) {
  var listOfCrew = this.httpClient.get(this.linkurl + 'getsearch?searchcrew=' + term)
  .pipe( debounceTime(10),  
      map(
          (data: any) => {
              return (
                  data.length != 0 ? data as any[] : [{"Crew Name": "No Record Found"} as any]
              );
          }
  ));
  return listOfCrew;  
}  
//get selected crew
getSelectedCrew(crewid: number): Observable<CrewModel[]> {
  return this.httpClient.get<CrewModel[]>(this.linkurl + 'GetParticularCrew?crewId=' + crewid, httpOptions);
}

//get selected crew
GetCrewForSearch(): Observable<CrewSearch[]> {
  return this.httpClient.get<CrewSearch[]>(this.linkurl + 'GetCrewForSearch', httpOptions);
}
  //
  GetDashboardData(): Observable<Dashboard[]> {    
    return this.httpClient.get<Dashboard[]>(this.linkurl + 'getdashboard', httpOptions);
  }
  //
  getReliever1ContractDetails(reliever1Id: any) {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getReliever1Contract?reliever1Id=' + reliever1Id, httpOptions);
  }

  //Get Details for Reliever Contract
  getRelieverContract(reliever1Id: any) {
    return this.httpClient.get<CrewContract[]>(this.linkurl + 'getRelieverContract?crewid=' + reliever1Id, httpOptions);
  }
//get Details for Revise COntract
  getCrewReviseContract(crewId: any) {
    return this.httpClient.get<CrewContract[]>(this.linkurl + 'getCrewReviseContract?crewid=' + crewId, httpOptions);
  }
  
  //Get all crews data who's status are 'Proposed'
  getAllPendingApprovals(): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getAllPendingApprovals', httpOptions);
  }

  // Get
  getCrewParticular(crewid: string): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getParticular?crewId=' + crewid, httpOptions);
  }

  // Get
  getIsNTBR(rank:any, nationality:string, cdc:any, name:any,  empno:any): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getIsNTBR?rank=' +rank +'&nationality=' +nationality +'&cdc=' +cdc +'&name=' +name +'&empno=' +empno, httpOptions);
  }

  getMasked(rank:any, nationality:string, cdc:any, name:any,  empno:any): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getmaskedCrew?rank=' +rank +'&nationality=' +nationality +'&cdc=' +cdc +'&name=' +name +'&empno=' +empno, httpOptions);
  }


  // Get
  getInActive(rank:any, nationality:string, cdc:any, name:any,  empno:any, from:any, to:any): Observable<CrewModel[]> {
    return this.httpClient.get<CrewModel[]>(this.linkurl + 'getInActive?rank=' +rank +'&nationality=' +nationality +'&cdc=' +cdc +'&name=' +name +'&empno=' +empno+'&from=' +from+'&to=' +to, httpOptions);
  }

  // delete existing applicant
  deleteNewApplicant(id: number) {
    return this.httpClient.delete(this.linkurl + id, httpOptions);
  }

  // Add new applicant
  addNewApplicant(formdata: any): Observable<any> {
    return this.httpClient.post(this.linkurl + 'addApplicant', formdata, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update
  updatePersonalInfo(formData: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updatePersonal', formData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update
  updateVesselInfo(formdata: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateVessel', formdata, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update
  updatePhysicalInfo(personal: CrewModel): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updatePhysical', personal, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update existing applicant
  updateNewApplicant(formdata: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateApplicant', formdata, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Approve employee i.e generate employee no.
  approveNewApplicant(crewid: number,recruiterId,remarks): Observable<any> {
    const newurl = `${this.linkurl + 'approveApplicant?crewId=' + crewid+'&recruiterId=' + recruiterId+'&remarks='+remarks}`;
    return this.httpClient.put(newurl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

passdatatoSTEP(crewid: number,vesseltype:any): Observable<any>{
  return this.httpClient.post(this.steplinkUrl + 'getcrewdata?crewid=' + crewid +'&vesseltype='+vesseltype, httpOptions).pipe(catchError(this.handleError));
}
CheckIATStatus(crewid: number,rank: number,vesseltype: number): Observable<any>{
  // const newurl = `${this.steplinkUrl + 'getcrewdata?crewid=' + crewid}`;
  return this.httpClient.post(this.steplinkUrl + 'sendIATStatus?crewid=' + crewid +'&rank=' + rank+'&vesseltype=' + vesseltype, httpOptions).pipe(catchError(this.handleError));
}
getSTEPdata(crewid: number): Observable<any>{
  // const newurl = `${this.steplinkUrl + 'getcrewdata?crewid=' + crewid}`;
  return this.httpClient.get<any>(this.steplinkUrl + 'getcrewstepdata?crewid=' + crewid, httpOptions).pipe(catchError(this.handleError));
}
  // Reject Approval from pending approvals
  rejectApproval(crewid: number,crewListId : number): Observable<any> {
    const newurl = `${this.linkurl + 'rejectPendingApproval?crewId=' + crewid+'&crewListId='+crewListId}`;
    return this.httpClient.put(newurl, httpOptions)
      .pipe(catchError(this.handleError));
  }

 


  
  // Reject Applicant from crewdetails
  rejectApplicant(crewid: number): Observable<any> {
    return this.httpClient.put(this.linkurl + 'rejectApplicant?crewId=' + crewid, httpOptions)
      .pipe(catchError(this.handleError));
  }
  // Ntbr or InActive
  isNTBROrInActive(crew: CrewModel): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateIsNtbrOrInActive', crew, httpOptions)
      .pipe(catchError(this.handleError));
  }
  updateMaskedCrew(crew: any): Observable<any> {
    return this.httpClient.put(this.linkurl + 'updateMaskedCrew', crew, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // get user status
  getUserStatus() {
    this.UserStatus = [
      { userId: 1, userStatus: 'Approved' },
      { userId: 2, userStatus: 'Available' },
      { userId: 3, userStatus: 'Inactive' },
      { userId: 4, userStatus: 'New Applicant' },
      { userId: 5, userStatus: 'Terminated' },
      { userId: 6, userStatus: 'Onboard' },
      { userId: 7, userStatus: 'OnLeave' },
      { userId: 8, userStatus: 'Proposed' },
      { userId: 9, userStatus: 'Sign In Transit' },
      { userId: 10, userStatus: 'Sign Off Transit' },
      { userId: 11, userStatus: 'Travel To Vessel' }
    ];
    return this.UserStatus;
  }

  //DownLoad CV
  getDownloadCV(CrewId: number, Status: string): Observable<DownloadPDF[]> {
    return this.httpClient.get<DownloadPDF[]>(this.pdfURL + 'PDF?crewid=' + CrewId + '&status=' + Status, httpOptions);
  }

  //Create chart on dashboard
  GetRank() {
    return this.httpClient.get<any>(this.linkdashboardurl + 'getrank', httpOptions).pipe(
      map( result => {
        return result;
      })
      );;
  }
  //
  GetNationalityChart() {
    return this.httpClient.get<any>(this.linkdashboardurl + 'NationalityChart', httpOptions).pipe(
      map( result => {
        return result;
      })
      );;
  }
  GetcrewChart() {
    return this.httpClient.get<any>(this.linkdashboardurl + 'crewChart', httpOptions).pipe(
      map( result => {
        return result;
      })
      );;
  }
  GetRetentionChart() {
    return this.httpClient.get<any>(this.linkdashboardurl + 'RetentionChart', httpOptions).pipe(
      map( result => {
        return result;
      })
      );;
  }
  // getGoogle(){
  //   return this.google;
  // }

//#region FP18 
// Approve employee i.e generate employee no.
addPerformanceBonus(formdata: any): Observable<any> {
  return this.httpClient.post(this.linkurl + 'addPerformanceBonus', formdata, httpOptions)
      .pipe(catchError(this.handleError));
}
// Reject Approval from pending approvals
deletePerformanceBonus(performanceId: number): Observable<any> {
  const newurl = `${this.linkurl + 'deleteBonus?id=' + performanceId}`;
  return this.httpClient.put(newurl, httpOptions)
    .pipe(catchError(this.handleError));
}

getPerformanceBonus(crewId:any,status:any): Observable<CrewModel[]> {
  return this.httpClient.get<CrewModel[]>(this.linkurl + 'getPerformanceBonus?crewId=' +crewId+'&status='+status, httpOptions);
}
generatePDF(id:number,type:number): Observable<DownloadPDF[]> { 
  return this.httpClient.get<DownloadPDF[]>(this.linkurl + 'generateBonus?id=' + id+'&type='+type, httpOptions);
}


SendWaiverRequest(crewId:any,typeOfWaiver,waiverSentTo,ReqRemark,trids,trnames): Observable<any> {
  return this.httpClient.get(this.linkurl + 'addwaiver?crewid=' +crewId+'&typeOfWaiver='+typeOfWaiver+'&waiverSentTo='+waiverSentTo+'&remark='+ReqRemark+'&trids='+trids+'&trnames='+trnames, httpOptions)
    .pipe(catchError(this.handleError));
}
approveWaiverRequest(fromdata:any): Observable<any> {
  return this.httpClient.post(this.linkurl + 'approveWaiverRequest',fromdata, httpOptions)
    .pipe(catchError(this.handleError));
}
getwaiverreqID(waiverid:any): Observable<any> {
  return this.httpClient.get<any>(this.linkurl + 'checkWaiverRequest?waiverid='+ waiverid, httpOptions);
}

getwaiverdata(): Observable<any> {
  return this.httpClient.get<any>(this.linkurl + 'getwaiverdata', httpOptions);
}
//#endregion


updateInsuranceStatus(formdata: any): Observable<any> {
  return this.httpClient.post(this.linkurl + 'updateInsuranceStatus', formdata, httpOptions)
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
