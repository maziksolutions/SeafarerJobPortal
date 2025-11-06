import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { AddapplicantCourseComponent } from './addapplicant-course/addapplicant-course.component';
import { EditapplicantcourseComponent } from './editapplicantcourse/editapplicantcourse.component';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-applicant-courses',
  templateUrl: './applicant-courses.component.html',
  styleUrls: ['./applicant-courses.component.css'],
})
export class ApplicantCoursesComponent implements OnInit {
  dbops: DBOperation;
  modalTitle: string;
  errorMsg: any;
  modalBtnTitle: string;
  loadingApplicantCourses: boolean;
  applicantId: any;
  status;
  applicantApplicantCourses: any;
  ApplicantCourses: any[];
  loadingState = false;
  displayedApplicantCoursesColumns = ['CourseId', 'InstituteId', 'AuthorityId', 'CertificateNumber', 'PlaceOfIssue', 'IssueDate', 'ExpiryDate', 'actions'];
  dataApplicantCoursesSource = new MatTableDataSource<any>();
  userstatus: any;
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
    this.loadApplicantCourses(0);
  }
  addApplicantCourse() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add Applicant Courses';
    this.modalBtnTitle = 'Add';
    this.openApplicantCourse();
  }

  openApplicantCourse(): void {
    const dialogRef = this.dialog.open(AddapplicantCourseComponent, {
      width: '80vw',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, applicantCourses: this.ApplicantCourses, ApplicantId: this.applicantId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadingState = true;
        this.loadApplicantCourses(0);
        this.showMessage('Added successfully.');
      }
    });
  }

  loadApplicantCourses(status: number): void {
    this.applicantserice.GetApplicantCourses(status, this.applicantId)
      .subscribe(DATA => {
        this.status = status;
        this.dataApplicantCoursesSource.data = DATA;
        this.dataApplicantCoursesSource.sort = this.sort;
        this.dataApplicantCoursesSource.paginator = this.paginator;

      });
  }

  updateApplicantCourses(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Update Applicant Courses';
    this.modalBtnTitle = 'Update';
    this.ApplicantCourses = this.dataApplicantCoursesSource.data.filter(x => x.applicantCoursesId === id)[0];
    this.openApplicantCoursesEdit();
  }

  openApplicantCoursesEdit(): void {
    const dialogRef = this.dialog.open(EditapplicantcourseComponent, {
      width: '80vw',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, applicantCourses: this.ApplicantCourses, ApplicantId: this.applicantId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadingState = true;
        this.loadApplicantCourses(0);
        this.showMessage('Updated successfully.');
      }
    });
  }

  DeleteApplicantCourses(id: number) {
    if (confirm('Are you sure to change status of this record ?') === true) {
      this.applicantserice.DeleteApplicantCourses(id)
        .subscribe((x) => {
          this.loadApplicantCourses(this.status);
          this.showMessage('Successfully deleted.');
        });
    }
  }

  showMessage(msg: string, type: string = '') {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }
}
