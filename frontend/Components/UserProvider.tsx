 
import { createContext, useState } from "react";
import { Outlet } from "react-router";

type User = {
  name: string | null;
  role: string | null;
};
type UserContext = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContext>({
  user: {
    name: null,
    role: null,
  },
  setUser: () => {},
});

export function UserProvider() {
  const [user, setUser] = useState<User>({ name: null, role: null });

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
}
