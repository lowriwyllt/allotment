// import { createContext, useState } from "react";

// export const CurrentUserContext = createContext({});

// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});

//   return (
//     <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </CurrentUserContext.Provider>
//   );
// };

import { createContext, useState, ReactNode } from "react";

import UserType from "../types/Users.types";

interface ContextValue {
  currentUser: UserType;
  setCurrentUser: (user: UserType) => void;
}

export const CurrentUserContext = createContext<ContextValue>({
  currentUser: {} as UserType,
  setCurrentUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const CurrentUserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
