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
  fullame: {
    firstame: string;
    middleame: string;
    lastame: string;
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
  ame?: string;
  contactNumber?: string;
  address?: string;
};

export type TErrorSources = {
  path: string;
  message: string;
};

export type TSchedule =
  | "9:00am"
  | "9:30am"
  | "10:00am"
  | "10:30am"
  | "11:00am"
  | "11:30am"
  | "12:00pm"
  | "1:30pm"
  | "2:00pm"
  | "2:30pm"
  | "3:00pm"
  | "3:30pm"
  | "4:00pm"
  | "4:30pm"
  | "5:00pm"
  | "5:30pm";

export type TRole = ["doctor" | "nurse" | "admin" | "staff" | "patient"];
