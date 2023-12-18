/* eslint-disable @typescript-eslint/no-explicit-any */
export type TContact = {
  phone: string[];
  email: string[];
  address: string[];
};

export type TEducation = {
  institute: string;
  degree: string;
  year: number;
};

export type TPersonalInfo = {
  fullName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    present_address: string;
    permanent_address: string;
  };
  dateOfBirth: string;
  gender: string;
  profileImage: string;
};

export type TGuardian = {
  relation?: string;
  name?: string;
  contactNumber?: string;
  address?: string;
};

export type Tschedules =
  | "9:00am"
  | "9.30am"
  | "10:00am"
  | "10:30am"
  | "11:00am"
  | "11:30am"
  | "12:00pm"
  | "12:30pm"
  | "2:00pm"
  | "2:30pm"
  | "3:00pm"
  | "3:30pm"
  | "4:00pm"
  | "4:30pm"
  | "5:00pm"
  | "5:30pm";

export type TRole = ["doctor" | "nurse" | "admin" | "staff" | "patient"];

/* for global error handler */
export type TErrorSources = {
  path: any;
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources[];
};
