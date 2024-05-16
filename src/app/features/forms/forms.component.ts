import { Component, computed, signal,ChangeDetectorRef,AfterViewChecked  } from '@angular/core';
import { Address } from '../../models/address';
import { FormModel, createPurchaseValidationSuite } from '../validators/address.sync-validaitons';
import { CommonModule } from '@angular/common';
import { templateDrivenForms } from '../../template-driven-forms/template-driven.forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule,templateDrivenForms],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements AfterViewChecked  {
  protected readonly suite = createPurchaseValidationSuite();
  protected readonly formValue = signal<FormModel>({});
  protected readonly formValid = signal<boolean>(false);
  protected readonly loading = signal<boolean>(false);
  private readonly shippingAddress = signal<Address>({});
  /**
   *
   */
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    
    
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }


  // If im understanding this correctly, when age is changed, it runs emergencyContact validators,
  // or it is supposed to at least
  protected readonly validationConfig: {
    [key: string]: string[];
  } = {
      'age': ['emergencyContact'],
      'password': ['confirmPassword'],
      'gender': ['genderOther']
    };

  private readonly viewModel = computed(() => {
    return {
      formValue: this.formValue(),
      formValid: this.formValid(),
      password: this.formValue().password,
      confirmPassword: this.formValue().confirmPassword,
      age: this.formValue().age,
      emergencyContactDisabled: (this.formValue().age || 0) >= 18,   
      emergencyContact: this.formValue().emergencyContact,    
      firstName: this.formValue().firstName,
      lastName: this.formValue().lastName,
      loading: this.loading(),
      email: this.formValue().email
    }
  });

  protected get vm() {
    return this.viewModel();
  }

  protected setFormValue(v: FormModel): void {
    this.formValue.set(v);    
  }

  protected onSubmit(): void {
    if (this.formValid()) {
      console.log(this.formValue())
    }
  }
}
