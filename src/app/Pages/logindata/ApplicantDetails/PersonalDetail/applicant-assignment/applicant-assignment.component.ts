import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { AddApplicantAssignmentComponent } from './add-applicant-assignment/add-applicant-assignment.component';
import { EditapplicantassignmentComponent } from './editapplicantassignment/editapplicantassignment.component';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-applicant-assignment',
  templateUrl: './applicant-assignment.component.html',
  styleUrls: ['./applicant-assignment.component.css']
})
export class ApplicantAssignmentComponent implements OnInit {
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  loadingAssignment: boolean;
  applicantId: any;
  status;
  dataAssignmentSource = new MatTableDataSource<any>();
  applicantAssignment: any;
  ApplicantAssignment: any[];
  loadingState = false;
  userstatus;
  displayedapplicantAssignmentColumns = ['companyName', 'rank', 'signonDate', 'signoffDate', 'VesselName', 'ShipId', 'IMO', 'CountryId', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private applicantserice: ApplicantService,
  ) { }

  ngOnInit(): void {
    this.applicantId = this.route.snapshot.paramMap.get('id');
    this.userstatus = localStorage.getItem("UserType");
    this.loadApplicantAssignment(0);
  }

  loadApplicantAssignment(status: number): void {
    this.applicantserice.GetApplicantAssignments(status, this.applicantId)
      .subscribe(passports => {
        
        this.status = status;
        this.dataAssignmentSource.data = passports;
        // this.dataSource.data = passports; 
        this.dataAssignmentSource.sort = this.sort;
        this.dataAssignmentSource.paginator = this.paginator;

      });
  }

  addApplicantAssignment() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add Applicant Assignment';
    this.modalBtnTitle = 'Add';
    this.openApplicantAssignment();
  }
  openApplicantAssignment(): void {
    const dialogRef = this.dialog.open(AddApplicantAssignmentComponent, {
      width: '80vw',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, passports: this.applicantAssignment, ApplicantId: this.applicantId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadingAssignment = true;
        this.loadApplicantAssignment(0);
        this.showMessage('Added successfully.');
      }
    });
  }

  showMessage(msg: string, type: string = '') {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }

  updateApplicantAssignment(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Applicant Assignment';
    this.modalBtnTitle = 'Update';
    this.ApplicantAssignment = this.dataAssignmentSource.data.filter(x => x.assignmentId === id)[0];
    this.openAApplicantAssignmentEdit();
  }

  openAApplicantAssignmentEdit(): void {
    const dialogRef = this.dialog.open(EditapplicantassignmentComponent, {
      width: '80vw',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, passports: this.ApplicantAssignment, ApplicantId: this.applicantId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadingState = true;
        this.loadApplicantAssignment(0);
        this.showMessage('Updated successfully.');
      }
    });
  }

  DeleteApplicantAssignment(id: number) {
    if (confirm('Are you sure to change status of this record ?') === true) {
      this.applicantserice.DeleteApplicantAssignments(id)
        .subscribe((x) => {
          this.loadApplicantAssignment(this.status);
          this.showMessage('Successfully deleted.');
        });
    }
  }
}
