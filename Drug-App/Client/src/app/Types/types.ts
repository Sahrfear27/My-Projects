export interface UserType {
  _id: string;
  fullname: string;
  email: string;
  password: string; //change to jwt
  confirm_password?: string;
}

export interface UserStateType {
  _id: string;
  fullname: string;
  email: string;
  jwt: string;
}

export const initial_state = {
  _id: '',
  fullname: 'User',
  email: '',
  jwt: '',
};

export interface MedicationType {
  _id: string;
  name: string;
  first_letter: string;
  generic_name: string;
  medication_class: string;
  availability: string;
  image?: ImageType;
  added_by: OwnerType;
  reviews?: ReviewType[];
}
export interface ImageType {
  _id: string;
  filename?: string;
}
export interface OwnerType {
  email: string;
  fullname: string;
  user_id: string;
}
export const initial_drug_state = {
  _id: '', //just added
  name: '',
  first_letter: '',
  generic_name: '',
  medication_class: '',
  availability: '',
  image: '',
  added_by: '',
  reviews: [],
};
export type ReviewType = {
  _id?: string;
  review: string;
  rating: number;
  // by?: string;
  by?: { user_id: string; fullname: string };
  date?: string;
};

export const initial_review = {
  review: '',
  rating: 0,
  // by: '',
  // date: '',
};
