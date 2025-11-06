import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DirectivesModule } from 'src/app/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { StrictNumberOnlyDirective } from './StrictNumberOnlyDirective';
import { TruncateWordsPipe } from './truncate-words.pipe';
import { AddJobTypeComponent } from '../master/job-type/add-job-type/add-job-type.component';
import { ButtonModule } from 'primeng/button';
import { AttachmentComponent } from '../common/attachment/attachment.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    StrictNumberOnlyDirective,
    TruncateWordsPipe,
    AddJobTypeComponent,
    AttachmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,   
    TooltipModule,
    FormsModule, HttpClientModule,
    ButtonModule,
    TableModule,PaginatorModule,
    // DirectivesModule
  ],
  exports: [
    StrictNumberOnlyDirective,
    TruncateWordsPipe,
    AddJobTypeComponent,
    AttachmentComponent
  ]
})
export class CustomSharedModule { }
