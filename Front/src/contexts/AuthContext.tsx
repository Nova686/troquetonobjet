import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../typings/Auth";
import Cookies from "js-cookie";

const login = (user: User, token: string) => {
  setUser(user);
};

const logout = () => {
  setUser(null);
  Cookies.remove("auth_token");
};

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("auth_token", token, { secure: true, sameSite: "strict" });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
