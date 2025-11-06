import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { ApplicantEditAddressComponent } from './applicant-edit-address/applicant-edit-address.component';
import { ApplicantaddaddressComponent } from './applicantaddaddress/applicantaddaddress.component';
@Component({
  selector: 'app-applicantaddress',
  templateUrl: './applicantaddress.component.html',
  styleUrls: ['./applicantaddress.component.css']
})
export class ApplicantaddressComponent implements OnInit
{
  applicantdata:any;
  applicantId:any;
  permanentAddress: any;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  applicantModel: any; 
  loadingState: boolean;
  status: number = 0;
  isPermanentExist: boolean = false;
  userstatus:any;
  constructor(private applicantserice:ApplicantService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router, //SnackBar
    private snackBar: MatSnackBar,){}
  ngOnInit(): void  
  {
  this.applicantId = this.route.snapshot.paramMap.get('id');
  this.userstatus=localStorage.getItem("UserType");
  const userSession = localStorage.getItem('userToken');
  if (userSession == null || userSession == '' || userSession == undefined)
    this.router.navigateByUrl('/login');
  this.loadingState = true;
  this.loadCrewPermanentAddress(this.status);
  this.loadapplicantbyId()  
  }

  loadapplicantbyId():void { 
    this.applicantserice.GetApplicantbyidd(this.applicantId)
      .subscribe((response) => {
        this.applicantdata=response.data;
      },
        (error) => {
          console.log(error);
        }); 
  }

  //#region Permanent Applicant Address
  loadCrewPermanentAddress(status: number): void {
    this.status = status;
    this.applicantserice.getApplicantAddress(this.status, this.applicantId)
      .subscribe(response => {
        console.log(response)   ;
      
        this.permanentAddress = response.data;
        if (this.permanentAddress.length > 0)
          this.isPermanentExist = true;
      });
  }

  addPermanentApplicantAddress(): void {
    // Condition to prevent add new record if a record already exist
    if (this.permanentAddress > 0) {
      alert('Record Already Exist, Either Archive the Existing Record or Update that Existing Record');
    }
    // condition to add new record if any record doesn't exist
    else {
      this.dbops = DBOperation.create;
      this.modalTitle = 'Add Permanent Address';
      this.modalBtnTitle = 'Add';
      this.openDialog();
    }
  }
  // Open dialoge to add
  openDialog(): void {
    const dialogRef = this.dialog.open(ApplicantaddaddressComponent, {
      width: '1000px',
      data: { modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, applicantId: this.applicantId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadingState = true;
        this.loadCrewPermanentAddress(this.status);
        this.showMessage('Added successfully.');
      }
    });
  }

// Edit Record
updatePermanentCrewAddress(): void {
  this.dbops = DBOperation.update;
  this.modalTitle = 'Update Permanent Address';
  this.modalBtnTitle = 'Update';
  this.openPerEditDialog();
}
// Open dialoge to edit
openPerEditDialog(): void {
  const dialogRef = this.dialog.open(ApplicantEditAddressComponent, {
    width: '1000px',
    data: { modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, crew: this.permanentAddress }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingState = true;
      this.loadCrewPermanentAddress(this.status);
      this.showMessage('Updated successfully.');
    }
  });
}

 // Functon to show message on paticular action
 showMessage(msg: string,type:string=''): void {
  this.snackBar.open(msg, '', {
    duration: 1500,
    panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
  });
}
  //#endregion

}
