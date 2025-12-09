import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/Services/country.service';
import { ParticularsComponent } from '../particulars.component';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { RankregisterService } from 'src/app/Services/rankregister.service';

@Component({
  selector: 'app-applicantedit-physical-info',
  templateUrl: './applicantedit-physical-info.component.html',
  styleUrls: ['./applicantedit-physical-info.component.css']
})
export class ApplicanteditPhysicalInfoComponent implements OnInit
{
  errorMsg: any;
  image: File|null;
  form: FormGroup;
  loadingState = false;
  heights: number[] = []; // Declare heights as an array of numbers
  weights : number[]= []; // Create an empty array to fill value of weights
  // heights:any[];
  // weights:any[];
religionData:any[];
constructor(@Inject(MAT_DIALOG_DATA) public data: any,
private fb: FormBuilder,
  private snackBar: MatSnackBar,
  private applicantservice: ApplicantService,
  private rankregisterservice: RankregisterService,
  public dialogRef: MatDialogRef<ParticularsComponent>){}
ngOnInit(): void 
{
  this.loadingState = true;
    // Create loop for generate heights
    for (var i = 140; i <= 240; i++) {
      this.heights.push(i); 
      // push height value into height array one by one
    }
    // Create loop for generate wights
    for (var j = 40; j <= 140; j++) {
      this.weights.push(j); // push weight value into weight array one by one
    }

    this.form = this.fb.group({
      applicantId: [""],
      doa: [""], 
      resume: [""],
      remark: [""],
      height: [""],
      weight: [""],
      shoesSize: [""],
      englishFluency: [""],    
      boilerSuitSize: [""],
      shirtSize: [""],
      trouserSize: [""],
      hairColor: [""],
      eyeColor: [""],
      distinguishMark: [""],
      firstName: [""],
      middleName: [""],
      lastName: [""],
      dob: [""],
      placeOfBirth: [""],
      civilStatus: [""],
      countryId: [""],
      gender: [""],
      email:[""],
      rankId:[""],
      userName:[""],
      password:[""],
      appliedOn:[""],
      applicantStatus:[""],
      userCode:[""],
      mobile:[""],
      mobilePhone:[""],
      nationality:[""],
      lastWage:[''],foodHabit:[''],
      lowerRank:[''],
      religionId:[''],
      religionName:['']
    });
this.LoadReligion(0); 
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
 
};
// Form Sumit

onSubmit(form: any) {
  let formData = new FormData();
  formData.append('data', JSON.stringify(form.value));
  // if (this.image != null) {
  //   formData.append('file', this.image, this.image.name);
  // }
  this.applicantservice.updatePhysicalInfo(formData).subscribe(
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

SetControlsState(isEnable: boolean) {
  isEnable ? this.form.enable() : this.form.disable();
}
LoadReligion(status: number): void {
  this.rankregisterservice.GetReligionList(status)
    .subscribe(data => {
      this.religionData = data.map(r => ({
        ...r,
        religionId: Number(r.religionId)
      }));

      if (this.data.crew != null) {
        this.form.patchValue({
          ...this.data.crew,
          religionId: Number(this.data.crew.religionId)
        });
      }
    });
}


}
