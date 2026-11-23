import { Component, OnInit, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs';
import { viewerType } from 'ngx-doc-viewer';
declare let $:any;
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPDFComponent implements OnInit {
  @ViewChild('iframeRef', { static: false }) iframeRef: ElementRef;
  private checkIFrameSubscription: Subscription | null = null;
  viewer: 'google' | 'office' | 'mammoth' | 'pdf' | 'url' = 'google';
  timeIntervalFrame;
  extension:string;
  docurl:any;
  pdfurl:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ViewPDFComponent>) {
    this.sanitizer = sanitizer; 
  }

  ngOnInit() {
    let extensions=this.data.filepath.split('.');
    var ext=extensions[extensions.length-1].toString();    
    if(ext.toString().toLowerCase()=="pdf" || ext=="PDF" || this.endsWithNumber(this.data.filepath) || ext.toString().toLowerCase()=="png" || ext.toString().toLowerCase()=="jpg" || ext.toString().toLowerCase()=="jpeg"){
      this.extension="pdf";
      this.viewer="url";
      this.pdfurl=this.data.filepath+'#toolbar=0&navpanes=1';  
    }
    this.generateUrl();
    this.isDocLoaded();
  }
  endsWithNumber( str: string ): boolean {
    var isNumber=!isNaN(Number(str.trim().slice(-1)));
    return isNumber;
}
isDocLoaded() {
  this.timeIntervalFrame = setInterval(() => {
    const el = document.getElementById('iframe-doc-viewer') as HTMLIFrameElement;
    if (el) {
      clearInterval(this.timeIntervalFrame);
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.display = 'none';
      }
    }
  }, 1000);
}
generateUrl(){
  this.docurl=this.sanitizer.bypassSecurityTrustResourceUrl('https://view.officeapps.live.com/op/embed.aspx?src=' + this.data.filepath + '?timestamp=' + Math.floor(Math.random() * 100000) + '&embedded=true#toolbar=0&navpanes=0&scrollbar=0' + '&#view=Fit');
//  this.docurl=this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/gview?url=' + this.data.filepath + '?timestamp=' + Math.floor(Math.random() * 100000) + '&embedded=true#toolbar=0&navpanes=0&scrollbar=0' + '&#view=Fit');
}
onfileLoad(e?: any) {
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.display = 'none';
  }
}
  downloadFile(fileName: string) {
  const filename = fileName
    ? fileName.replace(/[^\w\s]/gi, '')
    : 'Doc' + moment(new Date()).format('dMMMyyhhmmss');

  const link = document.createElement('a');
  link.href = this.data.filepath.toString();
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
  close(): void {
    this.dialogRef.close();
  }

  // checkIFrame(iframe: any) {
  //   if (iframe) {
  //     iframe.onload = () => {
  //       if (this.checkIFrameSubscription) {
  //         this.checkIFrameSubscription.unsubscribe();
  //       }
  //     };
  //   }
  // }
  // reloadIFrame(iframe: any) {
  //   if (iframe) {
  //     iframe.src = this.docurl; // Google document viewer url.
  //   }
  // }
  // ngAfterViewInit() {
  //   let iframe = (this.iframeRef) ? this.iframeRef.nativeElement : null;
  //   this.checkIFrame(iframe);
  //   this.checkIFrameSubscription = interval(3000)
  //     .pipe(take(Math.round(20000 / 3000)))
  //     .subscribe(() => {
  //       if (iframe == null) {
  //         iframe = (this.iframeRef) ? this.iframeRef.nativeElement : null;
  //         this.checkIFrame(iframe);
  //       }
  //       this.reloadIFrame(iframe);
  //     });
  // }
}
