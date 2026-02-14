export interface Playlist {
  id: string;
  name: string;
  // Add other properties based on your Spotify API response
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface TokenStorage {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: string | null;
  expires: string | null;
  save: (response: TokenResponse) => void;
}
