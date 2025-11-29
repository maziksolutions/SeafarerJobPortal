import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { CountryService } from 'src/app/Services/country.service';
import { QualificationDetailsComponent } from '../qualification-details.component';
import { StateService } from 'src/app/Services/state.service';
import { CityService } from 'src/app/Services/city.service';

@Component({
  selector: 'app-addqualificationdetails',
  templateUrl: './addqualificationdetails.component.html',
  styleUrls: ['./addqualificationdetails.component.css']
})
export class AddqualificationdetailsComponent  implements OnInit
{
  applicantId:any
  errorMsg;
  indLoading = false;
  qualificationfrm: FormGroup;
  countries: any[];
  fileToUpload: File|null;
  certificateFile: File | null = null; // Allow certificateFile to be nullable
  userId: string | null;
  stateList: any[];
  cityList: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private applicantservice:ApplicantService,
  private router: Router,
  private countryService: CountryService,
  private route: ActivatedRoute,
  public dialogRef: MatDialogRef<QualificationDetailsComponent>,
  private snackBar: MatSnackBar,
  private stateService: StateService,
  private cityService: CityService,
){}
  ngOnInit(): void 
  {  
    this.userId=localStorage.getItem('ApplicantId');
    this.loadCountries(); 
    this.qualificationfrm = this.fb.group({
      applicantQualificationId:[0],
      applicantId:[this.data.crewId],
      degreeType:[''],
      class:[''],
      yearOfPassing:[''],
      countryId: [''],
      cityId: [''],
      stateId: [''],
      instituteName: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });debugger
     if (this.data.qualificationDetails != null) {
    this.patchFormWithDependencies(this.data.qualificationDetails);
  } else {
    this.loadStates();
    this.loadCities();
  }
}

patchFormWithDependencies(details: any) {

  this.qualificationfrm.patchValue(details);

  this.stateService.filterStatesByCountryId(details.countryId)
    .subscribe(states => {
      this.stateList = states;

      this.cityService.filterCitiesByStateId(details.stateId)
        .subscribe(cities => {
          this.cityList = cities;

          this.qualificationfrm.patchValue({
            stateId: details.stateId,
            cityId: details.cityId
          });
        });
    });
}

onValueChanged(data?: any) {
    if (!this.qualificationfrm) { return; }
    const form = this.qualificationfrm;
    for (const field in this.formErrors) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = '';
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

    loadCountries(): void {
      this.countryService.GetCountryList(0)
        .subscribe(countries => this.countries = countries);
    }

    compareTwoDates() {
      if (new Date(this.qualificationfrm.controls['to'].value) < new Date(this.qualificationfrm.controls['from'].value)) {
        this.errorMsg = 'End Date cant before start date';
        return false;
      }
      else {
        this.errorMsg = '';
        return true;
      }
    }
     loadCities() {
      this.cityService.filterCitiesByStateId(0)
        .subscribe(data => {
          this.cityList = data;
        })
    }
   
     loadStates() {
      this.stateService.filterStatesByCountryId(0)
        .subscribe(data => {
          this.stateList = data;
        })
    }

 selectedCountry(event: any) {
    this.stateService.filterStatesByCountryId(event.value)
      .subscribe((data) => {debugger
        this.stateList = data;
      });
  }

   selectedState(event: any) {
    this.cityService.filterCitiesByStateId(event.value)
      .subscribe((data) => {debugger
        this.cityList = data;
      });
  }

onSubmit(form: any) {

  let formValues = this.qualificationfrm.value;

  if (new Date(formValues.to) < new Date(formValues.from)) {
    this.showMessage('End Date cant before start date.', 'danger');
    return false;
  }

  if (formValues.applicantQualificationId > 0) {

    formValues.ModifiedBy = localStorage.getItem('userName');

    this.applicantservice
      .updateQualificationDetails(formValues.applicantQualificationId, formValues)
      .subscribe(
        data => {
          if (data.message) {
            this.dialogRef.close('success');
            this.qualificationfrm.reset({});
          } else {
            this.dialogRef.close('error');
          }
        },
        error => (this.errorMsg = error)
      );

  } else {

    this.qualificationfrm.controls['applicantQualificationId'].setValue(0);
    this.qualificationfrm.controls['applicantId'].setValue(this.data.crewId);

    formValues = this.qualificationfrm.value; 

    let formData = new FormData();
    formData.append('data', JSON.stringify(formValues));

    this.applicantservice.AddQualificationDetails(formData).subscribe(
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

  }
