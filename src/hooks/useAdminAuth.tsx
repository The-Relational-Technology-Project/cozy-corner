
import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'admin2024!';
const ADMIN_SESSION_KEY = 'cozy_corner_admin_session';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      if (session) {
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();
        if (sessionData.expires > now) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      const expires = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ expires }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};
