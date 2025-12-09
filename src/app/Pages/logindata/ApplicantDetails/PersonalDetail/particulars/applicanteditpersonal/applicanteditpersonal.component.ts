import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/Services/country.service';
import { ParticularsComponent } from '../particulars.component';
import { ApplicantService } from 'src/app/Services/applicant.service';
@Component({
  selector: 'app-applicanteditpersonal',
  templateUrl: './applicanteditpersonal.component.html',
  styleUrls: ['./applicanteditpersonal.component.css']
})
export class ApplicanteditpersonalComponent implements OnInit
{
  errorMsg: any;
  image: File|null;
  form: FormGroup;
  loadingState = false;
  countries: any[];
  avoidFuture = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private countryService: CountryService,
    private applicantservice: ApplicantService,
    public dialogRef: MatDialogRef<ParticularsComponent>)

{
  this.avoidFuture.setDate(this.avoidFuture.getDate())
}
  ngOnInit(): void 
  {
    this.loadingState = true;
    this.loadCountries(); 
    this.form = this.fb.group({
      applicantId: [''],
      doa: [''], 
      resume: [''],
      remark: [''],
      height: [''],
      weight: [''],
      shoesSize: [''],
      englishFluency: ['', [Validators.required]],    
      boilerSuitSize: [''],
      shirtSize: [''],
      trouserSize: [''],
      hairColor: [''],
      eyeColor: [''],
      distinguishMark: [''],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      placeOfBirth: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      gender: [''],
      email:[''],
      rankId:[''],
      userName:[''],
      password:[''],
      appliedOn:[''],
      applicantStatus:[''],
      userCode:[''],
      mobile:[''],
      mobilePhone:[''],
      nationality:[''],
      lastWage:[''],foodHabit:[''],
      lowerRank:['']
    });

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    if (this.data.crew != null) {
      this.form.patchValue(this.data.crew);
    }
  }
  loadCountries(): void {
    this.countryService.GetCountryList(0).
      subscribe(data => {
        this.countries = data;
      });
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
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
  // custom valdiation messages
  formErrors = {
    'name': '',
    'countryId': ''
  };
  // custom valdiation messages
  validationMessages = {
    'name': {
      'maxlength': 'Name cannot be more than 50 characters long.',
      'required': 'Name is required.'
    },
    // 'countryId': {
    //   'email': 'Invalid email format.',
    //   'required': 'Email is required.'
    // },
  };

  SetControlsState(isEnable: boolean) {
    isEnable ? this.form.enable() : this.form.disable();
  }

  onSubmit(form: any) {
    if(this.calculateAge(this.form.controls.dob.value)<18)
    {
      this.showMessage('Please check DOB,Age is less than 18.','danger');
    }
    else if(this.calculateAge(this.form.controls.dob.value)>80)
    {
      this.showMessage('Please check DOB,Age is greater than 80.','danger');
    }
    else{
    let formData = new FormData();
    formData.append('data', JSON.stringify(form.value));
    // if (this.image != null) {
    //   formData.append('file', this.image, this.image.name);
    // }
    this.applicantservice.updateApplicantPersonalInfo(formData).subscribe(
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
  // handle user image
  userImageFile(file: FileList) {
    this.image = file.item(0);
  }

  //Check age is greater than 18 
  public calculateAge(birthdate: any): number {
    return moment().diff(birthdate, 'years');
  }
    // function to show message on particular action
    showMessage(msg: string,type:string='') {
      this.snackBar.open(msg, '', {
        duration: 1500,
        panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
      });
    }




}
