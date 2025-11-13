import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { AddapplicanttravelComponent } from './addapplicanttravel/addapplicanttravel.component';
import { EditapplicanttravelComponent } from './editapplicanttravel/editapplicanttravel.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-applicanttravel',
  templateUrl: './applicanttravel.component.html',
  styleUrls: ['./applicanttravel.component.css']
})
export class ApplicanttravelComponent implements OnInit
{
   dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  loadingPassport: boolean;
  applicantId:any;
  status;
  applicantTravel:any;
  displayedapplicanttravelColumns = ['documentNumber','documentType','documentDetail','countryName', 'place', 'doi', 'doe', 'attachment','actions'];
  dataPassportSource = new MatTableDataSource<any>();
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
  this.loadApplicantTravel(0);
}

addApplicantravel() {
  this.dbops = DBOperation.create;
  this.modalTitle = 'Add Applicant Travel';
  this.modalBtnTitle = 'Add';
  this.openApplicantravel();
}
openApplicantravel(): void {
  const dialogRef = this.dialog.open(AddapplicanttravelComponent, {
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, passports: this.applicantTravel, crewId:this.applicantId }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingPassport = true;
      this.loadApplicantTravel(0);
      this.showMessage('Added successfully.');
    }
  });
}

loadApplicantTravel(status: number): void {
  this.applicantserice.GetApplicantTravel(status,this.applicantId)
    .subscribe(passports => {
      this.status = status;
      this.dataPassportSource.data = passports;        
    });
}

showMessage(msg: string,type:string='') {
  this.snackBar.open(msg, '', {
    duration: 1500,
    panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
  });
}

updateApplicant(id: number) {
  this.dbops = DBOperation.update;
  this.modalTitle = 'Edit Applicant travel';
  this.modalBtnTitle = 'Update';
  this.applicantTravel = this.dataPassportSource.data.filter(x => x.applicantCDCId === id)[0];
  this.openApplicantEdit();
}

openApplicantEdit(): void {
  const dialogRef = this.dialog.open(EditapplicanttravelComponent,{
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, passports: this.applicantTravel,crewId:this.applicantId  }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingPassport = true;
      this.loadApplicantTravel(0);
      this.showMessage('Updated successfully.');
    }
  });
}

  DeleteApplicantTravel(id: number) {
    if (confirm('Are you sure to change status of this record ?') === true) {
      this.applicantserice.DeleteApplicantTravel(id)
        .subscribe((x) => {
          this.loadApplicantTravel(this.status);
          this.showMessage('Successfully deleted.');
        });
    }
  }

  handleCertificateFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
    if (inputElement?.files) {
      const fileList: FileList = inputElement.files; // Get the FileList
      this.certificateFile = fileList.item(0); // Assign the first file from the FileList
    }
  }

  showAttachment(filePath: string) {
    if (filePath.includes(".")) {
      window.open(environment.url + filePath);
    } else {
      alert('No attachment found');
    }
  }

}
