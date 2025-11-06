import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { MatPaginator } from '@angular/material/paginator';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Keys } from 'src/app/Shared/localKeys';

@Component({
  selector: 'app-applicantlist',
  templateUrl: './applicantlist.component.html',
  styleUrls: ['./applicantlist.component.css']
})
export class ApplicantlistComponent implements OnInit {
  loggedUserId: any;
  loadingState: boolean;
  dataSource = new MatTableDataSource<any>();
  status;
  displayedColumns: string[] = ['name', 'rankRegister.rankName', 'dob', 'country.countryName', 'cdc', 'vesseltype', 'remarks', 'status', 'doa', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    //private helpService: ActivityLogsService,
    // private exportExcelService: ExportExcelService,
    private snackBar: MatSnackBar,
    private router: Router, 
    private jwtHelper: JwtHelperService,
    // private exportExcelService: ExportExcelService,
    // private _applyAccessRightsService: ApplyAccessRightsService,
    private ApplicantService: ApplicantService,
    public dialog: MatDialog) { }

  ngOnInit() {
    // this.userId();
    this.loggedUserId=localStorage.getItem('userId');
    this.loadingState = true;
    // const userSession = localStorage.getItem('userToken');
    // if (userSession == null || userSession == '' || userSession == undefined)
    //   this.router.navigateByUrl('/login');
    this.LoadApplicant(0);
  }


  LoadApplicant(status: number): void {
    this.ApplicantService.GetAllApplicants(status)
      .subscribe(passports => {
        console.log(passports);
        
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
  ApproveApplicant(id: number) {debugger
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


}
