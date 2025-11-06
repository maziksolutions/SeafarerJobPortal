import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from 'src/app/Services/city.service';
import { CountryService } from 'src/app/Services/country.service';
import { CrewAddressService } from 'src/app/Services/crew-address.service';
import { StateService } from 'src/app/Services/state.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AirportService } from 'src/app/Services/airport.service';
import { debounceTime, finalize, from, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { licenseregisterService } from 'src/app/Services/licenseregister.service';
import { AuthorityService } from 'src/app/Services/authority.service';
import { ApplicantLicenseComponent } from '../applicant-license.component';
import { DBOperation } from 'src/app/Shared/DBOperation';


@Component({
  selector: 'app-editapplicantlicence',
  templateUrl: './editapplicantlicence.component.html',
  styleUrls: ['./editapplicantlicence.component.css']
})
export class EditapplicantlicenceComponent implements OnInit
 {
  private rankid = localStorage.getItem('RankId');
  certificateFile: File | null = null; // Allow certificateFile to be nullable
    applicantLicensefrm:FormGroup
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
    CountryId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,   
  private applicantserice:ApplicantService,
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
    attachment: [''],
  });

  this.applicantLicensefrm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged();
  this.applicantLicensefrm.patchValue(this.data.ApplicantLicense);
  this.CountryId = this.data.ApplicantLicense.country.countryId;
  this.applicantLicensefrm.controls.countryId.setValue(this.CountryId);
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

 this.applicantservice.updateApplicantLicense(formData).subscribe(
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

    handleCertificateFile(event: Event): void {
      const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
      if (inputElement?.files) {
        const fileList: FileList = inputElement.files; // Get the FileList
        this.certificateFile = fileList.item(0); // Assign the first file from the FileList
      }
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
      if (new Date(this.applicantLicensefrm.controls['expiryDate'].value) < new Date(this.applicantLicensefrm.controls['issueDate'].value)) {
        this.errorMsg = 'End Date cant before start date';
        return false;
      }
      else {
        this.errorMsg = '';
        return true;
      }
    }
      
    showMessage(msg: string, type: string = '') {
      this.snackBar.open(msg, '', {
        duration: 6000,
        panelClass: type === 'danger' ? ['red-snackbar'] : ['blue-snackbar']
      });
    }

}
