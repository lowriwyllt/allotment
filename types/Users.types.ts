export type UserType = {
  name: string;
  email: string | null;
  avatarUrl?: string;
  displayName?: string;
  allotment: Array<Object>;
  id: any;
  usersPlants: any;
};

export type createUserProps = {
  name: string;
  emailLowerCase: string;
  avatarUrl: string;
};

export type TaskType = {
  img: string;
  completed: boolean;
  body: string;
  repeatsInDays: number;
  startingDate: string;
  endingDate: string;
  plant: string;
  category: string;
  nextTaskDate: string;
};
