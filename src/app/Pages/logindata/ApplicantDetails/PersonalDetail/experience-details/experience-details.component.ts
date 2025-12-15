import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from 'src/app/Services/applicant.service';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.css']
})
export class ExperienceDetailsComponent {
  experiencefrm: FormGroup;
  applicantId: any;
  errorMsg: any;
  referenceData: any;
  isReferenceExist: boolean = false;
  status: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
     private snackBar: MatSnackBar,
    private applicantservice: ApplicantService,
  ) { }

  ngOnInit() {
    this.applicantId = this.route.snapshot.paramMap.get('id');
    this.experiencefrm = this.fb.group({
      experienceId: [0],
      applicantId: [this.applicantId],
      cargoesCarried: [''],
      tradingPattern: [''],
      experienceDeckCargo: [''],
      experienceOnGrabs: [''],
      experienceOnPumpsTankers: [''],
      experienceOnPMS: [''],
      signedOffShip: [''],
      operationInThePast: [''],
      consultedDoctor: [''],
      disabilityProblem: [''],
      medicalHistoryDetails: [{ value: '', disabled: true }],
      maritimeAccident: [''],
      licenseSuspendedRevoked: [''],
      generalDetails: [''],
      courtOfEnquiry: [''],
      deniedForeignVisa: [''],
      workedOnUMSvessels: [''],
      sireCdi: [''],
      uscgInspection: [''],
      dryDockexperience: [''],
      shipyardeXperience: [''],
      workedOnCPPvessel: [''],
      twinpropellervessel: [''],
      addictedToDrug: [''],
      sufferedFromDiabetes: [''],
      sufferedFromEpilepsy: [''],
      anykindOfMedication: [''],
      cowExpereince: [''],
      cargoPumpsExperience: [''],
    });
    this.loadExperience(0);
    this.setupMedicalHistoryLogic();
  }
  setupMedicalHistoryLogic() {
  this.experiencefrm.get('signedOffShip')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
  this.experiencefrm.get('operationInThePast')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
  this.experiencefrm.get('consultedDoctor')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
  this.experiencefrm.get('disabilityProblem')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
  this.experiencefrm.get('anykindOfMedication')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
   this.experiencefrm.get('sufferedFromEpilepsy')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
   this.experiencefrm.get('sufferedFromDiabetes')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });
   this.experiencefrm.get('addictedToDrug')?.valueChanges.subscribe(() => {
    this.toggleMedicalHistory();
  });

   this.experiencefrm.get('maritimeAccident')?.valueChanges.subscribe(() => {
    this.toggleGeneralDetails();
  });
   this.experiencefrm.get('licenseSuspendedRevoked')?.valueChanges.subscribe(() => {
    this.toggleGeneralDetails();
  });
   this.experiencefrm.get('courtOfEnquiry')?.valueChanges.subscribe(() => {
    this.toggleGeneralDetails();
  });
   this.experiencefrm.get('deniedForeignVisa')?.valueChanges.subscribe(() => {
    this.toggleGeneralDetails();
  });
}

toggleMedicalHistory() {
  const medicalYes =
    this.experiencefrm.get('signedOffShip')?.value === 'Yes' ||
    this.experiencefrm.get('operationInThePast')?.value === 'Yes' ||
    this.experiencefrm.get('consultedDoctor')?.value === 'Yes' ||
    this.experiencefrm.get('disabilityProblem')?.value === 'Yes'||
    this.experiencefrm.get('addictedToDrug')?.value === 'Yes'||
    this.experiencefrm.get('sufferedFromDiabetes')?.value === 'Yes'||
    this.experiencefrm.get('sufferedFromEpilepsy')?.value === 'Yes'||
    this.experiencefrm.get('anykindOfMedication')?.value === 'Yes';

  if (medicalYes) {
    this.experiencefrm.get('medicalHistoryDetails')?.enable();
  } else {
    this.experiencefrm.get('medicalHistoryDetails')?.disable();
    this.experiencefrm.get('medicalHistoryDetails')?.setValue('');
  }
}
toggleGeneralDetails() {
  const generalYes =
    this.experiencefrm.get('maritimeAccident')?.value === 'Yes' ||
    this.experiencefrm.get('licenseSuspendedRevoked')?.value === 'Yes' ||
    this.experiencefrm.get('courtOfEnquiry')?.value === 'Yes' ||
    this.experiencefrm.get('deniedForeignVisa')?.value === 'Yes';

  if (generalYes) {
    this.experiencefrm.get('generalDetails')?.enable();
  } else {
    this.experiencefrm.get('generalDetails')?.disable();
    this.experiencefrm.get('generalDetails')?.setValue('');
  }
}

onSubmit(form: any) {
  let formValues = this.experiencefrm.value;

  if (formValues.experienceId > 0) {

    formValues.ModifiedBy = localStorage.getItem('userName');

    this.applicantservice
      .updateExperience(formValues.experienceId, formValues)
      .subscribe(
        data => {
          if (data.message) {

            this.snackBar.open(data.message, "Close", { duration: 3000 });
            setTimeout(() => {
              window.location.reload();
            }, 800);
            // this.loadExperience(0);
          }
        },
        error => (this.errorMsg = error)
      );
  }
  else {

    this.experiencefrm.controls['applicantId'].setValue(this.applicantId);
    formValues = this.experiencefrm.value;

    let formData = new FormData();
    formData.append('data', JSON.stringify(formValues));

    this.applicantservice.addExperience(formData).subscribe(
      data => {
        if (data.message) {

          this.snackBar.open(data.message, "Close", { duration: 3000 });
          setTimeout(() => {
            window.location.reload();
          }, 800);
          // this.loadExperience(0);
        }
      },
      error => (this.errorMsg = error)
    );
  }
}


  loadExperience(status: number): void {
  this.applicantservice.getExperience(status, this.applicantId)
    .subscribe(experienceData => {
      
      this.referenceData = experienceData;

      if (this.referenceData && this.referenceData.length > 0) {
        this.isReferenceExist = true;

        this.experiencefrm.patchValue(this.referenceData[0]);
      }

    });
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
}
