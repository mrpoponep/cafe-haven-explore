import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("cafe_haven_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, _password: string) => {
    const userData = { username, email: `${username}@example.com` };
    setUser(userData);
    localStorage.setItem("cafe_haven_user", JSON.stringify(userData));
  };

  const signup = (username: string, email: string, _password: string) => {
    const userData = { username, email };
    setUser(userData);
    localStorage.setItem("cafe_haven_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cafe_haven_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
