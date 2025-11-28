import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { MatTableDataSource } from '@angular/material/table';
import { AddApplicantLicenseComponent } from './add-applicant-license/add-applicant-license.component';
import { EditapplicantlicenceComponent } from './editapplicantlicence/editapplicantlicence.component';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applicant-license',
  templateUrl: './applicant-license.component.html',
  styleUrls: ['./applicant-license.component.css']
})
export class ApplicantLicenseComponent implements OnInit
{
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  applicantdata:any;
  applicantId:any;
  status;
  loadingPassport: boolean;
  applicantLicense:any;
  displayedApplicantLicenseColumns = ['attachment','licenceName', 'licenseNumber','countryId', 'doi', 'doe','place',  'authorities','actions'];
  ApplicantLicense:any[];
  certificateFile: File | null = null; // Allow certificateFile to be nullable
  dataPassportSource = new MatTableDataSource<any>();
  userstatus:any;
  constructor(private applicantserice:ApplicantService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,){}

 ngOnInit(): void
  {  
    this.applicantId = this.route.snapshot.paramMap.get('id');
    this.userstatus=localStorage.getItem("UserType");
    this.loadapplicantbyId()    
    this.loadapplicantLicense(0)
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

loadapplicantLicense(status: number): void {
  this.applicantserice.GetApplicantLicense(status,this.applicantId)
    .subscribe(passports => {
      this.status = status;
      this.dataPassportSource.data = passports;     
    });
}

addapplicantLicense() {
  this.dbops = DBOperation.create;
  this.modalTitle = 'Add Applicant License';
  this.modalBtnTitle = 'Add';
  this.openApplicantravel();
}

openApplicantravel(): void {
  const dialogRef = this.dialog.open(AddApplicantLicenseComponent,{
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, applicantLicense: this.applicantLicense, ApplicantId:this.applicantId }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingPassport = true;
      this.loadapplicantLicense(0);
      this.showMessage('Added successfully.');
    }
  });
}

updateApplicantLicense(id: number) {
  this.dbops = DBOperation.update;
  this.modalTitle = 'Edit Applicant License';
  this.modalBtnTitle = 'Update';
  this.ApplicantLicense = this.dataPassportSource.data.filter(x => x.applicantLicenseId === id)[0];
  this.openApplicantEdit();
}

openApplicantEdit(): void {
  const dialogRef = this.dialog.open(EditapplicantlicenceComponent,{
    width: '80vw',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, ApplicantLicense: this.ApplicantLicense,ApplicantId:this.applicantId  }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadingPassport = true;
      this.loadapplicantLicense(0);
      this.showMessage('Updated successfully.');
    }
  });
}

showMessage(msg: string,type:string='') {
  this.snackBar.open(msg, '', {
    duration: 1500,
    panelClass:type=='danger'? ['red-snackbar']:['blue-snackbar']
  });
}

DeleteApplicantLicense(id: number) {
  if (confirm('Are you sure to change status of this record ?') === true) {
    this.applicantserice.DeleteApplicantLicence(id)
      .subscribe((x) => {
        this.loadapplicantLicense(this.status);
        this.showMessage('Successfully deleted.');
      });
  }
}

showAttachment(filePath: string) {
  if (filePath.includes(".")) {
    window.open(environment.url + filePath);
  } else {
    alert('No attachment found');
  }
}

handleCertificateFile(event: Event): void {
  const inputElement = event.target as HTMLInputElement; // Type assertion to get the input element
  if (inputElement?.files) {
    const fileList: FileList = inputElement.files; // Get the FileList
    this.certificateFile = fileList.item(0); // Assign the first file from the FileList
  }
}

}
