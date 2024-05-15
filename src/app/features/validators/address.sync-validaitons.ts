import { create, enforce, mode, omitWhen, only, staticSuite, test } from 'vest';
import 'vest/enforce/email';
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

      test('email', 'A valid EMail is required', () => {
        enforce(model.email).isEmail();
      });

      test('age', 'Age is required', () => {
        enforce(model.age).isNotBlank();
        enforce(model.age).isNumeric();
        enforce(model.age).isPositive();
      });

      omitWhen(((model.age || 0)>=18), () => {
        test('emergencyContact', 'Emergency Contact is required if you are under the age of 18', () => {
          enforce(model.emergencyContact).isNotBlank();
        });
      });

      test('passwords.password', 'Password is required', () => {
        enforce(model.passwords?.password).isNotBlank();
      });

      // test('passwords', 'Passwords must match', () => {
      //   enforce(model.passwords?.password).equals(model.passwords?.confirmPassword);
      // });

      // omitWhen(!model.passwords?.password || !model.passwords?.confirmPassword, () => {
      //   test('passwords', 'Passwords must match', () => {
      //     enforce(model.passwords?.password).equals(model.passwords?.confirmPassword);
      //   });
      // });
    }
  )
}


export type FormModel = Partial<{
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  emergencyContact: string;
  passwords: Partial<{
    password: string;
    confirmPassword?: string;
  }>;
}>
