import { useState, useEffect } from "react";
import "./App.css";
import * as calls from "../../services/calls";
import type { TokenResponse } from "../../types";
import { PAGE_SIZE } from "../../utils/constants";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to save token to localStorage
  const saveToken = (response: TokenResponse) => {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in.toString());
    localStorage.setItem(
      "expires",
      (Date.now() + expires_in * 1000).toString(),
    );
    setToken(access_token);
  };

  // Handle token exchange on mount
  useEffect(() => {
    const handleAuth = async () => {
      // Check if we're in a callback with a code
      const args = new URLSearchParams(window.location.search);
      const code = args.get("code");

      if (code) {
        try {
          // Exchange code for token
          const response = await calls.getToken(code);
          saveToken(response);

          // Clean up the URL
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updatedUrl = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updatedUrl);
        } catch (error) {
          console.error("Token exchange failed:", error);
        }
      } else {
        // No code in URL, check if we have a stored token
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
          setToken(storedToken);
        }
      }

      setIsLoading(false);
    };

    handleAuth();
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      {token ? (
        <div id="loginDisplay">Login</div>
      ) : (
        <div id="dashboard">Dashboard</div>
      )}
    </div>
  );
}

export default App;
