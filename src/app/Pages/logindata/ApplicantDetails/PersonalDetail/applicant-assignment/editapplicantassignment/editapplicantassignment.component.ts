import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from 'src/app/Services/city.service';
import { CountryService } from 'src/app/Services/country.service';
import { CrewAddressService } from 'src/app/Services/crew-address.service';
import { StateService } from 'src/app/Services/state.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AirportService } from 'src/app/Services/airport.service';
import { debounceTime, finalize, from, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { licenseregisterService } from 'src/app/Services/licenseregister.service';
import { AuthorityService } from 'src/app/Services/authority.service';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { ApplicantAssignmentComponent } from '../applicant-assignment.component';
import { ShiptypeService } from 'src/app/Services/shiptype.service';
import { SeaportService } from 'src/app/Services/seaport.service';
import { RankregisterService } from 'src/app/Services/rankregister.service';
import { SignoffReasonService } from 'src/app/Services/signoff-reason.service';
import { EnginemodelService } from 'src/app/Services/enginemodel.service';
import { ManagerService } from 'src/app/Services/manager.service';


@Component({
  selector: 'app-editapplicantassignment',
  templateUrl: './editapplicantassignment.component.html',
  styleUrls: ['./editapplicantassignment.component.css']
})
export class EditapplicantassignmentComponent implements OnInit {

  errorMsg: any;
  ApplicantAssignmentfrm: FormGroup
  countries: any[];
  countryList: any[];
  rankRegisterList: any[];
  shipTypeList: any[];
  enginemodelList: any[];
  engineMakerlist: any[];
  seaportList: any[];
  signOffReasonList: any[];
  managerList: any[];
  loadingState = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private applicantserice: ApplicantService,
    private applicantservice: ApplicantService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, //SnackBar
    private snackBar: MatSnackBar,
    private countryService: CountryService,
    private shiptypeService: ShiptypeService,
    private seaportService: SeaportService,
    private rankregisterService: RankregisterService,
    private signOffService: SignoffReasonService,
    private enginemodelService: EnginemodelService,
    private managerService: ManagerService,
    public dialogRef: MatDialogRef<ApplicantAssignmentComponent>) { }


  ngOnInit(): void {
    this.loadingState = true;
    this.loadCountries(); // Declare function to load Country data
    this.loadManager(); // Declare function to load managr data
    this.loadRanks(); // Declare function to load ranks data
    this.loadShiptype(); // Declare function to load ship data
    this.loadEngineModel(); // Declare function to load engine data
    this.loadEngineMaker();; // Declare function to load Vessels
    this.loadSignoff();// declare function
    let countryid = this.data.passports.countryId;
    this.LoadPortByCountryId(countryid);

    this.ApplicantAssignmentfrm = this.fb.group({
      assignmentId: [0],
      applicantId: [this.data.ApplicantId],
      companyName: [''],
      rankId: [''],
      signonDate: [''],
      signoffDate: [''],
      vesselName: [''],
      shipId: [''],
      engineModelId: [''],
      engineMakerId: [''],
      model: [''],
      engineType: [''],
      signOffReasonId: [''],
      dwt: [''],
      grt: [''],
      kw: [''],
      propulsion: [''],
      imo: [''],
      countryId: [''],
      seaportId: [''],
      managerId: [''],
      totalDays: [''],
      isDeleted: [''],
      recDate: ['']
    });

    this.ApplicantAssignmentfrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.ApplicantAssignmentfrm.setValue(this.data.passports
    );
  }

  formErrors = {
    'correspondenceTypes': '',
    'accountType': '',
    'beneficiary': '',
    'accountNumber': '',
    'bankName': '',
    'swiftCode': '',
    'bankAddress': '',
    'bankAddress2': '',
    'postcode': '',
    'countryId': '',
    'stateId': '',
    'cityId': '',
    'ifscCode': '',
    'sortCode': ''
  };

  onValueChanged(data?: any) {
    if (!this.ApplicantAssignmentfrm) { return; }
    const form = this.ApplicantAssignmentfrm;
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

  loadCountries() {
    this.countryService.GetCountryList(0)
      .subscribe(data => {
        this.countryList = data;
      });
  }

  // Load ports by country id
  LoadPortByCountryId(countryid: any) {
    this.seaportService.GetPortByCountryId(countryid).subscribe(data => {
      this.seaportList = data;
    });
  }
  // Define Function to load Manager data
  loadManager() {
    this.managerService.GetManagerList(0)
      .subscribe(data => {
        this.managerList = data;
      })
  }
  // Define Function to load ranks data
  loadRanks() {
    this.rankregisterService.GetRankList(0)
      .subscribe(data => {
        this.rankRegisterList = data;
      })
  }
  // Define Function to load ship type data
  loadShiptype() {
    this.shiptypeService.GetShipTypeData(0)
      .subscribe(data => {
        this.shipTypeList = data;
      })
  }
  loadEngineModel() {
    this.enginemodelService.GetEngineModelList(0)
      .subscribe(data => {
        this.enginemodelList = data;
      })
  }

  // Define Function to load engine Maker data
  loadEngineMaker() {
    this.enginemodelService.GetEngineMakerList(0)
      .subscribe(data => {
        this.engineMakerlist = data;
      })
  }

  loadSignoff() {
    this.signOffService.GetSignOffList(0)
      .subscribe(data => {
        this.signOffReasonList = data;
      });
  }

  // Form Submit
  onSubmit(form: any) {
    if (this.compareTwoDates()) {

      let signon = Date.parse(this.ApplicantAssignmentfrm.controls.signonDate.value);
      let signoff = Date.parse(this.ApplicantAssignmentfrm.controls.signoffDate.value);
      let total = signoff - signon; // return milliseconds
      let totalDays = JSON.stringify(parseInt((total / (1000 * 60 * 60 * 24)).toString())); // converts into total days
      this.ApplicantAssignmentfrm.controls.totalDays.setValue(totalDays);
      let formdata = new FormData(); // formdata
      formdata.append('data', JSON.stringify(form.value));
      formdata.append('days', totalDays);

      this.applicantservice.updateApplicantAssignments(formdata).subscribe(
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

  compareTwoDates() {
    if (new Date(this.ApplicantAssignmentfrm.controls['signoffDate'].value) < new Date(this.ApplicantAssignmentfrm.controls['signonDate'].value)) {
      this.errorMsg = 'sign off Date cant be less than sign on date';
      return false;
    }
    else {
      this.errorMsg = '';
      return true;
    }
  }

}
