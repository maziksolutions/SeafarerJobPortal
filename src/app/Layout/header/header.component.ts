import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
users: any[];
applicantname:any;
username:any;
  constructor( 
    private userService: UserService,
    public dialog: MatDialog,
  )
  {}
  ngOnInit(): void
   {
    this.username = localStorage.getItem('userName');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      panelClass: 'dialog-container-custom',
      width: '30vw', maxWidth: '30vw', maxHeight: '60vh',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
      }
    });
  }

  logout() {
    this.userService.logoutUser()
  }
}
