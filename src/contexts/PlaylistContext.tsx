import { createContext, useContext, useState } from "react";

type PlaylistContextType = {
  id: string | null;
  setId: (id: string | null) => void;
};

export const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
);

export function usePlaylist() {
  return useContext(PlaylistContext);
}

export const PlaylistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [id, setId] = useState<string | null>(null);

  return (
    <PlaylistContext.Provider value={{ id, setId }}>
      {children}
    </PlaylistContext.Provider>
  );
};
