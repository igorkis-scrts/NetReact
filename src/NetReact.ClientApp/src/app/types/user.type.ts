export type User = {
  id: number;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  points: number | null;
  userContact: UserContact | null;
};

export type UserContact = {
  phoneNumber: string | null;
  email: string | null;
  zipCode: string | null;
  city: string | null;
  region: string | null;
  streetAddress: string | null;
};