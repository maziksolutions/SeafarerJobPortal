import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ReferenceComponent } from '../reference.component';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-addreference',
  templateUrl: './addreference.component.html',
  styleUrls: ['./addreference.component.css']
})
export class AddreferenceComponent {
errorMsg: any;
referencefrm:FormGroup;
countries: any[];
CountryId:any;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,
private fb: FormBuilder,
  private snackBar: MatSnackBar,
  private applicantservice: ApplicantService,
  private countryService: CountryService,
  public dialogRef: MatDialogRef<ReferenceComponent>
){}

ngOnInit(){
 this.referencefrm = this.fb.group({
      referenceId:[0],
      applicantId:[this.data.crewId],
      nameOfCompany: [''],
      personToContact: [''],
      countryId: [''],
      address: [''],
      telephone:[''],
      lastWagesDrawn: [''],
      r2NameOfCompany: [''],
      r2PersonToContact: [''],
      r2CountryId: [''],
      r2Address: [''],
      r2Telephone:[''],
      r2LastWagesDrawn: [''],
    });
     this.loadCountries();
    this.referencefrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.referencefrm.patchValue(this.data.referenceDetails[0]);
      
}
loadCountries(): void {
      this.countryService.GetCountryList(0)
        .subscribe(countries => this.countries = countries);
    }

onSubmit(form: any) {

  let formValues = this.referencefrm.value;

  if (formValues.referenceId > 0) {

    formValues.ModifiedBy = localStorage.getItem('userName');

    this.applicantservice
      .updateReference(formValues.referenceId, formValues)
      .subscribe(
        data => {
          if (data.message) {
            this.dialogRef.close('success');
            this.referencefrm.reset({});
          } else {
            this.dialogRef.close('error');
          }
        },
        error => (this.errorMsg = error)
      );

  } else {

    // this.qualificationfrm.controls['applicantQualificationId'].setValue(0);
    this.referencefrm.controls['applicantId'].setValue(this.data.crewId);

    formValues = this.referencefrm.value; 

    let formData = new FormData();
    formData.append('data', JSON.stringify(formValues));

    this.applicantservice.addReference(formData).subscribe(
      data => {
        this.applicantservice.GetApplicantbyidd(formValues.applicantId);

        if (data.message) {
          this.dialogRef.close('success');
        } else {
          this.dialogRef.close('error');
        }
      },
      error => (this.errorMsg = error)
    );
  }
}
showMessage(msg: string, type: string = '') {
  this.snackBar.open(msg, '', {
    duration: 6000,
    panelClass: type === 'danger' ? ['red-snackbar'] : ['blue-snackbar']
  });
}
onValueChanged(data?: any) {
  if (!this.referencefrm) { return; }
  const form = this.referencefrm;
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
}
