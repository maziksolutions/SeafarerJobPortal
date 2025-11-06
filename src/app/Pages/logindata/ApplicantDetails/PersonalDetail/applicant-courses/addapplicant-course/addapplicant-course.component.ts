import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/Services/state.service';
import { debounceTime, finalize, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { CountryService } from 'src/app/Services/country.service';
import { licenseregisterService } from 'src/app/Services/licenseregister.service';
import { AuthorityService } from 'src/app/Services/authority.service'
import { ApplicantCoursesComponent } from '../applicant-courses.component';
import { CourseregisterService } from 'src/app/Services/courseregister.service';
import { InstitutesService } from 'src/app/Services/institutes.service';

@Component({
  selector: 'app-addapplicant-course',
  templateUrl: './addapplicant-course.component.html',
  styleUrls: ['./addapplicant-course.component.css']
})
export class AddapplicantCourseComponent implements OnInit {
  applicantId: any;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  errorMsg: any;
  applicantCoursefrm: FormGroup;
  certificateFile: File | null = null; // Allow certificateFile to be nullable
  isExpiryApplicable = false;
  authorityList: any[];
  courseRegisterList: any[];
  institutesList: any[];
  CourseRegisterSource
  status: any;
  courseList: any[]
  instituteList: any[];
  applicantCourseSource: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private applicantserice: ApplicantService,
    private applicantservice: ApplicantService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private countryService: CountryService,
    private institutesService: InstitutesService,
    private authorityService: AuthorityService,
    private CourseregisterService: CourseregisterService,
    public dialogRef: MatDialogRef<ApplicantCoursesComponent>) { }
  ngOnInit(): void {
    this.applicantCoursefrm = this.fb.group({
      applicantCoursesId: [0],
      applicantId: [this.data.ApplicantId],
      courseId: [''],
      instituteId: [''],
      authorityId: [''],
      certificateNumber: [''],
      placeOfIssue: [''],
      issueDate: [''],
      expiryDate: [''],
      attachment: [''],
    });

    this.applicantCoursefrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.loadCourseRegister(0);
    this.loadInstitutesData();  // Declare function to load institutes data
    this.loadAuthorityData(); // Declare function to load Authority data
  }

  onValueChanged(data?: any) {
    if (!this.applicantCoursefrm) { return; }
    const form = this.applicantCoursefrm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      const control = form.get(field);
      // setup custom validation message to form
      if (control && control.dirty && !control.valid) {
        const messages = '';
        // tslint:disable-next-line:forin
      }
    }
  }

  formErrors = {
    'address1': '',
    'postcode': '',
    'countryId': '',
    'stateId': '',
    'cityId': '',
    'correspondenceAddress1': '',
    'correspondenceAddress2': '',
    'correspondencePostcode': '',
    'correspondenceCountry': '',
    'correspondenceState': '',
    'correspondenceCity': '',
    'otherMobileCode': '',
    'otherMobileNumber': '',
    'airportId': '',
    'mobileCode': '',
    'mobileNumber': '',
    'email': '',
    'countryCode': '',
    'stateCode': '',
    'phoneNumber': ''
  };

  compareTwoDates() {
    if (this.isExpiryApplicable == false) {
      this.errorMsg = '';
      return true;
    }
    else if (new Date(this.applicantCoursefrm.controls['expiryDate'].value) < new Date(this.applicantCoursefrm.controls['issueDate'].value)) {
      this.errorMsg = 'Expiry date cant be less than issue date.';
      return false;
    }
    else {
      this.errorMsg = '';
      return true;
    }
  }

  handleCertificateFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
    if (inputElement?.files) {
      const fileList: FileList = inputElement.files; // Get the FileList
      this.certificateFile = fileList.item(0); // Assign the first file from the FileList
    }
  }

  loadApplicantTravel(status: number): void {
    this.applicantserice.GetApplicantTravel(status, this.applicantId)
      .subscribe(passports => {
        this.status = status;
        this.applicantCourseSource.data = passports;
      });
  }

  onSubmit(form: any) {
    let formData = new FormData();
    formData.append('data', JSON.stringify(form.value));
    if (this.certificateFile != null) {
      formData.append('file', this.certificateFile, this.certificateFile.name);
    }
    this.applicantservice.addApplicantCourses(formData).subscribe(
      data => {
        this.applicantservice.GetApplicantbyidd(form.value.applicantId);
        if (data.message) {
          this.dialogRef.close('success');
        }
        else {
          this.dialogRef.close('error');
        }
      },
      error => {
        this.errorMsg = error;
      });
  }

  loadCourseRegister(status: number): void {
    this.CourseregisterService.GetCourseRegisterList(0)
      .subscribe(data => {
        console.log(data)
        if (this.data.type == 'Company')
          this.courseList = data.filter(x => x.courseType == 'Company Course');
        else
          this.courseList = data.filter(x => x.courseType != 'Company Course');
      });
  }

  // define to load institutes data
  loadInstitutesData(): void {
    this.institutesService.GetInstitutesList(0)
      .subscribe(data => {
        this.instituteList = data;
        console.log(this.instituteList)
      });
  }

  // define to load Authority data
  loadAuthorityData(): void {
    this.authorityService.GetAuthorityList(0)
      .subscribe(data => {
        this.authorityList = data
      });
  }

  checkExpiryApplicable(courseId: any) {
    this.CourseregisterService.GetCourseById(courseId)
      .subscribe(data => {
        let courseList = data;
        if (courseList["expiryApplicable"] === true) {
          this.applicantCoursefrm.controls.expiryDate.enable();
          this.isExpiryApplicable = true;
        }
        else {
          this.applicantCoursefrm.controls.expiryDate.disable();
          this.isExpiryApplicable = false;
        }
      });
  }

}
