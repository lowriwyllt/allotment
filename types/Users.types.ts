type UserType = {
  name: string;
  email: string | null;
  avatarUrl?: string;
  displayName?: string;
  allotment: Array<Object>;
  id: any;
};

export default UserType;
