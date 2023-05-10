import { PlantType } from "./Plants.types";


export type UserType = {
  name: string;
  email: string | null;
  avatarUrl?: string;
  displayName?: string;
  allotment: Array<Object>; //should we delete this?
  id: any;
  usersPlants: any;
};

export type createUserProps = {
  name: string;
  emailLowerCase: string;
  avatarUrl: string;
};

// export type TaskType = {
//   img: string;
//   complete: boolean;
//   date: Object,
//   body: string
// };

export type TaskType = {
  img: string;
  completed: boolean;
  // date: Object;
  body: string;
  repeatsInDays: number;
  startingDate: string;
  endingDate: string;
  plant: string;
  category: string;
  nextTaskDate: string;
};

// export type UsersAllotment = PlantType[];
