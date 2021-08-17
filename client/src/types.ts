export interface Vacation {
  vacID: number;
  vacDest: string;
  vacDesc: string;
  startDate: string;
  endDate: string;
  vacPrice: string;
  vacImage: string;
}

export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  userName: string;
  userType: number;
}
