import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appDateFormat]'
})


export class DateFormatDirectiveDirective implements ControlValueAccessor {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    const formattedValue = this.formatDate(value);
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
    this.onChange(formattedValue);
  }

  formatDate(value: string): string {
    // Assuming value is in yyyy-MM-dd format
    const [year, month, day] = value.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day}-${months[parseInt(month) - 1]}-${year}`;
  }

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', this.formatDate(value));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}

