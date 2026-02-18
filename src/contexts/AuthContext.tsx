import { createContext, useState, useContext, useEffect } from "react";
import type { TokenResponse } from "../types";
import * as calls from "../services/calls";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Save token data to localStorage
  const saveToken = (response: TokenResponse) => {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in.toString());
    localStorage.setItem(
      "expires",
      (Date.now() + expires_in * 1000).toString(),
    );
    if (setToken) {
      setToken(access_token);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      // Check if we're in auth callback with a code
      const args = new URLSearchParams(window.location.search);
      const code = args.get("code");

      if (code) {
        try {
          // Exchange code for token
          const response = await calls.getToken(code);
          console.log("Token exchange response:", response);
          saveToken(response);

          // Clean up the URL for clean refresh
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updatedUrl = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updatedUrl);
        } catch (error) {
          console.error("Token exchange failed:", error);
        }
      } else {
        const storedToken = localStorage.getItem("access_token");
        const expiresAt = localStorage.getItem("expires_in");
        if (storedToken && expiresAt && Date.now() < parseInt(expiresAt)) {
          console.log("Token is valid, loading from localStorage");
          setToken(storedToken);
          console.log("Token loaded from localStorage:", storedToken);
          console.log("Token expires at:", localStorage.getItem("expires"));
        } else {
          console.log("No valid token found, user needs to log in");
          saveToken({ access_token: "", refresh_token: "", expires_in: 0 }); // Clear any invalid token data
        }
      }

      setIsLoading(false);
    };

    handleAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
