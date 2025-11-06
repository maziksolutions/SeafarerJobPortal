import { Component, Inject, OnInit,ViewEncapsulation  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicanttravelComponent } from '../applicanttravel.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/Services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-addapplicanttravel',
  templateUrl: './addapplicanttravel.component.html',
  styleUrls: ['./addapplicanttravel.component.css'],
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation
})
export class AddapplicanttravelComponent implements OnInit
{
  applicantId:any
  errorMsg;
  indLoading = false;
  applicantTravelfrm: FormGroup;
  countries: any[];
  fileToUpload: File|null;
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
    this.loadCountries(); // Declare function to load Country data
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
    formData.append('data', JSON.stringify(form.value));
    if (new Date(this.applicantTravelfrm.controls['doe'].value) < new Date(this.applicantTravelfrm.controls['doi'].value)) {
    this.showMessage('End Date cant before start date.','danger');
      return false;
    }
    else
    {
      if (this.certificateFile != null) {
        formData.append('file', this.certificateFile, this.certificateFile.name);
      }

      this.applicantservice.AddApplicantTravel(formData).subscribe(
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

handleCertificateFile(event: Event): void {
  const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
  if (inputElement?.files) {
    const fileList: FileList = inputElement.files; // Get the FileList
    this.certificateFile = fileList.item(0); // Assign the first file from the FileList
  }
}

    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);
    }

}
