export type UserType = {
  name: string;
  email: string | null;
  avatarUrl?: string;
  displayName?: string;
  allotment: Array<Object>;
  tasks: Array<Object>
  id: any;
};

export type createUserProps = {
  name: string;
  emailLowerCase: string;
  avatarUrl: string;
};

export type TaskType = {
  img: string;
  complete: boolean;
  date: Object,
  body: string
};
