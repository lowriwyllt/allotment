type UserType = {
  name: string;
  email: string | null;
  avatarUrl?: string;
  displayName?: string;
  allotment: Array<Object>;
  tasks: Array<Object>
  id: any;
};

export default UserType;
