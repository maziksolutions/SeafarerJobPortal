import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/Layout/header/header.component';
import { SefarerelistComponent } from './sefarerelist/sefarerelist.component';
import { ApplicantlistComponent } from './applicantlist/applicantlist.component';
import { ParticularsComponent } from './ApplicantDetails/PersonalDetail/particulars/particulars.component';
import { ApplicantaddressComponent } from './ApplicantDetails/PersonalDetail/applicantaddress/applicantaddress.component';
import { ApplicanttravelComponent } from './ApplicantDetails/PersonalDetail/applicanttravel/applicanttravel.component';
import { ApplicantLicenseComponent } from './ApplicantDetails/PersonalDetail/ApplicantDocument/applicant-license/applicant-license.component';
import { ApplicantAssignmentComponent } from './ApplicantDetails/PersonalDetail/applicant-assignment/applicant-assignment.component';
import { ApplicantCoursesComponent } from './ApplicantDetails/PersonalDetail/applicant-courses/applicant-courses.component';
import { QualificationDetailsComponent } from './ApplicantDetails/PersonalDetail/qualification-details/qualification-details.component';
import { ExperienceDetailsComponent } from './ApplicantDetails/PersonalDetail/experience-details/experience-details.component';


const routes: Routes = [
 
    {
      path: '', component: HeaderComponent,
      children:[
        {path: 'Sefarerelist',component: SefarerelistComponent,pathMatch:'full'}, 
        {path: 'ApplicantList',component: ApplicantlistComponent}, 
        {path: 'ApplicantDetails/:id',component: ParticularsComponent},        
        {path: 'Applicantaddress/:id',component: ApplicantaddressComponent}, 
        {path: 'ApplicantTravel/:id',component: ApplicanttravelComponent}, 
        {path: 'ApplicantLicense/:id',component: ApplicantLicenseComponent}, 
        {path: 'ApplicantAssignment/:id',component: ApplicantAssignmentComponent}, 
        {path: 'ApplicantCourses/:id',component: ApplicantCoursesComponent}, 
        {path: 'QualificationDetails/:id',component: QualificationDetailsComponent}, 
        {path: 'ExperienceDetails/:id',component: ExperienceDetailsComponent}, 
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogindataRoutingModule {
 }
