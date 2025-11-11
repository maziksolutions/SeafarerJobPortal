import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { ApplicantService } from 'src/app/Services/applicant.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-applicantdetailnav',
  templateUrl: './applicantdetailnav.component.html',
  styleUrls: ['./applicantdetailnav.component.css']
})
export class ApplicantdetailnavComponent implements OnInit

{
  applicantdata:any[]
  applicantId:any;isModalOpen = false;
  applicantfullname:any;scale: number = 1;
  rank:any;userstatus:any;
  userimage: string; showimage: string;
  constructor(private applicantserice:ApplicantService,
    private userService: UserService,
    private route: ActivatedRoute){}
  ngOnInit(): void 
  {
   this.applicantId = this.route.snapshot.paramMap.get('id');
   this.userstatus=localStorage.getItem("UserType");
   this.loadapplicantbyId()
  }
  loadapplicantbyId() { 
    this.applicantserice.ApplicantByid(this.applicantId)
      .subscribe((response) => {
        if (response.status) {
          this.applicantdata=response.data;
           this.applicantfullname = [
            response.data.firstName,
            response.data.middleName,
            response.data.lastName
        ].filter(Boolean).join(" ");
        

          this.rank=response.data.rankRegister.rankName;
          const image = response.data.photo;
          if (image != 'null') {
            this.userimage = image;
            this.showimage = "yes";
          }
          else {
            this.showimage = "no";
          }
        }
      },
        (error) => {
          console.log(error);
        }); 
  }
  getShortName(fullName) {
    return fullName.split(' ').map(n => n[0]).join('');
  }
  logout() {
    this.userService.logoutUser()
  }
  
  openImageModal() {
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
}
