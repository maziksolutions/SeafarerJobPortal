import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
//import { first } from 'rxjs/internal/operators/first';
import { ApplyAccessRightsService } from 'src/app/Services/apply-access-rights.service';
import { CountryService } from 'src/app/Services/country.service';
import { CityService } from 'src/app/Services/city.service';
import { StateService } from 'src/app/Services/state.service';
import { Country } from 'src/app/Models/country.model';
import { stateModel } from 'src/app/Models/state.model';
import { cityModel } from 'src/app/Models/city.model';
import { NewapplicantComponent } from '../newapplicant/newapplicant.component';
import { ForgotPasswordComponent } from 'src/app/Layout/forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any; 
  loading = false;
  submitted = false;
  returnUrl: string; modalTitle: string;modalBtnTitle: string;loadingState: boolean; 
  country: Country[];
  states: stateModel[];
  cities: cityModel[];
  opNationalities = <any>[];
  UserType:any;
  captchaResolved = false;
  captchaToken: string | null = null;

  constructor(
    private router: Router, private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private _applyAccessRightsService: ApplyAccessRightsService,
    public dialog: MatDialog) { }

    ngOnInit()  
    {     
    document.body.classList.add('login-background');
      this.loginForm = this.formBuilder.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
      
    }
    ngOnDestroy() {
    document.body.classList.remove('login-background');
  }
    get returnFormControl() {
      return this.loginForm.controls;
    }

    login() {
      var userName = this.returnFormControl.userName.value;
      var password = this.returnFormControl.password.value;
      if (userName === '' && password === '' || userName === null && password === null) {
        //alert('Please Enter Username and Password ');
        this.showMessage('Please Enter Username and Password ', 'danger');
      } else if (userName === '' && password !== null || userName === null && password !== '') {
        //alert('Please Enter Username ');
        this.showMessage('Please Enter Username', 'danger');
      } else if (userName !== null && password === '' || userName !== '' && password === null) {
        //alert('Please Enter Password');
        this.showMessage('Please Enter Password', 'danger');
      }
      // else if (!this.captchaResolved || !this.captchaToken) {
      //   //alert('Please Enter Password');
      //   this.showMessage('Please complete the captcha verification', 'danger');
      // }
      else {
        this.userservice.ApplicantLogin(this.returnFormControl.userName.value, this.returnFormControl.password.value)
          .pipe()
          .subscribe((data: any) => {
            
           this.UserType=data.userType
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('RankId', data.rankId);
            localStorage.setItem('ApplicantId', data.applicantId);
            localStorage.setItem('UserType', data.userType);
            const body = document.getElementsByTagName('body')[0];  
            body.classList.remove('bg-full-screen-image');
                 if(this.UserType=='User')
                 {
                    this.router.navigate(['/logindata/ApplicantList']);
                  }
                 else
                  { 
                  this.router.navigate(['/logindata/ApplicantDetails', data.applicantId]);
                 }
                  },
              error => {
              this.showMessage('Username & Password not match OR not found.', 'danger');
              this.returnFormControl.password.reset();
            });
      }
    }

    showMessage(msg: string, type: string = '') {
      this.snackBar.open(msg, '', {
        duration: 1500,
        panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
      });
    }
    //#region  sinup code

    showMessageApplicant(msg: string, type: string = '') {
      this.snackBar.open(msg, '', {
        duration: 2000,
        panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
      });
    }

    addApplicant() {
      this.modalTitle = 'Register Applicant';
      this.modalBtnTitle = 'Save';
      this.openAddDialog();
    }
    openAddDialog(): void {
      const dialogRef = this.dialog.open(NewapplicantComponent, {
        width: '90vw',
        height: '98vh',
        data: { modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle },
        position: { left: '10vw' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loadingState = true;
          this.showMessageApplicant('The applicant has successfully registered. Please check your email ID and password for further steps and to add additional details.');
``
         // this.loadFilteredApplicant(null, 'Yet To Evaluate', null, null, null, null, null)
        }
      });
    }
    openForgotPassword() {
   this.dialog.open(ForgotPasswordComponent, {
    width: '600px',
    height:'300px',
    disableClose: true
  });
}

    loadCountries() {
      this.countryService.GetCountryList(0)
        .subscribe((data) => {
          this.country = data.filter(data => (this.opNationalities.includes(data.countryId.toString())));
          ;
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
      
    //#endregion
    //#region capcha

    // handleCaptchaSuccess(token: string) {
    //   this.captchaResolved = true;
    //   this.captchaToken = token;
    // }
    //#endregion

}
