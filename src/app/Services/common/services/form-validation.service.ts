import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationMessages } from 'src/app/common/validation-messages';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  getErrorMessage(control: AbstractControl | null, fieldName: string = ''): string {
    if (!control || !control.errors) return '';
    const errors = Object.keys(control.errors);
    if (errors.length === 0) return '';
    const errorKey = errors[0];
    const errorDetail = control.errors[errorKey];
    // Handle custom messages if provided
    if (typeof errorDetail === 'string') {
      return errorDetail;
    }
    // Return generic message
    return ValidationMessages[errorKey as keyof typeof ValidationMessages] || 'Invalid value';
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }
}