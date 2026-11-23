import { Component } from '@angular/core';
import { NewapplicantComponent } from '../newapplicant/newapplicant.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-applicantview',
  templateUrl: './applicantview.component.html',
  styleUrls: ['./applicantview.component.css']
})
export class ApplicantviewComponent {
   modalTitle: string;modalBtnTitle: string;loadingState: boolean; 
constructor(
    // private router: Router, private ngxLoader: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    // private formBuilder: FormBuilder,
    // private userservice: UserService,
    // private countryService: CountryService,
    // private stateService: StateService,
    // private cityService: CityService,
    // private _applyAccessRightsService: ApplyAccessRightsService,
    public dialog: MatDialog) { }
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
          this.showMessageApplicant('The applicant has successfully registered. ');
``
        }
      });
    }
    showMessageApplicant(msg: string, type: string = ''): void {
  this.snackBar.open(msg, '', {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center', 
    panelClass: type === 'danger' ? ['red-snackbar'] : ['blue-snackbar']
  });
}
}
