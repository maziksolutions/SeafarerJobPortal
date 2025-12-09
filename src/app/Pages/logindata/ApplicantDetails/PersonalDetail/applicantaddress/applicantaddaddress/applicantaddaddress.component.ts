import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/Services/country.service';
import { ApplicantaddressComponent } from '../applicantaddress.component';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/Services/state.service';
import { CityService } from 'src/app/Services/city.service';
import { debounceTime, finalize, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stateModel } from 'src/app/Models/state.model';
import { cityModel } from 'src/app/Models/city.model';
@Component({
  selector: 'app-applicantaddaddress',
  templateUrl: './applicantaddaddress.component.html',
  styleUrls: ['./applicantaddaddress.component.css']
})
export class ApplicantaddaddressComponent implements OnInit

{
  countryList: any[]; // Country Model
  stateList: any[];// state Model
  stateData: any[];// state Model
  cityData: any[];// state Model
  countryData: any[];// state Model
  filterState: any[];// Filter State Model
  cityList: any[];// City Model
  filterCity: any[];// filter City Model
  crewaddressfrm: FormGroup;
  airportList: any[];
  isLoading = false;
  residential = 'Residential Phone';
  mobile = 'Mobile Number';
  errorMsg: any;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,
private fb: FormBuilder,
  private snackBar: MatSnackBar,
  private applicantservice: ApplicantService,
  private countryService: CountryService,private http: HttpClient,
  private stateService: StateService,
  private cityService: CityService,
  public dialogRef: MatDialogRef<ApplicantaddressComponent>){}

  ngOnInit(): void 
  {
    
    this.loadCountries(); 
    this.crewaddressfrm = this.fb.group({
      applicantId:[''],
      countryId: [''],
      stateId: [''],
      cityId: [''],
      address: [''],
      email:[''],
      postcode: [''],
      countryCode: [''],          
      stateCode: [''],
      phoneNumber: [''],
      mobileCode: [''],
      mobileNumber: [''],
      otherMobileCode: [''],
      otherMobileNumber: [''],
      airportId: [''],
      ccountryId: [''],
      cstateId: [''],
      ccityId: [''],
      caddress: [''],
      cpostcode: [''],
    });
 
    this.crewaddressfrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.crewaddressfrm.reset();
    this.fillAirport();  
  }

  
  getAirPorts(airport) {
    this.crewaddressfrm.controls.airportId.setValue(airport);
  }
  displayFn(airportid: number): string {
    if (airportid)
      return this.airportList.filter(v => v.cityId === airportid)[0].cityName;
    else
      return '';
  }

  loadCountries() {
    this.countryService.GetCountryList(0)
      .subscribe(data => {
        this.countryList = data;
        this.countryData = data;
      });
  }
  onValueChanged(data?: any) {
    if (!this.crewaddressfrm) { return; }
    const form = this.crewaddressfrm;
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
sameAddress(event: any) {
  const isChecked = event.target.checked;

  if (isChecked) {
    const perm = {
      address: this.crewaddressfrm.controls.address.value,
      postcode: this.crewaddressfrm.controls.postcode.value,
      countryId: this.crewaddressfrm.controls.countryId.value,
      stateId: this.crewaddressfrm.controls.stateId.value,
      cityId: this.crewaddressfrm.controls.cityId.value
    };

    this.crewaddressfrm.controls['ccountryId'].setValue(perm.countryId);

    this.stateService.filterStatesByCountryId(perm.countryId).subscribe(states => {
      this.stateData = states;

      this.crewaddressfrm.controls['cstateId'].setValue(perm.stateId);

      this.cityService.filterCitiesByStateId(perm.stateId).subscribe(cities => {
        this.cityData = cities;

        this.crewaddressfrm.controls['ccityId'].setValue(perm.cityId);

        this.crewaddressfrm.patchValue({
          caddress: perm.address,
          cpostcode: perm.postcode
        });
      });
    });

  } else {
    this.crewaddressfrm.patchValue({
      caddress: '',
      cpostcode: '',
      ccountryId: '',
      cstateId: '',
      ccityId: ''
    });
    this.stateData = [];
    this.cityData = [];
  }
}

   showMessage(msg: string,type:string='') {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
    });
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

  fillAirport() {
    this.crewaddressfrm.controls.airportId.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.airportList = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(environment.apiurl + "city/searchCity?search=" + value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data == undefined) {
          this.airportList = [];
        } else {
          this.airportList = data;
        }
      });
  }
   // Function to filter state based on country selection 
   selectedCountry(event: any) {
    this.stateService.filterStatesByCountryId(event.value)
      .subscribe((data) => {
        this.stateList = data;
      });
  }
  // Function to filter city based on state selection 
  selectedState(event: any) {
    this.cityService.filterCitiesByStateId(event.value)
      .subscribe((data) => {
        this.cityList = data;
      });
  }

selectedCurrentCountry(event: any) {
  this.stateService.filterStatesByCountryId(event.value)
    .subscribe((data) => {
      this.stateData = data;   
    });
}

selectedCurrentState(event: any) {
  this.cityService.filterCitiesByStateId(event.value)
    .subscribe((data) => {
      this.cityData = data;    
    });
}

  SetControlsState(isEnable: boolean) {
    isEnable ? this.crewaddressfrm.enable() : this.crewaddressfrm.disable();
  }
    // Form Submit
    onSubmit(form: any) {

      
      this.applicantservice.addApplicantAddress(form.value,this.data.applicantId)
        .subscribe(
          data => {
            // this.crewAddressService.getCrewAddress(0);
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.errorMsg = error;
          });
    }
}
