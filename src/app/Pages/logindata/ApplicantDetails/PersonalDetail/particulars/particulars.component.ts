import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { ApplicanteditpersonalComponent } from './applicanteditpersonal/applicanteditpersonal.component';
import { ApplicanteditPhysicalInfoComponent } from './applicantedit-physical-info/applicantedit-physical-info.component';
import { RankregisterService } from 'src/app/Services/rankregister.service';

@Component({
  selector: 'app-particulars',
  templateUrl: './particulars.component.html',
  styleUrls: ['./particulars.component.css']
})
export class ParticularsComponent implements OnInit
{
   applicantdata:any;
   applicantId:any;
   rank:any;
   applicantKeys :any;
   dbops: DBOperation;
   modalTitle: string;
   modalBtnTitle: string;
   applicantModel: any; 
   applicantphysicalModel: any; 
   loading: boolean;
   dataSource: any; 
   userstatus:any;religionData:any[];
   userimage: string;showimage: string;isModalOpen = false;scale: number = 1;
  constructor(private applicantserice:ApplicantService,private route: ActivatedRoute,public dialog: MatDialog,private snackBar: MatSnackBar,
    private rankregisterservice: RankregisterService,){}
ngOnInit(): void 

{
  this.applicantId = this.route.snapshot.paramMap.get('id');
this.userstatus=localStorage.getItem("UserType");


  this.loadapplicantbyId()  
}

loadapplicantbyId():void { 
  this.applicantserice.GetApplicantbyidd(this.applicantId)
    .subscribe((response) => {
      this.applicantdata=response.data;
        const image = response.data[0].signature;
          if (image != 'null') {
            this.userimage = image;
            this.showimage = "yes";
          }
          else {
            this.showimage = "no";
          }
    },
      (error) => {
        console.log(error);
      }); 
}
 openImageModal(signature) {
  this.isModalOpen = true;
  }

  closeImageModal() {
  this.isModalOpen = false;
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.scale += 0.1;
    } else if (event.deltaY > 0 && this.scale > 0.2) {
      this.scale -= 0.1;
    }
  }
//#region  applicant personalInfo

updatePersonalInfo(id: number): void {
  this.dbops = DBOperation.update;
  this.modalTitle = 'Edit Applicant Particulars';
  this.modalBtnTitle = 'Update';
  this.applicantModel = this.applicantdata.filter(c => c.applicantId === id)[0];
  this.openPersonalDialog();
}

  // Open dialoge to edit personal info
  openPersonalDialog(): void {
    const dialogRef = this.dialog.open(ApplicanteditpersonalComponent, {
      width: '900px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, crew: this.applicantModel }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadapplicantbyId();
        this.showMessage('Updated successfully.');
      }
    });
  }

//#endregion

//#region applicant Physical Info 

updatePhysicalInfo(id: number): void {
  this.dbops = DBOperation.update;
  this.modalTitle = 'Edit Applicant Other Information';
  this.modalBtnTitle = 'Update';
  this.applicantphysicalModel = this.applicantdata.filter(c => c.applicantId === id)[0];
  this.openPhysicalDialog();
}
// Open dialoge to edit physical info
openPhysicalDialog(): void {
  const dialogRef = this.dialog.open(ApplicanteditPhysicalInfoComponent, {
    width: '900px',
    data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, crew: this.applicantphysicalModel }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.loadapplicantbyId();
      this.showMessage('Updated successfully.');
    }
  });
}

  // Function to calculate BMI
  calculateBMI(height: any, weight: any): number {
    if (height && weight && !isNaN(height) && !isNaN(weight)) {
      let userWeight = weight;
      let userHeight = height / 100; // Convert height from cm to meters
      let total = userWeight / (userHeight * userHeight);
      return Math.floor(total); // Return BMI rounded down as a number
    }
    return NaN; // Return NaN for invalid input (instead of 'NA')
  }
  
//#endregion

  showMessage(msg: string, type: string = ''): void {
    this.snackBar.open(msg, '', {
      duration: 1500,
      panelClass: type == 'danger' ? ['red-snackbar'] : ['blue-snackbar']
    });
  }

   LoadReligion(status: number): void {
    this.rankregisterservice.GetReligionList(status)
      .subscribe(data => {
        console.log(data);
        
        this.religionData = data;
        console.log(this.religionData);
        
      });
  }

}

