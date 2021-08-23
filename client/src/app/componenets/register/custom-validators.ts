import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return passwordConfirm.value && password.value !== passwordConfirm.value
    ? { misMatch: true }
    : null;
};
