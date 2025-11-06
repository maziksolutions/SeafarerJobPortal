
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
import { ApplicantLicenseComponent } from '../applicant-license.component';
import { CountryService } from 'src/app/Services/country.service';
import { licenseregisterService } from 'src/app/Services/licenseregister.service';
import { AuthorityService } from 'src/app/Services/authority.service';
@Component({
  selector: 'app-add-applicant-license',
  templateUrl: './add-applicant-license.component.html',
  styleUrls: ['./add-applicant-license.component.css']
})
export class AddApplicantLicenseComponent  implements OnInit
{
  private rankid = localStorage.getItem('RankId');
    applicantId:any;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    errorMsg: any;
    countries: any[];
    authorityList:any[];
    licenseList:any[];
    isExpiryApplicable=false;
    RankID:any;
    certificateFile: File | null = null; // Allow certificateFile to be nullable
    applicantLicensefrm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,   private applicantserice:ApplicantService,
    private applicantservice: ApplicantService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, //SnackBar
    private snackBar: MatSnackBar,
      private countryService: CountryService,
      private licenseRegisterService: licenseregisterService,
      private authorityService: AuthorityService,
  public dialogRef: MatDialogRef<ApplicantLicenseComponent>){}
ngOnInit(): void 
{
  this.loadCountries(); 
  this.loadAuthorityData(); 
  this.loadLicenseData();
  this.applicantLicensefrm = this.fb.group({
    applicantLicenseId:[0],
    applicantId:[this.data.ApplicantId],
    licenseId: [''],
    licenseNumber: [''],
    placeOfIssue: [''],
    issueDate: [''],
    expiryDate: [''],
    countryId: [''],          
    authorityId: [''],
    attachment: ['',[Validators.required]],
  });

  this.applicantLicensefrm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged();
  // this.applicantLicensefrm.reset(); 
}

loadCountries(): void {
  this.countryService.GetCountryList(0)
    .subscribe(countries => this.countries = countries);
}

loadAuthorityData(): void {
  this.authorityService.GetAuthorityList(0)
    .subscribe(data => {
      this.authorityList = data
    });
}
loadLicenseData(): void {
  this.RankID= this.rankid;
  this.licenseRegisterService.GetLicenseByRank(this.RankID)
    .subscribe(data => {
      this.licenseList = data
      // if (this.data.type == 'flag')
      //   this.licenseList = data.filter(data => data.authority.includes('Flag'));
      // else
      //   this.licenseList = data.filter(data => !data.authority.includes('Flag'));
    });
}

    onSubmit(form: any) {
    let formData = new FormData();
    if (new Date(this.applicantLicensefrm.controls['expiryDate'].value) < new Date(this.applicantLicensefrm.controls['issueDate'].value)) {
      this.showMessage('End Date cant before start date.','danger');
        return false;
      }
      else
      {
        formData.append('data', JSON.stringify(form.value));
        if (this.certificateFile != null) {
          formData.append('file', this.certificateFile, this.certificateFile.name);
        }  
        this.applicantservice.addApplicantLicense(formData).subscribe(
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
 }


      showMessage(msg: string, type: string = '') {
        this.snackBar.open(msg, '', {
          duration: 6000,
          panelClass: type === 'danger' ? ['red-snackbar'] : ['blue-snackbar']
        });
      }


onValueChanged(data?: any) {
  if (!this.applicantLicensefrm) { return; }
  const form = this.applicantLicensefrm;
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
  // 'issueDate': '',
  // 'expiryDate': '',
  // 'licenseId': '',
  // 'authorityId': '',
  // 'countryId': '',
  // 'placeOfIssue': '',
  // 'licenseNumber': '',
  // 'attachment': '',  
};



compareTwoDates() {
  if (new Date(this.applicantLicensefrm.controls['expiryDate'].value) < new Date(this.applicantLicensefrm.controls['issueDate'].value)) {
    this.errorMsg = 'End Date cant before start date';
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
  
}
