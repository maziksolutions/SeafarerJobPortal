import { Component, OnInit ,Inject, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/Services/country.service';
import { ParticularsComponent } from '../particulars.component';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { RankregisterService } from 'src/app/Services/rankregister.service';
import { ShiptypeService } from 'src/app/Services/shiptype.service';
import { CompressImageService } from 'src/app/Services/compress-image.service';
@Component({
  selector: 'app-applicanteditpersonal',
  templateUrl: './applicanteditpersonal.component.html',
  styleUrls: ['./applicanteditpersonal.component.css']
})
export class ApplicanteditpersonalComponent implements OnInit
{
  errorMsg: any;
  image: File|null;
  PhotoFile: File | null = null; 
  uploadPhoto: string = "Choose Image";
  photoName: string = '';
  SignatureFile: File | null = null; 
  uploadSignature: string = "Choose Image";
  SignatureName: string = '';
  form: FormGroup;
  loadingState = false;
  countries: any[];
  avoidFuture = new Date();
  rankRegisterList: any[];
  shipTypeList: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private countryService: CountryService,
    private applicantservice: ApplicantService,
    private shiptypeService: ShiptypeService,
    private rankregisterService: RankregisterService,
    private compressImage: CompressImageService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ParticularsComponent>)

{
  this.avoidFuture.setDate(this.avoidFuture.getDate())
}
  ngOnInit(): void 
  {
    this.loadingState = true;
    this.loadCountries(); 
    this.loadRankRegister();
    this.loadShipType();
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
      lastName: [''],
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
      lowerRank:[''],
      dor:[''],
      lastRank:[''],
      lastShipType:[''],
      signature: [false, Validators.requiredTrue],
      photo: [false, Validators.requiredTrue]
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
    loadRankRegister(): void {
    this.rankregisterService.GetRankList(0).subscribe(data => {
      this.rankRegisterList = data
    });
  }

  loadShipType() {
    this.shiptypeService.GetShipTypeData(0)
      .subscribe(data => {
        this.shipTypeList = data
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
    if (this.SignatureFile != null) {
      formData.append('signature', this.SignatureFile, this.SignatureFile.name);
    }
      if (this.PhotoFile != null) {
     formData.append('photo', this.PhotoFile, this.PhotoFile.name);
    }
    this.applicantservice.updateApplicantPersonalInfo(formData).subscribe(
      data => {
        this.applicantservice.GetApplicantbyidd(form.value.applicantId);
        if (data.message) {
          this.dialogRef.close('success');
        }
        else {
          this.dialogRef.close('error');
        }
         setTimeout(() => {
              window.location.reload();
            }, 1000);
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
//  onSignatureSelect(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//         if (file.size > 500 * 1024) {
//       this.showMessage('Signature size cannot be greater than 500 KB.', 'danger');
//       event.target.value = '';
//       this.uploadPhoto = "Choose User Signature";
//       return;
//     }
//       this.compressImage.compress(file)
//         .pipe().subscribe(compressedImage => {
//           this.SignatureFile = compressedImage;
//           this.SignatureName = file.name;
//           this.form.controls.signature.setValue(file.name);
//           this.uploadSignature = file.name;
//           // now you can do upload the compressed image 
//         })
//     }
//     else {
//       this.uploadSignature = "Choose User Signature";
//     }
//   }

onSignatureSelect(event: any) {
  const control = this.form.get('signature');

  if (event.target.files?.length) {
    const file = event.target.files[0];

    if (file.size > 500 * 1024) {
      this.showMessage('Signature size cannot be greater than 500 KB.', 'danger');
      event.target.value = '';
      control?.setValue(false);
      control?.markAsTouched();
      return;
    }

    this.compressImage.compress(file).subscribe(compressed => {
      this.SignatureFile = compressed;
      this.uploadSignature = file.name;
      control?.setValue(true);
      control?.markAsTouched();
     this.cdr.detectChanges();
    });
  } else {
    control?.setValue(false);
    control?.markAsTouched();
  }
}


//  onPhotoSelect(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
       
//       this.compressImage.compress(file)
//         .pipe().subscribe(compressedImage => {
//           this.PhotoFile = compressedImage;
//           this.photoName = file.name;
//           this.form.controls.photo.setValue(file.name);
//           this.uploadPhoto = file.name;
//           // now you can do upload the compressed image 
//         })
//     }
//     else {
//       this.uploadPhoto = "Choose User Photo";
//     }
//   }

onPhotoSelect(event: any) {
  const control = this.form.get('photo');

  if (event.target.files?.length) {
    const file = event.target.files[0];

    this.compressImage.compress(file).subscribe(compressed => {
      this.PhotoFile = compressed;
      this.uploadPhoto = file.name;
      control?.setValue(true);
      control?.markAsTouched();
     this.cdr.detectChanges();
    });
  } else {
    control?.setValue(false);
    control?.markAsTouched();
  }
}



}
