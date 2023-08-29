import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
export const UserContext = createContext({});

export function UserContexteProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          if (data) {
            setUser(data);
            setIsLoggedIn(true);
            setReady(true);
          } else {
            setIsLoggedIn(false);
            setReady(true);
            return <Navigate to="/" />;
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération du profil de l'utilisateur :",
            error
          );
        });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, ready }}
    >
      {children}
    </UserContext.Provider>
  );
}
