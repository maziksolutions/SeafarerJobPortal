import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/Services/country.service';
import { ApplicantCoursesComponent } from '../applicant-courses.component';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { InstitutesService } from 'src/app/Services/institutes.service';
import { AuthorityService } from 'src/app/Services/authority.service';
import { CourseregisterService } from 'src/app/Services/courseregister.service';

@Component({
  selector: 'app-editapplicantcourse',
  templateUrl: './editapplicantcourse.component.html',
  styleUrls: ['./editapplicantcourse.component.css']
})
export class EditapplicantcourseComponent implements OnInit {

  applicantCoursefrm: FormGroup;
  applicantId: any;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  errorMsg: any;
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

  InstituteId: any;
  AuthorityId: any;
  CourseId: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private applicantservice: ApplicantService,
    private router: Router,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private institutesService: InstitutesService,
    private authorityService: AuthorityService,
    private CourseregisterService: CourseregisterService,
    public dialogRef: MatDialogRef<ApplicantCoursesComponent>
  ) { }
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

    this.loadCourseData();
    this.loadInstitutesData();
    this.loadAuthorityData();
    this.applicantCoursefrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();



    this.applicantCoursefrm.patchValue(this.data.applicantCourses);
    this.CourseId = this.data.applicantCourses.courseId;
    this.AuthorityId = this.data.applicantCourses.authorityId;
    this.InstituteId = this.data.applicantCourses.instituteId;
    this.applicantCoursefrm.controls.instituteId.setValue(this.InstituteId);

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

  onSubmit(form: any) {
    let formData = new FormData();
    formData.append('data', JSON.stringify(form.value));
    if (this.certificateFile != null) {
      formData.append('file', this.certificateFile, this.certificateFile.name);
    }

    this.applicantservice.updateApplicantCourses(formData).subscribe(
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

  handleCertificateFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files) {
      const fileList: FileList = inputElement.files;
      this.certificateFile = fileList.item(0);
    }
  }

  loadCourseData(): void {
    this.CourseregisterService.GetCourseRegisterList(0)
      .subscribe(data => {
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
      });
  }
  // define to load Authority data
  loadAuthorityData(): void {
    this.authorityService.GetAuthorityList(0)
      .subscribe(data => {
        this.authorityList = data
      });
  }

  compareTwoDates() {
    if (new Date(this.applicantCoursefrm.controls['expiryDate'].value) < new Date(this.applicantCoursefrm.controls['issueDate'].value)) {
      this.errorMsg = 'End Date cant before start date';
      return false;
    }
    else {
      this.errorMsg = '';
      return true;
    }
  }
}
