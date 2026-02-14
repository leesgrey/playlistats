import { clientId, redirectUri } from "utils/constants";

const authorizationEndpoint = "https://accounts.spotify.com/authorize";

const scopes = [
  "user-read-recently-played",
  "playlist-read-collaborative",
  "playlist-read-private",
];

async function redirectToAuth() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    "",
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed)),
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scopes.join(" "),
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

function Login() {
  return (
    <div id="loginDisplay">
      <h1>playlistats</h1>
      <p>generate spotify playlist statistics</p>
      <button id="loginButton" onClick={redirectToAuth}>
        Login with Spotify
      </button>
    </div>
  );
}

export default Login;
