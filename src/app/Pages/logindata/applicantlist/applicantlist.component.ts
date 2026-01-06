import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { MatPaginator } from '@angular/material/paginator';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Keys } from 'src/app/Shared/localKeys';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/Models/country.model';
import { rankRegisterModel } from 'src/app/Models/rankRegister.model';
import { RankregisterService } from 'src/app/Services/rankregister.service';
import { CountryService } from 'src/app/Services/country.service';
import * as moment from 'moment';
import { ShiptypeService } from 'src/app/Services/shiptype.service';
@Component({
  selector: 'app-applicantlist',
  templateUrl: './applicantlist.component.html',
  styleUrls: ['./applicantlist.component.css']
})
export class ApplicantlistComponent implements OnInit {
  loggedUserId: any;errorMsg: any;agefrom:any;ageto:any;
  loadingState: boolean;from: any; toDOA: any; shipTypeList: any[];
  dataSource = new MatTableDataSource<any>();agenumber: any[];lastShipType:any;
  form:FormGroup;country: Country[];ranks: rankRegisterModel[];fullRanks: rankRegisterModel[];
  status; applicantId:any;selectedCountries: string[] = [];selectedRank: string[] = [];
   dropdownRankSetting: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; }; 
  dropdownCountrySetting: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  displayedColumns: string[] = ['name', 'rankName', 'dob', 'countryName', 'cdc','lastrank', 'vesseltype', 'remarks', 'status', 'doa', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  now = new Date();
   toDate = new Date().toISOString().split('T')[0];
  fromDate = new Date(this.now.setMonth(this.now.getMonth() -12)).toISOString().split('T')[0];
  
  constructor(
    //private helpService: ActivityLogsService,    Rank, Status, Nationality, Age, DOA
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router, 
    private shiptypeService: ShiptypeService,

    private route: ActivatedRoute,
    private rankregisterService: RankregisterService,
    private countryService: CountryService,
    private ApplicantService: ApplicantService,
    public dialog: MatDialog) { }

  ngOnInit() {
    // this.userId();
    this.loggedUserId=localStorage.getItem('userId');
    this.applicantId = this.route.snapshot.paramMap.get('id');
    // alert(this.applicantId)
    this.loadingState = true;
    // const userSession = localStorage.getItem('userToken');
    // if (userSession == null || userSession == '' || userSession == undefined)
    //   this.router.navigateByUrl('/login');
    this.LoadApplicant(0);
    this.loadRanks();
    this.loadCountries();
    this.Agenumbers();
     this.loadShipType();
     this.form = this.fb.group({
      rankId: [''],
      countryId: [''],
      agefrom: [''],
      ageto: [''],
      status: [''],
      from: [this.fromDate],
      toDOA: [this.toDate],
      lastShipType:['']
    });
     this.dropdownCountrySetting = {
      singleSelection: false,
      idField: 'countryId',
      textField: 'nationality',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
     this.dropdownRankSetting = {
      singleSelection: false,
      idField: 'rankId',
      textField: 'rankName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }


  LoadApplicant(status: number): void {
    this.ApplicantService.GetAllApplicants(status)
      .subscribe(passports => {
        
        this.status = status;
        this.dataSource.data = passports;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  DeleteApplicant(id: number) {
    if (confirm('Are you sure to change status of this record ?') === true) {
      this.ApplicantService.DeleteApplicant(id)
        .subscribe((x) => {
          this.LoadApplicant(this.status);
          this.showMessage('Successfully deleted.');
        });
    }
  }
  // Filter/search
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // export excel
  generateExcel() {
    if (this.dataSource.data.length == 0)
      this.showMessage('No data to Export', 'danger');
    else
      this.exportAsXLSX(JSON.parse(JSON.stringify(this.dataSource.data)));
  }
  exportAsXLSX(data: any[]): void {
    data.forEach((item) => {
      // delete item.crewSort, delete item.level,
      // delete item.rankId,delete item.recDate,delete item.isDeleted, delete item.modifiedBy, delete item.modifiedDate              
    });
    // this.exportExcelService.exportAsExcelFile(data, 'Applicant List', 'Applicant List');
  }

  showMessage(msg: string, type: string = '') {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }
  ApproveApplicant(id: number) {
  if (confirm('Are you sure you want to approve this applicant?')) {
    this.ApplicantService.ApproveApplicant(id, this.loggedUserId)
  .subscribe({
    next: (res: any) => {
      this.showMessage('Applicant approved successfully.');
      this.LoadApplicant(this.status);
    },
    error: (err) => {
      this.showMessage('Error approving applicant: ' + (err.error?.message || err.message));
    }
  });

  }
}
RejectApplicant(id: number) {
  if (confirm('Are you sure you want to Reject this applicant?')) {
    this.ApplicantService.RejectApplicant(id, this.loggedUserId)
  .subscribe({
    next: (res: any) => {
      this.showMessage('Applicant rejected successfully.');
      this.LoadApplicant(this.status);
    },
    error: (err) => {
      this.showMessage('Error approving applicant: ' + (err.error?.message || err.message));
    }
  });

  }
}
exportReport(applicantId:any){
  this.ApplicantService.ExportApplicantData(applicantId)
    .subscribe((response) => {
      if(response.size){
        var bolb=new Blob([response],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        var a = document.createElement("a");
        a.href = URL.createObjectURL(bolb);
        a.download = 'Applicant Details.xlsx';
        a.click();
        }else{
          // this.swal.info('File not found');
        }
    })
}
 reset() {
   
    this.form.controls.status.reset();
    this.form.controls.rankId.reset();
    this.form.controls.countryId.reset();
    this.form.controls.lastShipType.reset();
    this.form.controls.agefrom.reset();
    this.form.controls.ageto.reset();
    this.selectedCountries.length = 0;
    this.selectedCountries=[];
    this.selectedRank=[];
    this.selectedRank.length = 0;
    this.dataSource.data = [];
 
  }

 CalculateAge(DOB: any) {
    let today = Date.now();
    var dob = Date.parse(DOB);
    var total = today - dob;
    var totalDays = total / (1000 * 60 * 60 * 24);
    var year = Math.floor((totalDays) / 365.25);
    var months = Math.floor((totalDays % 365.25) / 30);
    var days = Math.floor((totalDays % 365.25) % 30);
    return year;
  }

search(){
 let from = moment(new Date(this.form.controls.from.value)).format("YYYY/MM/DD");
    let toDOA = moment(new Date(this.form.controls.toDOA.value)).format("YYYY/MM/DD");
    let status = this.form.controls.status.value;
     let agefrom = this.form.controls.agefrom.value;
    let ageto = this.form.controls.ageto.value;
    let lastShipType = this.form.controls.lastShipType.value;
    this.from = from;
    this.toDOA = toDOA;
    this.status = status;
    this.agefrom = agefrom;
    this.ageto = ageto;
    this.lastShipType = lastShipType;
    if (this.from == null || this.from == undefined || this.from == 'Invalid date')
      this.showMessage('Select from date', 'danger');
    else if (this.toDOA == null || this.toDOA == undefined || this.toDOA == 'Invalid date')
      this.showMessage('Select to date', 'danger');
    else if (new Date(this.form.controls.from.value) > new Date(this.form.controls.toDOA.value))
      this.showMessage('To date cannot be less than from date.', 'danger');
    else
      this.ApplicantService.GetFilteredApplicant(this.status, this.selectedRank,this.selectedCountries, this.from,this.toDOA,this.lastShipType)
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      
        if (agefrom != '' && ageto != '' && agefrom != null && ageto != null) {
          if (this.ValidateValue())
            this.dataSource.data = this.dataSource.data.filter(x => (this.CalculateAge(x.dob)) >= agefrom && (this.CalculateAge(x.dob)) <= ageto);
        }
        else if (agefrom != '' && agefrom != null) {
          this.dataSource.data = this.dataSource.data.filter(x => (this.CalculateAge(x.dob)) >= agefrom);
        }
        else if (ageto != '' && ageto != null) {
          this.dataSource.data = this.dataSource.data.filter(x => (this.CalculateAge(x.dob)) <= ageto);
        }

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'dob': return new Date(item.dob);
            // case 'lastSignOffDate': return new Date(item.lastSignOffDate);
            case 'doa': return new Date(item.doa);
            default: return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
         this.LoadApplicant(this.status);
      });
  }
    
//#region 
  // select single 
  onCountrySelect(event: any) {
    let isSelect = event.countryId;
    if (isSelect) {
      this.selectedCountries.push(event.countryId);
    }
  }
  // select multiple
  onCountrySelectAll(event: any) {
    if (event)
      this.selectedCountries = event.map((x: { countryId: any; }) => x.countryId);
  }
  // on deselect
  onCountryDeSelect(event: any) {
    let rindex = this.selectedCountries.findIndex(countryId => countryId == event.countryId);
    if (rindex != -1) {
      this.selectedCountries.splice(rindex, 1)
    }
  }
  // deselect all
  onCountryDeSelectAll(event: any) {
    this.selectedCountries.length = 0;
    // this.selectedCountries.splice(0, this.selectedCountries.length);
  }

  //#endregion
  //#region 
  // select single 
  onRankSelect(event: any) {
    let isSelect = event.rankId;
    if (isSelect) {
      this.selectedRank.push(event.rankId);
    }
  }
  // select multiple
  onRankSelectAll(event: any) {
    this.selectedRank = event.map((x: { rankId: any; }) => x.rankId);
  }
  // single deselct
  onRankDeSelect(event: any) {
    // { rankName: string};
    let rindex = this.selectedRank.findIndex(rankId => rankId == event.rankId);
    if (rindex != -1) {
      this.selectedRank.splice(rindex, 1);
    }
  }
  // deselect all
  onRankDeSelectAll(event) {
    this.selectedRank.length = 0;
    // this.selectedCountries.splice(0, this.selectedCountries.length);
  }

   loadRanks() {
    this.rankregisterService.GetRankList(0)
      .subscribe((data) => {
        this.fullRanks = data;
        this.ranks = data;
      });
  }
  loadCountries() {
    this.countryService.GetCountryList(0)
      .subscribe((data) => {
        this.country = data
      });
  }

  loadShipType() {
    this.shiptypeService.GetShipTypeData(0)
      .subscribe(data => {
        this.shipTypeList = data
      });
  }

Agenumbers() {
    var total = 61;
    const range: number[] = []; 
    for (var i = 18; i < total; i++) {
      range.push(i);
    }
    this.agenumber = range;
  }
  
    ValidateValue() {
    if (Number(this.form.controls['ageto'].value) < Number(this.form.controls['agefrom'].value)) {
      this.showMessageValidate('Ageto cannot be less than from Agefrom');
      this.form.controls.ageto.setValue('')
      return false;
    }
    else {
      this.errorMsg = '';
      return true;
    }
  }
   showMessageValidate(msg: string, type: string = '') {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }
  

   fromDateChange(fromDate: any) {
    if (fromDate.target.value) {
      let toDate = this.form.controls.toDOA.value;
      if (toDate == null || toDate == undefined) {
        this.showMessage('Select to date', 'danger');
      }
    }
  }
  // to date change
  toDateChange(toDate: any) {
    if (toDate.target.value) {
      let toDate = this.form.controls.from.value;
      if (toDate == null || toDate == undefined) {
        this.showMessage('Select from date', 'danger');
      }
    }
  }
}
