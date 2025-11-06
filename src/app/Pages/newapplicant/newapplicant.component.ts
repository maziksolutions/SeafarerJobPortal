import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CDCService } from 'src/app/Services/cdc.service';
import { CrewAddressService } from 'src/app/Services/crew-address.service';
import { CrewService } from 'src/app/Services/crew.service';
import { LoginComponent } from '../login/login.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/Models/country.model';
import { stateModel } from 'src/app/Models/state.model';
import { CityService } from 'src/app/Services/city.service';
import { StateService } from 'src/app/Services/state.service';
import { cityModel } from 'src/app/Models/city.model';
import { CountryService } from 'src/app/Services/country.service';
import { RankregisterService } from 'src/app/Services/rankregister.service';
import { rankRegisterModel } from 'src/app/Models/rankRegister.model';
import { CheckspaceValidator } from '../../Shared//Checkspace.validator';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { CompressImageService } from 'src/app/Services/compress-image.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError,map, filter } from 'rxjs/operators';
import { generateUsername } from 'unique-username-generator';


@Component({
  selector: 'app-newapplicant',
  templateUrl: './newapplicant.component.html',
  styleUrls: ['./newapplicant.component.css']
})
export class NewapplicantComponent implements OnInit {

  imageSrc: string | ArrayBuffer | null = null;  // Holds the uploaded image source
  avoidFuture = new Date();
  ResumeFile: File | null = null; // Allow certificateFile to be nullable;
  PhotoFile: File | null = null; // Allow certificateFile to be nullable

  uploadPhoto: string = "Choose Image";
  photoName: string = '';

  newapplicantfrm: FormGroup; errorMsg: any;
  countries: Country[]; cities: cityModel[];
  states: stateModel[]; rankList: rankRegisterModel[];
  Message: any; form!: FormGroup;
  filteredUsers!: Observable<any>;
suggestions: string[] = [];
isUsernameAvailable: boolean | null = null;
// isUsernameAvailable: boolean | null = null;
usernameMessage: string = '';
// suggestions: string[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private cdcService: CDCService,
    private snackBar: MatSnackBar,
    private applicantservice: ApplicantService,
    private crewAddressService: CrewAddressService,
    private cityService: CityService,
    private stateService: StateService,
    private fb: FormBuilder,
    private rankregisterService: RankregisterService,
    private compressImage: CompressImageService,
    private countryService: CountryService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) { this.avoidFuture.setDate(this.avoidFuture.getDate()) }

  ngOnInit() {debugger
    this.loadCountries(); // Declare function to load countries
    this.loadRanks();
    this.newapplicantfrm = this.fb.group({
      userName: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(20)]],
      firstName: ['',],
      middleName: [''],
      lastName: [''],
      dob: [''],
      gender: [''],
      countryId: [''],
      rankId: [''],
      photo: [''],
      cDC: [''],
      placeOfBirth: [''],
      doi: [''],
      doe: [''],
      residentialPhone: [''],
      mobileNumber: [''],
      email: [''],
      area: [''],
      street: [''],
      postCode: [''],
      stateId: [''],
      cityId: [''],
      resume: [''],

    });
    this.filteredUsers = this.newapplicantfrm.get('userName')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // filter(value => value && value.trim().length >= 4),
      switchMap(value => {
        if (!value || value.trim().length < 4) {
          this.suggestions = [];
          this.usernameMessage = '';
          this.isUsernameAvailable = true;
          return of(null);
        }
        const suggestions = this.generateSuggestions(value);

        return this.applicantservice.checkUsernameAvailability(value).pipe(
          map(response => ({
            value,
            available: response.available,
            message: response.message,
            suggestions
          }))
        );
      })
    );

    this.filteredUsers.subscribe(result => {
      this.isUsernameAvailable = result.available;
      this.usernameMessage = result.message;
      this.suggestions = result.suggestions;
    });

    this.newapplicantfrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.newapplicantfrm.reset();
  }

  generateSuggestions(baseName: string): string[] {
    if (!baseName || baseName.trim().length < 3) {
      return [];
    }

  const cleanBase = baseName.trim().toLowerCase();
  const suggestions: Set<string> = new Set();

  while (suggestions.size < 5) {
    const randomNum = Math.floor(10 + Math.random() * 990); 

    const randomStr = Math.random().toString(36).substring(2, 4); 

    const patterns = [
      `${cleanBase}${randomNum}`,
      `${cleanBase}_${randomStr}`,
      `${cleanBase}.${randomNum}`,
      `${cleanBase}${randomStr}${randomNum}`,
      `${cleanBase}_${randomNum}${randomStr}`
    ];

    const userName = patterns[Math.floor(Math.random() * patterns.length)];
    suggestions.add(userName);
  }

  return Array.from(suggestions);
}

  selectedUser(event: any) {debugger
    console.log('Selected username:', event.option.value);
  }
  onSubmit(form: any) {debugger
    if (form.invalid) {
      return;
    }
    /*check Age is less than 18 or not*/
    if (this.calculateAge(this.newapplicantfrm.controls.dob.value) < 18) {
      this.showMessage('Please check DOB,Age is less than 18.', 'danger');
    }
    else if (this.calculateAge(this.newapplicantfrm.controls.dob.value) > 80) {
      this.showMessage('Please check DOB,Age is greater than 80.', 'danger');
    }
     else if (this.isUsernameAvailable === false) {
    this.showMessage('This username already exists. Please choose another one.', 'danger');
    return;
  }
    else if (this.ResumeFile == null) {
      this.showMessage('Please attach resume. Its mandatory', 'danger');
    }
    else if (this.compareTwoDates()) {
      this.cdcService.checkCDCApplicant(this.newapplicantfrm.controls['cDC'].value)
        .subscribe((data) => {
          if (data.message == "CrewCdcNumberexit") {
            this.showMessage('Please provide an alternative CDC number, as its alreday Used by Crew Member.', 'danger');
          }
          else if (data.message == "ApplicantCdcNumberexit") {
            this.showMessage('Please provide an alternative CDC number, as its alreday Used by Another Applicant.', 'danger');
          }
          else {
            this.crewAddressService.CheckApplicantEmail(this.newapplicantfrm.controls['email'].value)
              .subscribe((x) => {
                if (x.message == "CrewEmailexit") {
                  this.showMessage('Please provide an alternative Email, as its alreday Used by Crew Member', 'danger');
                }
                else if (x.message == "ApplicantEmailexit") {
                  this.showMessage('Please provide an alternative Email, as its alreday Used by Email Member', 'danger');
                }
                if (x.message == "ApplicantEmailCreate") {
                  let formData = new FormData();
                  formData.append('data', JSON.stringify(form.value));
                  if (this.ResumeFile != null) {
                    formData.append('Resume', this.ResumeFile, this.ResumeFile.name);
                  }

                  if (this.PhotoFile != null) {
                    formData.append('photo', this.PhotoFile, this.PhotoFile.name);
                  }
                  this.applicantservice.addApplicant(formData).subscribe(
                    data => {
                      if (data.message) {
                        this.dialogRef.close('success');
                      }
                      else {
                        this.dialogRef.close('error');
                      }
                    },
                    error => {
                      // this.errorMsg = error;
                      this.errorMsg = "Error while adding applicant data. Please check with administrator.";
                    });
                }
              });
          }
        });
    }
  }

  // handlePhotoFile(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
  //   if (inputElement?.files) {
  //     const fileList: FileList = inputElement.files; // Get the FileList
  //     this.PhotoFile = fileList.item(0); // Assign the first file from the FileList
  //   }
  // }

  // handlePhotoFile(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.compressImage.compress(file)
  //       .pipe().subscribe(compressedImage => {
  //         this.PhotoFile = compressedImage;
  //         this.PhotoFile = file.name;
  //         this.newapplicantfrm.controls.photo.setValue(file.name);
  //         this.PhotoFile = file.name;
  //         // now you can do upload the compressed image 
  //       })
  //   }
  //   else {
  //     this.PhotoFile = "Choose User Photo";
  //   }
  // }

  onPhotoSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.compressImage.compress(file)
        .pipe().subscribe(compressedImage => {
          this.PhotoFile = compressedImage;
          this.photoName = file.name;
          this.newapplicantfrm.controls.photo.setValue(file.name);
          this.uploadPhoto = file.name;
          // now you can do upload the compressed image 
        })
    }
    else {
      this.uploadPhoto = "Choose User Photo";
    }
  }

  handleResumeFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
    if (inputElement?.files) {
      const fileList: FileList = inputElement.files; // Get the FileList
      this.ResumeFile = fileList.item(0); // Assign the first file from the FileList
    }
  }

  compareTwoDates() {
    if (new Date(this.newapplicantfrm.controls['doe'].value) < new Date(this.newapplicantfrm.controls['doi'].value)) {
      this.errorMsg = 'CDC Expiry date cannot be less than issue date.';
      this.showMessage('CDC Expiry date cannot be less than issue date.', 'danger');
      return false;
    }
    else {
      this.errorMsg = '';
      return true;
    }
  }
  //Check age is greater than 18 
  public calculateAge(birthdate: any): number {
    return moment().diff(birthdate, 'years');
  }
  showMessage(msg: string, type: string = '') {
    this.snackBar.open(msg, '', {
      duration: 2000,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }

  selectedCountry(event: any) {
    this.stateService.filterStatesByCountryId(event.value)
      .subscribe((data) => {
        this.states = data;
      })
    // this.states = this.filterState.filter(s => s.countryId == event.value);
  }

  //Filter cities according to states
  selectedState(event: any) {
    this.cityService.filterCitiesByStateId(event.value)
      .subscribe((data) => {
        this.cities = data;
      })
    // this.cities = this.filterCities.filter(c => c.stateId == event.value);
  }

  loadCountries(): void {
    this.countryService.GetCountryList(0).
      subscribe(countries => this.countries = countries);
  }

  // Define function to load ranks
  loadRanks(): void {
    this.rankregisterService.GetRankList(0).
      subscribe(data => {
        this.rankList = data;
      });
  }

  onValueChanged(data?: any) {
    if (!this.newapplicantfrm) { return; }
    const form = this.newapplicantfrm;
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
    'name': '',
    'countryId': ''
  };

  // custom valdiation messages
  validationMessages = {
    'name': {
      'maxlength': 'Name cannot be more than 50 characters long.',
      'required': 'Name is required.'
    },
    'countryId': {
      'email': 'Invalid email format.',
      'required': 'Email is required.'
    },
  };
}
