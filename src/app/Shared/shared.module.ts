                                                                                                                                                                               import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DirectivesModule } from 'src/app/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { StrictNumberOnlyDirective } from './StrictNumberOnlyDirective';
import { TruncateWordsPipe } from './truncate-words.pipe';




@NgModule({
  declarations: [
    StrictNumberOnlyDirective,
    TruncateWordsPipe   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,   
        FormsModule, HttpClientModule
   
    // DirectivesModule
  ],
  exports: [
    StrictNumberOnlyDirective,
    TruncateWordsPipe   
  ]
})
export class CustomSharedModule { }
