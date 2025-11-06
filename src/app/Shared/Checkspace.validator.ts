import { AbstractControl, ValidationErrors } from '@angular/forms';  
import { FormControl } from '@angular/forms';
export class CheckspaceValidator  {
    static cannotContainSpace: any;
    // static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {  
    //     if((control.value as string).indexOf(' ') >= 0){  
    //         return {cannotContainSpace: true}  
    //     }  
    
    //     return null;  
    // }  
    static notAllowedSpaceValidator(control: FormControl) {
        let userInput = control.value;
        if (userInput && userInput.length > 0) {
          if (userInput[0] === " ") {
            return {
              forbiddenSpace: {
                value: userInput,
              },
            };
          }
        } else {
          return null;
        }
      }
}
