"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("paisabank-token");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = (token: string): void => {
    localStorage.setItem("paisabank-token", token);
    const isSecure = window.location.protocol === "https:";
    document.cookie = `paisabank-token=${token}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    setIsAuthenticated(true);
    router.push("/");
  };

  const logout = (): void => {
    localStorage.removeItem("paisabank-token");
    const isSecure = window.location.protocol === "https:";
    document.cookie = `paisabank-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

