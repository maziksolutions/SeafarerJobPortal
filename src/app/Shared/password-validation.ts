import { AbstractControl,ValidationErrors } from '@angular/forms';
export class PasswordValidation {

    // static MatchPassword(AC: AbstractControl) {
    //     let password = AC.get('password').value;
    //     if(AC.get('confirmpassword').touched || AC.get('confirmpassword').dirty) {
    //         let verifyPassword = AC.get('confirmpassword').value;

    //         if(password != verifyPassword) {
    //             AC.get('confirmpassword').setErrors( {MatchPassword: true} )
    //         } else {
    //             return null
    //         }
    //     }
    // }


    static MatchPassword(AC: AbstractControl): ValidationErrors | null {
      const password = AC.get('password')?.value;
      const confirmPassword = AC.get('confirmpassword');

      if (confirmPassword && (confirmPassword.touched || confirmPassword.dirty)) {
          const verifyPassword = confirmPassword.value;

          if (password !== verifyPassword) {
              confirmPassword.setErrors({ MatchPassword: true });
          } else {
              return null;
          }
      }
      return null;
  }
}


export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

    let value: string = control.value || '';
  
    if (!value) {
      return null
    }
  
    let upperCaseCharacters = /[A-Z]+/g
    if (upperCaseCharacters.test(value) === false) {
      return { passwordStrength: `Password must contain Upper case characters,current value ${value}` };
    }
  
    let lowerCaseCharacters = /[a-z]+/g
    if (lowerCaseCharacters.test(value) === false) {
      return { passwordStrength: `Password must contain lower case characters,current value ${value}` };
    }
  
  
    let numberCharacters = /[0-9]+/g
    if (numberCharacters.test(value) === false) {
      return { passwordStrength: `Password must contain number characters,current value ${value}` };
    }
  
    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (specialCharacters.test(value) === false) {
      return { passwordStrength: `Password must contain special character,current value ${value}` };
    }
    return null;
  }