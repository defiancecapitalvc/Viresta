import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe, login as loginRequest, logout as logoutRequest, register as registerRequest } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      async login(body) {
        const data = await loginRequest(body);
        setUser(data.user);
        return data;
      },
      async register(body) {
        const data = await registerRequest(body);
        setUser(data.user);
        return data;
      },
      async logout() {
        await logoutRequest().catch(() => {});
        setUser(null);
      },
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
