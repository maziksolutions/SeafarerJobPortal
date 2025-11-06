

// import { MatOptionModule, } from '@angular/material';
// import { FileUploadModule } from 'ng2-file-upload';

// import { MatTableExporterModule } from 'mat-table-exporter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { defaultFormat as _rollupMoment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTreeModule} from '@angular/material/tree';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import * as _moment from 'moment';
import {MatMenuModule} from '@angular/material/menu';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    dateA11yLabel: 'DD-MMM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatCardModule,
    MatTooltipModule,
    MatTreeModule,
    MatAutocompleteModule,
   // FileUploadModule,
    NgMultiSelectDropDownModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  exports: [MatExpansionModule,
   // MatTableExporterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatSortModule,
    MatTooltipModule,
    MatTreeModule,
    MatAutocompleteModule,
   // FileUploadModule,
    NgMultiSelectDropDownModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {
        useUtc: true
      }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-IN'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS //date format when add or edit
    },
  ]
})
export class AppMaterialModule { }
