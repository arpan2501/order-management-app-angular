import { AbstractControl,ValidationErrors } from '@angular/forms';

export class ProductFormValidators {

static cannotContainSpace(control:AbstractControl):ValidationErrors|null{

  if((control.value as string).indexOf(' ')>=0){
    return {cannotContainSpace:true};
  }
  return null;
}

static minimumPrice( control:AbstractControl ):ValidationErrors|null{
  if(control.value && (control.value as number)<1){
    return {minimumPrice:true};
  }
  return null;
}

}
