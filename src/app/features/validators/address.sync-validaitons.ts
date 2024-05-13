import { create, enforce, omitWhen, only, staticSuite, test } from 'vest';
import { Address } from '../../models/address';

export function addressValidations(model: Address | undefined, field: string): void {
  model = model ?? {};

  test('street', 'Street is required', () => {
    enforce(model?.street).isNotBlank();
  });

  omitWhen(!model.street, () => {
    test('street', 'Street must be at least 3 characters long', () => {
      enforce(model?.street).longerThanOrEquals(3);
    });

    test('street', 'Street may be at most 50 characters long', () => {
      enforce(model?.street).shorterThanOrEquals(50);
    });
  });

  test('city', 'City is required', () => {
    enforce(model?.city).isNotBlank();
  });

  test('state', 'State is required', () => {
    enforce(model?.state).isNotBlank();
  });
  

  test('postalCode', 'Postal Code is required', () => {
    enforce(model?.postalCode).isNotBlank();
  });

}


export const createPurchaseValidationSuite = () => {
  return staticSuite(
    (model: FormModel, field: string) => {
      only(field);

      console.log('vest', field);      

      test('firstName', 'First name is required', () => {
        enforce(model.firstName).isNotBlank();
      });

      test('lastName', 'Last name is required', () => {
        enforce(model.lastName).isNotBlank();
      });
    }
   ) }


   export type FormModel = Partial<{
    userId: string;
    firstName: string;
    lastName: string;
    age: number;
    emergencyContact: string;
    passwords: Partial<{
      password: string;
      confirmPassword?: string;
    }>;}>
