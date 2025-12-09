import { Component } from '@angular/core';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AddreferenceComponent } from './addreference/addreference.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent {
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  applicantId:any;
  status:any;
  referenceDetails:any;
  referenceData:any;
  isReferenceExist: boolean = false;
  userstatus:any;
constructor(public dialog: MatDialog,
private snackBar: MatSnackBar,
 private applicantservice:ApplicantService,
 private route: ActivatedRoute,
){}
ngOnInit(){
 this.applicantId = this.route.snapshot.paramMap.get('id'); 
  this.userstatus=localStorage.getItem("UserType");
  this.loadReference(0);
}
addreference() {
  this.dbops = DBOperation.create;
  this.modalTitle = 'Add Reference 1';
  this.modalBtnTitle = 'Add';
  this.openReference();
}
openReference(): void {
  const dialogRef = this.dialog.open(AddreferenceComponent, {
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, passports: this.referenceDetails, crewId:this.applicantId }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      // this.loadingPassport = true;
      this.loadReference(0);
      this.showMessage('Added successfully.');
    }
  });
}
showMessage(msg: string,type:string='') {
  this.snackBar.open(msg, '', {
    duration: 1500,
    panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
  });
}
loadReference(status: number): void {
  this.applicantservice.GetReference(status,this.applicantId)
    .subscribe(qualificationData => {
      
      this.status = status;
      this.referenceData = qualificationData;     
      if (this.referenceData.length > 0)
          this.isReferenceExist = true; 
    });
}
updateReference(): void {
  this.dbops = DBOperation.update;
  this.modalTitle = 'Update Reference';
  this.modalBtnTitle = 'Update';
  this.openPerEditDialog();
}
// Open dialoge to edit
openPerEditDialog(): void {
  const dialogRef = this.dialog.open(AddreferenceComponent, {
    width: '80vw',
     height: '35vh',
    data: { modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, referenceDetails: this.referenceData,crewId:this.applicantId }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      // this.loadingState = true;
      this.loadReference(this.status);
      this.showMessage('Updated successfully.');
    }
  });
}
}
