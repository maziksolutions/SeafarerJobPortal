import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit
{
  users: any[];
  country:any[];
  applicantname:any;
  email:any;
firstname:any;
lastname:any;
picul:any;

constructor(private userService: UserService,public dialog: MatDialog, private snackBar: MatSnackBar) { }
ngOnInit(): void 
{
  const ApplicantId = localStorage.getItem('ApplicantId');
  this.loadapplicant(ApplicantId);
}

loadapplicant(ApplicantId:any): void {
  this.userService.getapplicanrprofile(ApplicantId).
    subscribe((user) => {
  
    this.users=user[0];
    this.country=user[0].country.countryName
    this.applicantname=user[0].firstName+user[0].lastName;
    this.email=user[0].email;

    });
}
//Show Message
showMessage(msg: string,type:string='') {
  this.snackBar.open(msg, '', {
    duration: 1500,
    panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
  });
}
}
