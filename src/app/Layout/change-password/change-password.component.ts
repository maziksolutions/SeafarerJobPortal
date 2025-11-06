import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { PasswordStrengthValidator, PasswordValidation } from 'src/app/Shared/password-validation';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userfrm: FormGroup;
  errorMsg: any;
  oldpassword: any;
  usersdetail: any;
  notMatched: boolean = false;

  changePassForm: FormGroup;

  applicantId: any;

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: any,
    private fb: FormBuilder,
    private applicantservice: ApplicantService,
    private snackBar: MatSnackBar,
    private userservice: UserService,
    public dialogRef: MatDialogRef<''>) { }

  ngOnInit() {

    this.applicantId = localStorage.getItem('ApplicantId');
    this.userfrm = this.fb.group({
      oldpassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]]
    }, {
      validator: PasswordValidation.MatchPassword
    });

        
    this.changePassForm = this.fb.group({
      applicantId: [this.applicantId],
      oldPass: ['', Validators.required],
      newpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8), Validators.maxLength(20)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8), Validators.maxLength(20)]]
    });
  }


  get fm() { return this.changePassForm.controls };

  addHandler() {

    if (this.changePassForm.invalid) {
      return;
    }
    //this.password(this.changePassForm.value);

    if (this.fm.newpassword.value != this.fm.confirmpassword.value) {
      this.showMessage('Confirm password not match.', 'danger');
    }
    else {
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.changePassForm.value));
      this.applicantservice.changeapplicantPassword(formData)
        .subscribe((response) => {
          if (response.messageForRejection == "Incorrect old Password") {
            this.showMessage('The Password You Entered Is Incorrect. Please Try Again.', 'danger');

          }
          else if (response.status) {
            // this.employees = response.data;
            // localStorage.setItem(Keys.token, response.token);
            // localStorage.setItem(Keys.refreshtoken, response.refreshToken);

            this.showMessage('Password Updated');
            this.applicantservice.GetApplicantbyidd(this.applicantId);
            if (response.message) {
              this.dialogRef.close('success');
            }
            else {
              this.dialogRef.close('error');
            }
          }
        },
          (error) => {
            console.log(error);
          })
      //}
    }
  }

  Checkoldpassword() {
    this.userservice.CheckOldPassword(this.oldpassword).subscribe((data) => {
      if (data.message == "Password not matched") {
        this.showMessage('Old password does not match.', 'danger');
      }
    },
      error => {
        this.errorMsg = error;
      });
  }

  comparePwd() {
    if (this.fm.newpassword.value != this.fm.confirmpassword.value)
      this.notMatched = true;
    else
      this.notMatched = false;
  }

  showMessage(msg: string, type: string = '') {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }
}
