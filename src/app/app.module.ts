import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { FooterComponent } from './Layout/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { Keys } from './Shared/localKeys';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthInterceptorService } from './Services/guards/auth-interceptor.service';
import { HeaderComponent } from './Layout/header/header.component';
import { LoginComponent } from './Pages/login/login.component';
import { NewapplicantComponent } from './Pages/newapplicant/newapplicant.component';
import { ChangePasswordComponent } from './Layout/change-password/change-password.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgotPasswordComponent } from './Layout/forgot-password/forgot-password.component';
import { ApplicantviewComponent } from './Pages/applicantview/applicantview.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewPDFComponent } from './Common/view-pdf/view-pdf.component';
export function tokenGetter() {
return localStorage.getItem(Keys.token);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    NewapplicantComponent,  
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ApplicantviewComponent,
    ViewPDFComponent,
  ],
  imports: [   
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    NgxDocViewerModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],

  providers: [DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
