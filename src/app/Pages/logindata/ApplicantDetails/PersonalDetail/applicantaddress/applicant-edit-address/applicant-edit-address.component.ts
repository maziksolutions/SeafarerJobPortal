import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from 'src/app/Services/city.service';
import { CountryService } from 'src/app/Services/country.service';
import { CrewAddressService } from 'src/app/Services/crew-address.service';
import { StateService } from 'src/app/Services/state.service';
import { ApplicantaddressComponent } from '../applicantaddress.component';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AirportService } from 'src/app/Services/airport.service';
import { debounceTime, finalize, from, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicantService } from 'src/app/Services/applicant.service';
@Component({
  selector: 'app-applicant-edit-address',
  templateUrl: './applicant-edit-address.component.html',
  styleUrls: ['./applicant-edit-address.component.css']
})
export class ApplicantEditAddressComponent implements OnInit
{
  communication = 'Communication';
  residential = 'Residential Phone';
  mobile = 'Mobile Number';
  indLoading = false;
  crewaddressfrm: FormGroup;

countryList: any[];
stateList: any[];
filterState: any[];
cityList: any[];
filterCity: any[];
airportList: any[];
filterAirport: any[];
errorMsg: any;
airportLists: any[];
selectedAirport:string;
isLoading = false;
seletedstatedid:any;
seletedcityId:any;
seletedcountryId:any;
CountryId:any;
StateId:any;
seletedairportId:any;userId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private crewAddressService: CrewAddressService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
      private applicantservice: ApplicantService,
     private airportService: AirportService,
    public dialogRef: MatDialogRef<ApplicantaddressComponent>,
    private http: HttpClient) { }
  ngOnInit(): void 
  {
    this.userId=localStorage.getItem('ApplicantId');
    this.loadAirports(); // Declare function to load Airport data
    
    this.crewaddressfrm = this.fb.group({
      applicantAddressId:[''],
      applicantId:[''],
      countryId: [''],
      stateId: [''],
      cityId: [''],
      address: [''],
      postcode: [''],
      countryCode: [''],          
      stateCode: [''],
      phoneNumber: [''],
      mobileCode: [''],
      mobileNumber: [''],
      otherMobileCode: [''],
      otherMobileNumber: [''],
      airportId: [''],
      modifiedBy:[''],
      modifiedDate:[''],
      isDeleted:[''],
      recDate:[''],
      createdBy:[this.userId],
      // country:[''],
      // state:[''],
      // city:[''],
      airport:[''],
      applicant:[''],
      cityName:['']
    });
    this.crewaddressfrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.crewaddressfrm.patchValue(this.data.crew[0]);  
    this.selectedAirport=this.data.crew[0].airport?this.data.crew[0].airport.cityName:'';
    this.fillAirport();

      this.seletedcountryId=this.data.crew[0].countryId;
      this.CountryId = this.data.crew[0].country.countryId;
      this.StateId = this.data.crew[0].state.stateId;
      this.crewaddressfrm.controls.countryId.setValue(this.CountryId);
      this.crewaddressfrm.controls.stateId.setValue(this.StateId);
      this.loadStates(); 
      this.loadCities(); 
      this.loadCountries(); 
        
}
  getAirPorts(airport) {
    this.crewaddressfrm.controls.airportId.setValue(airport);
  }   

  displayFn(airportid: number): string {
    if (airportid)    
      return this.airportLists? this.airportLists.filter(v => v.cityId === airportid)[0].cityName:this.selectedAirport;
    else
      return '';
  }

    // Define Function to load Country data
    loadCountries() {
      this.countryService.GetCountryList(this.CountryId)
        .subscribe(data => {
          this.countryList = data;         
        });
    }

    // Define Function to load State data
    loadStates() {
      this.stateService.filterStatesByCountryId(this.CountryId)
        .subscribe(data => {
          this.stateList = data;
          console.log(this.stateList)
        })
    }

    // Define Function to load City data
    loadCities() {
      this.cityService.filterCitiesByStateId(this.StateId)
        .subscribe(data => {
          this.cityList = data;
        })
    }

    // Define Function to load Airport data
    loadAirports() {
      this.airportService.GetAirportList(0)
        .subscribe(data => {
          this.airportList = data;
          this.filterAirport = data;
        })
    }

    onValueChanged(data?: any) {
  
      if (!this.crewaddressfrm) { return; }
      const form = this.crewaddressfrm;
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
      'address1': '',
      'address2': '',
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

    validationMessages = {
      // 'name': {
      //   'maxlength': 'Name cannot be more than 50 characters long.',
      //   'required': 'Name is required.'
      // },
      // 'countryId': {
      //   'email': 'Invalid email format.',
      //   'required': 'Email is required.'
      // },
    };

    changeCountry(countryId) {
      this.stateService.filterStatesByCountryId(countryId)
        .subscribe(data => {
          this.stateList = data;
        })
    }
    // Function to filter city based on state selection 
    changeState(stateId) {
      this.cityService.filterCitiesByStateId(stateId)
        .subscribe(data => {
          this.cityList = data;
        })
    }

    onSubmit(form: any) {
      let formData = new FormData();
      formData.append('data', JSON.stringify(form.value));
      this.applicantservice.updateApplicantaddress(formData).subscribe(
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

fillAirport() {
  this.crewaddressfrm.controls.airportId.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.airportLists = [];
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
        this.airportLists = [];
      } else {
        this.airportLists = data;
      }
    });
}

}