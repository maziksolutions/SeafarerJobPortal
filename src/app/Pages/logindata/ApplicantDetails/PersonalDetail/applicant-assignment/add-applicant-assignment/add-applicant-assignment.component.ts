
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/Services/state.service';
import { debounceTime, finalize, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { CountryService } from 'src/app/Services/country.service';
import { licenseregisterService } from 'src/app/Services/licenseregister.service';
import { AuthorityService } from 'src/app/Services/authority.service';
import { ApplicantAssignmentComponent } from '../applicant-assignment.component';
import { ShiptypeService } from 'src/app/Services/shiptype.service';
import { RankregisterService } from 'src/app/Services/rankregister.service';
import { EnginemodelService } from 'src/app/Services/enginemodel.service';
import { SeaportService } from 'src/app/Services/seaport.service';
import { SignoffReasonService } from 'src/app/Services/signoff-reason.service';
import { ManagerService } from 'src/app/Services/manager.service';

@Component({
  selector: 'app-add-applicant-assignment',
  templateUrl: './add-applicant-assignment.component.html',
  styleUrls: ['./add-applicant-assignment.component.css']
})
export class AddApplicantAssignmentComponent implements OnInit {
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
    this.loadCountries();
    this.loadManager();
    this.loadSignOffReason();
    this.loadRankRegister();
    this.loadShipType();
    this.loadEngineModel();
    this.loadEngineMaker();

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
      dWT: [''],
      gRT: [''],
      kW: [''],
      propulsion: [''],
      iMO: [''],
      countryId: [''],
      seaportId: [''],
      managerId: [''],
      totalDays: [''],
      isDeleted: [''],
      recDate: ['']
    });
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

      this.applicantservice.AddApplicantAssignments(formdata).subscribe(
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

  loadCountries() {
    this.countryService.GetCountryList(0)
      .subscribe(data => {
        this.countryList = data;
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

  loadEngineModel() {
    this.enginemodelService.GetEngineModelList(0)
      .subscribe(data => {
        this.enginemodelList = data
      });
  }

  loadEngineMaker() {
    this.enginemodelService.GetEngineMakerList(0)
      .subscribe(data => {
        this.engineMakerlist = data
        console.log(this.engineMakerlist);
        
      });
  }

  LoadPortByCountryId(countryid: any) {
    this.seaportService.GetPortByCountryId(countryid).subscribe(data => {
      this.seaportList = data;
    });
  }

  loadSignOffReason() {
    this.signOffService.GetSignOffList(0)
      .subscribe(data => {
        this.signOffReasonList = data
      });
  }

  loadManager() {
    this.managerService.GetManagerList(0)
      .subscribe(data => {
        this.managerList = data
      });
  }

}
