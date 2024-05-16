export type Address = Partial <{
  street: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  postalCode:string | null;
  verified?: boolean;
}>
