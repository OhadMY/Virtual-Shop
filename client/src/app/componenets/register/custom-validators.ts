import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return passwordConfirm.value && password.value !== passwordConfirm.value
    ? { misMatch: true }
    : null;
};

export const idValidator: AsyncValidatorFn = async (
  control: AbstractControl
): Promise<ValidationErrors> => {
  const userId = control.value;
  console.log(userId);
  const res = await fetch(`http://localhost:1000/users/idvalidation/${userId}`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data ? { isFound: true } : null;
};
