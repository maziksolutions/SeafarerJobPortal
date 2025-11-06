import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';;
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
//import { first } from 'rxjs/internal/operators/first';
import { ApplyAccessRightsService } from 'src/app/Services/apply-access-rights.service';
import { CountryService } from 'src/app/Services/country.service';
//import { ExportExcelService } from 'src/app/Services/export-excel.service';
import { RankregisterService } from 'src/app/Services/rankregister.service';
import { CrewService } from 'src/app/Services/crew.service';
import { User } from 'src/app/Models/user';
import * as moment from 'moment';
import { CrewModel } from 'src/app/Models/crew-model.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-sefarerelist',
  templateUrl: './sefarerelist.component.html',
  styleUrls: ['./sefarerelist.component.css']
})
export class SefarerelistComponent implements OnInit 

{  
  dropdownRankSetting: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  dropdownCountrySetting: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['crewName', 'code', 'dob', 'nationality', 'shipCategory', 'impRemark', 'applicantStatus', 'doa','followUpDate', 'recDate', 'modifiedDate', 'actions'];
  opNationalities = <any>[];
  form: FormGroup;
  users: User[];
  ranks: any[];
  country: any[];
  selectedCountries: string[] = [];
  selectedRank: string[] = [];
  dataSource = new MatTableDataSource<CrewModel>();
 
  crewRemarksData: any;
  constructor(
   // private helpService: ActivityLogsService,
    private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private countryService: CountryService,
   // private crewService: CrewService, 
  //  private exportExcelService: ExportExcelService,
    private fb: FormBuilder,
    private _applyAccessRightsService: ApplyAccessRightsService,
    private rankregisterService: RankregisterService,
    //private sanitizer: DomSanitizer,
    public dialog: MatDialog) { }

  ngOnInit()
  {
    this.ngxLoader.start();
    const opNationalities = localStorage.getItem('opNationalities');
    if (opNationalities) {
      this.opNationalities = opNationalities.split(',');
    } else {
      // Handle the case where opNationalities is null or undefined
      this.opNationalities = []; // Or whatever fallback is appropriate
    }
    
    // this.opNationalities = localStorage.getItem('opNationalities').toString().split(','); // get user nationalities
    
    // get user nationalities
    const userSession = localStorage.getItem('userToken');
    // if (userSession == null || userSession == '' || userSession == undefined)
    //   this.router.navigateByUrl('/login');
    this.fillData();// load to fill data
    this.form = this.fb.group({
      rankId: [''],
      countryId: [''],
      firstName: [''],
      filter: [''],
      shipType: [''],
      fromD: ['', [Validators.required]],
      to: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      created: ['']
    });
    this.dropdownRankSetting = {
      singleSelection: false,
      idField: 'rankId',
      textField: 'rankName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownCountrySetting = {
      singleSelection: false,
      idField: 'countryId',
      textField: 'nationality',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    // this.reset();// reset values functions
  //  this.loadHelp();
    // this.form.controls.created.setValue('Remark');
    this.form.controls.userId.disable();
    this.form.controls.fromD.disable();
    this.form.controls.to.disable();
    this.form.controls.filter.setValue('Yet To Evaluate');
    this.search();
  }

  fillData() {  
   // this.loadUsers();
    this.loadRankRegister(); // Declare function
    this.loadCountries();// declare function
   // this.loadRights();// load rights
    //this.loadNewApplicant(0); // Declare function to load applicant data
   // this.loadFilteredApplicant(null, 'Yet To Evaluate', null, null, null, null, null)
     
  }
 /**Load users */
//  loadUsers() {
//   this.userService.GetUsersList(0)
//     .subscribe((data) => {
//       this.users = data.filter(x=>x.designation.department=='RC' && x.isActive==true);
//       console.log(this.users)
//     });
// }
// define function
loadRankRegister() {
  this.rankregisterService.GetRankList(0)
    .subscribe((data) => {
      this.ranks = data;
    });
}
// define countries
loadCountries() {
  this.countryService.GetCountryList(0)
    .subscribe((data) => {
      this.country = data.filter(data => (this.opNationalities.includes(data.countryId.toString())));
      ;
    });
}

search() {
  var userDetails;
  let UserId = null;
  //let rankId = this.form.controls.rankId.value;
  let firstName = this.form.controls.firstName.value;
  let filterCol = this.form.controls.filter.value;
  let shipType = this.form.controls.shipType.value;
  let FilterType = this.form.controls.created.value;
  if (FilterType != null && FilterType != undefined) {
    if (FilterType == 'Created') {
      UserId = this.form.controls.userId.value;
    }
    else if (FilterType == 'Remark') {
      userDetails = this.users.filter(x => x.usersId == this.form.controls.userId.value)
    //  UserId = (userDetails[0].firstName + '' + userDetails[0].lastName).toString().trim();
    }
  }

  let from = moment(new Date(this.form.controls.fromD.value)).format("YYYY/MM/DD");
  let to = moment(new Date(this.form.controls.to.value)).format("YYYY/MM/DD");

 // this.loadFilteredApplicant(firstName, filterCol, shipType, FilterType, UserId, from, to)
}


// loadFilteredApplicant(name: any, status: any, type: any, FilterType: any, UserId: any, from: any, to: any): void {
//   this.crewService.getNewApplicants(this.selectedRank, name, status, type, this.selectedCountries, FilterType, UserId, from, to)
//     .subscribe(data => {
//       this.dataSource.data = data;
//       this.dataSource.sort = this.sort;
//       // this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
//       //   return this.getPropertyByPath(data, sortHeaderId);
//       // };
//       this.dataSource.paginator = this.paginator;
//       this.ngxLoader.stop();
//     });
// }
getPropertyByPath(obj: Object, pathString: string) {
  return pathString.split('.').reduce((o, i) => o[i], obj);
}

  //#region 
  // select single 
  onRankSelect(event: any) {
    let isSelect = event.rankName;
    if (isSelect) {
      this.selectedRank.push(event.rankName);
    }
  }
  // select multiple
  onRankSelectAll(event: any) {
    this.selectedRank = event.map((x: { rankName: any; }) => x.rankName);
  }
  // single deselct
  onRankDeSelect(event: { rankName: string; }) {
    let rindex = this.selectedRank.findIndex(rankName => rankName == event.rankName);
    if (rindex != -1) {
      this.selectedRank.splice(rindex, 1);
    }
  }
  // deselect all
  onRankDeSelectAll(event) {
    this.selectedRank.length = 0;
    // this.selectedCountries.splice(0, this.selectedCountries.length);
  }
  //#endregion

  open(crewId: number): void {
    // this.crewService.showAllRemarks(crewId)
    //   .subscribe(data => {
    //     if (data.length > 0)
    //       this.crewRemarksData = data;
    //     else
    //       this.crewRemarksData = null;
    //   });
    // this.elm.classList.add('show');
    // this.elm.style.width = '100vw';
  }

}
