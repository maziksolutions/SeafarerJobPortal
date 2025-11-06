import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicanttravelComponent } from '../applicanttravel.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/Services/country.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
@Component({
  selector: 'app-editapplicanttravel',
  templateUrl: './editapplicanttravel.component.html',
  styleUrls: ['./editapplicanttravel.component.css']
})
export class EditapplicanttravelComponent implements OnInit
{
  applicantTravelfrm:FormGroup;
  applicantId:any
  errorMsg;
  indLoading = false;
  countries: any[];
  fileToUpload: File|null;
  CountryId:any;horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  certificateFile: File | null = null; // Allow certificateFile to be nullable
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private applicantservice:ApplicantService,
  private router: Router,
  private countryService: CountryService,
  private route: ActivatedRoute,
  public dialogRef: MatDialogRef<ApplicanttravelComponent>,
  private snackBar: MatSnackBar,
){}

  ngOnInit(): void 
  {
    this.loadCountries();
    this.applicantTravelfrm = this.fb.group({
      applicantCDCId:[0],
      applicantId:[this.data.crewId],
      docType:[''],
      documentNumber:[''],
      documentDetail:[''],
      countryId: ['', [Validators.required]],
      place: ['', [Validators.required]],
      doi: ['', [Validators.required]],
      doe: ['', [Validators.required]],
      filePath: [''],
    });
    this.applicantTravelfrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.applicantTravelfrm.patchValue(this.data.passports);
    this.CountryId = this.data.passports.country.countryId;
    this.applicantTravelfrm.controls.countryId.setValue(this.CountryId);
    }

    formErrors = {
      'passportNumber': '',
      'countryId': ''
    };
    
    validationMessages = {
      'passportNumber': {
        'maxlength': 'Name cannot be more than 50 characters long.',
        'required': 'Name is required.'
      }
    };

 loadCountries(): void {
  this.countryService.GetCountryList(0)
    .subscribe(countries => this.countries = countries);
}
handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);
}

compareTwoDates() {
  if (new Date(this.applicantTravelfrm.controls['doe'].value) < new Date(this.applicantTravelfrm.controls['doi'].value)) {
    this.errorMsg = 'End Date cant before start date';
    return false;
  }
  else {
    this.errorMsg = '';
    return true;
  }
}


onSubmit(form: any) {
  let formData = new FormData();
  if (new Date(this.applicantTravelfrm.controls['doe'].value) < new Date(this.applicantTravelfrm.controls['doi'].value)) {
    this.showMessage('End Date cant before start date.','danger');
      return false;
    }
    else
    {    
  formData.append('data', JSON.stringify(form.value));
 if (this.certificateFile != null) {
   formData.append('file', this.certificateFile, this.certificateFile.name);
 }
 this.applicantservice.updateApplicantTravel(formData).subscribe(
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
      duration: 20000,
      panelClass: type === 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    }); 
  }

  handleCertificateFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
    if (inputElement?.files) {
      const fileList: FileList = inputElement.files; // Get the FileList
      this.certificateFile = fileList.item(0); // Assign the first file from the FileList
    }
  }
  

onValueChanged(data?: any) {
  if (!this.applicantTravelfrm) { return; }
  const form = this.applicantTravelfrm;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
    const control = form.get(field);
    // setup custom validation message to form
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      // tslint:disable-next-line:forin
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

}
