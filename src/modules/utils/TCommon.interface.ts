export type Tcontacts = {
  homeMobile: string;
  officeMobile: string;
  email: string;
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
  date_of_birth: string;
  gender: string;
  profile_image: string;
};

export type TGuardian = {
  relation?: string;
  name?: string;
  contactNumber?: string;
  address?: string;
};

export type TSchedule =
  | "9:00 AM"
  | "10:00 AM"
  | "11:00 AM"
  | "12:00 PM"
  | "1:00 PM"
  | "2:00 PM"
  | "3:00 PM"
  | "4:00 PM"
  | "5:00 PM"
  | "6:00 PM";

export type TRole = ["doctor" | "nurse" | "admin" | "staff" | "patient"];

/* for global error handler */
export type TErrorSources = {
  path: string;
  message: string;
};
