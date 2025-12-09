import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogindataRoutingModule } from './logindata-routing.module';
import { SefarerelistComponent } from './sefarerelist/sefarerelist.component';
import { AppMaterialModule } from 'src/app/app.material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicantlistComponent } from './applicantlist/applicantlist.component';
import { ParticularsComponent } from './ApplicantDetails/PersonalDetail/particulars/particulars.component';
import { ApplicantdetailnavComponent } from 'src/app/Layout/applicantdetailnav/applicantdetailnav.component';
import { ApplicanteditpersonalComponent } from './ApplicantDetails/PersonalDetail/particulars/applicanteditpersonal/applicanteditpersonal.component';
import { ApplicanteditPhysicalInfoComponent } from './ApplicantDetails/PersonalDetail/particulars/applicantedit-physical-info/applicantedit-physical-info.component';
import { ApplicantaddressComponent } from './ApplicantDetails/PersonalDetail/applicantaddress/applicantaddress.component';
import { ApplicantaddaddressComponent } from './ApplicantDetails/PersonalDetail/applicantaddress/applicantaddaddress/applicantaddaddress.component';
import { ApplicantEditAddressComponent } from './ApplicantDetails/PersonalDetail/applicantaddress/applicant-edit-address/applicant-edit-address.component';
import { ApplicanttravelComponent } from './ApplicantDetails/PersonalDetail/applicanttravel/applicanttravel.component';
import { AddapplicanttravelComponent } from './ApplicantDetails/PersonalDetail/applicanttravel/addapplicanttravel/addapplicanttravel.component';
import { EditapplicanttravelComponent } from './ApplicantDetails/PersonalDetail/applicanttravel/editapplicanttravel/editapplicanttravel.component';
import { ApplicantLicenseComponent } from './ApplicantDetails/PersonalDetail/ApplicantDocument/applicant-license/applicant-license.component';
import { AddApplicantLicenseComponent } from './ApplicantDetails/PersonalDetail/ApplicantDocument/applicant-license/add-applicant-license/add-applicant-license.component';
import { EditapplicantlicenceComponent } from './ApplicantDetails/PersonalDetail/ApplicantDocument/applicant-license/editapplicantlicence/editapplicantlicence.component';
import { ApplicantAssignmentComponent } from './ApplicantDetails/PersonalDetail/applicant-assignment/applicant-assignment.component';
import { AddApplicantAssignmentComponent } from './ApplicantDetails/PersonalDetail/applicant-assignment/add-applicant-assignment/add-applicant-assignment.component';
import { EditapplicantassignmentComponent } from './ApplicantDetails/PersonalDetail/applicant-assignment/editapplicantassignment/editapplicantassignment.component';
import { ApplicantCoursesComponent } from './ApplicantDetails/PersonalDetail/applicant-courses/applicant-courses.component';
import { AddapplicantCourseComponent } from './ApplicantDetails/PersonalDetail/applicant-courses/addapplicant-course/addapplicant-course.component';
import { EditapplicantcourseComponent } from './ApplicantDetails/PersonalDetail/applicant-courses/editapplicantcourse/editapplicantcourse.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { QualificationDetailsComponent } from './ApplicantDetails/PersonalDetail/qualification-details/qualification-details.component';
import { AddqualificationdetailsComponent } from './ApplicantDetails/PersonalDetail/qualification-details/addqualificationdetails/addqualificationdetails.component';
import { ExperienceDetailsComponent } from './ApplicantDetails/PersonalDetail/experience-details/experience-details.component';
import { ReferenceComponent } from './ApplicantDetails/PersonalDetail/reference/reference.component';
import { AddreferenceComponent } from './ApplicantDetails/PersonalDetail/reference/addreference/addreference.component';
@NgModule({
  declarations: [
    SefarerelistComponent,
     ApplicantlistComponent,
      ParticularsComponent ,
    ApplicantdetailnavComponent,  
    ApplicanteditpersonalComponent,
    ApplicanteditPhysicalInfoComponent,
    ApplicantaddressComponent,
    ApplicantaddaddressComponent,
    ApplicantEditAddressComponent,
    ApplicanttravelComponent,
    AddapplicanttravelComponent,
    EditapplicanttravelComponent,
    ApplicantLicenseComponent,
    AddApplicantLicenseComponent,
    EditapplicantlicenceComponent,
    ApplicantAssignmentComponent,
    AddApplicantAssignmentComponent,
    EditapplicantassignmentComponent,
    ApplicantCoursesComponent,
    AddapplicantCourseComponent,
    EditapplicantcourseComponent,
    QualificationDetailsComponent,
    AddqualificationdetailsComponent,
    ExperienceDetailsComponent,
    ReferenceComponent,
    AddreferenceComponent,    
  ],
  imports: [
    CommonModule,
    LogindataRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    
  ],
  exports: [],
})
export class LogindataModule { }
