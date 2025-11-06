import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateFormatValidator]'
})
export class DateFormatValidatorDirective {

  constructor(private el: ElementRef) { }  
    
  @HostListener('input') onInput() {
    const input = this.el.nativeElement.value;
    const parts = input.split('-');
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      const year = parts[0];
      const month = this.getMonthNumber(parts[1]);
      const day = parts[2];
      const formattedDate = `${year}-${month}-${day}`;
      this.el.nativeElement.value = formattedDate;
    }
  }

  private getMonthNumber(month: string): string {
    const months: {[key: string]: string} = {
     
      'Jan': '01', 'Feb': '02', 'Mar': '03', '04': 'Apr', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
      
    };
    return months[month] || '';
  }
}