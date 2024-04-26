import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private isFormInvalid(form: FormGroup, formName: string) {
    return form.get(formName)?.invalid && form.get(formName)?.touched;
  }

  public getFormError(form: FormGroup, formName: string, error: string) {
    return this.isFormInvalid(form, formName) ? form.get(formName)?.hasError(error) : false;
  }
}
