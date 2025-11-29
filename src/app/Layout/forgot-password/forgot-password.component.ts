import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrewAddressService } from 'src/app/Services/crew-address.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
forgotForm:FormGroup;
  errorMsg: string;
  successMsg: string;
  // dialog: any;
constructor( private fb: FormBuilder,
private crewAddressService: CrewAddressService,
private snackBar: MatSnackBar,
public dialog: MatDialogRef<ForgotPasswordComponent>,
){}


ngOnInit(){
   this.forgotForm = this.fb.group({
    email: ['']
  })
}

submit() {
  
  const email = this.forgotForm.value.email;
  if(!email){
   this.showMessage('Please Enter Email Address', 'danger');
   return;
  };
  this.errorMsg = '';
  this.successMsg = '';

  this.crewAddressService.CheckApplicantEmail(email).subscribe((result: any) => {
    ;

    if (result.code === -1 || result.code === -3 || result.code === 0) {
      this.errorMsg = "Invalid Email ID";
      this.forgotForm.reset();
      return;
    }

    if (result.code === -2) {
      this.crewAddressService.resetPassword(email).subscribe(
        (res: any) => {
          this.successMsg = "New password sent to your email!";
          setTimeout(() => { this.dialog.close(); }, 1500);
        },
        (err) => {
          this.errorMsg = "Something went wrong. Please try again.";
        }
      );
    }

  }, (error) => {
    this.errorMsg = "Server error. Please try again later.";
  });
}
 showMessage(msg: string, type: string = '') {
      this.snackBar.open(msg, '', {
        duration: 1500,
        panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
      });
    }
}
