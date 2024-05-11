"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { decodeToken } from "@/_utils/utils";
import { JwtProps } from "@/definitions";

interface UserContextProps {
  user: JwtProps | null;
  setUser: (user: JwtProps | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<JwtProps | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedUser = decodeToken(jwt);
      setUser(decodedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
