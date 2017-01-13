import { Validators, FormControl, AbstractControl } from '@angular/forms';

/**
 * @param AbstractControl which in this case is formGroup only 
 * FormGroup extends from AbstractControl afterall.
 * Using FormGroup will also work here.
 */
export function passwordValidator(control: AbstractControl): {[key: string]:boolean }|any  {
    const password = control.get('password');
    const password_confirmation = control.get('password_confirmation');
    // Don't raise nomatch for empty case, required should handle it
    if( !password.value || !password_confirmation.value) {
        return null;
    }
    return password.value === password_confirmation.value ? null : { nomatch: true };
}