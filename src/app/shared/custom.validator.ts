import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    static nameValid() {
        return (control: AbstractControl): { [key: string]: any } | null => {

            const regexName = /^[a-zA-Z ]{2,30}$/;
            
            const uname: string = control.value;
            if (regexName.test(uname)) {
                return null;
            }
            return { 'nameValid': true }
        }
    }

    static mobileValidation(){
        return (control: AbstractControl): { [key: string]: any } | null => {
            const regexName = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            const mobile: string = control.value;
            if (regexName.test(mobile)) {
                return null;
            }
            return { 'mobileValidation': true }
        }
    }
}