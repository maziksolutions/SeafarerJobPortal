import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AddqualificationdetailsComponent } from './addqualificationdetails/addqualificationdetails.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qualification-details',
  templateUrl: './qualification-details.component.html',
  styleUrls: ['./qualification-details.component.css']
})
export class QualificationDetailsComponent {
dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  loadingPassport: boolean;
  applicantId:any;
  status;
  qualificationDetails:any;
  displayedqualificationDetailsColumns = ['documentNumber','documentType','documentDetail','duration','countryName','instituteName', 'actions'];
  dataqualificationSource = new MatTableDataSource<any>();
  userstatus;
  certificateFile: File | null = null; // Allow certificateFile to be nullable
constructor(
private snackBar: MatSnackBar,
private router: Router,
public dialog: MatDialog  ,
 private route: ActivatedRoute,
 private applicantserice:ApplicantService,
){}


ngOnInit(): void 
{
  this.applicantId = this.route.snapshot.paramMap.get('id'); 
  this.userstatus=localStorage.getItem("UserType");
  this.loadQualificationDetails(0);
}

addQualificationDetails() {
  this.dbops = DBOperation.create;
  this.modalTitle = 'Add Qualification Details';
  this.modalBtnTitle = 'Add';
  this.openQualificationDetails();
}
openQualificationDetails(): void {
  const dialogRef = this.dialog.open(AddqualificationdetailsComponent, {
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, passports: this.qualificationDetails, crewId:this.applicantId }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingPassport = true;
      this.loadQualificationDetails(0);
      this.showMessage('Added successfully.');
    }
  });
}

  DeleteQualificationDetails(id: number) {debugger
    if (confirm('Are you sure to change status of this record ?') === true) {
      this.applicantserice.DeleteQualificationDetails(id)
        .subscribe((x) => {
          this.loadQualificationDetails(this.status);
          this.showMessage('Successfully deleted.');
        });
    }
  }
loadQualificationDetails(status: number): void {
  this.applicantserice.GetQualificationDetails(status,this.applicantId)
    .subscribe(qualificationData => {debugger
      console.log(qualificationData);
      
      this.status = status;
      this.dataqualificationSource.data = qualificationData;        
    });
}

showMessage(msg: string,type:string='') {
  this.snackBar.open(msg, '', {
    duration: 1500,
    panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
  });
}

updateQualificationDetails(id: number) {debugger
  this.dbops = DBOperation.update;
  this.modalTitle = 'Edit Qualification Details';
  this.modalBtnTitle = 'Update';
  this.qualificationDetails = this.dataqualificationSource.data.filter(x => x.applicantQualificationId === id)[0];
  this.openEditQualificationDetails();
}

openEditQualificationDetails(): void {debugger
  const dialogRef = this.dialog.open(AddqualificationdetailsComponent,{
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, qualificationDetails: this.qualificationDetails,crewId:this.applicantId  }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingPassport = true;
      this.loadQualificationDetails(0);
      this.showMessage('Updated successfully.');
    }
  });
}


 

  


}
