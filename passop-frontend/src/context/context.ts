import React, { createContext } from "react";

interface passwords {
  _id: string;
  siteName: string;
  siteURL: string;
  username: string;
  password: string;
}

export interface AppContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passes: passwords[] | null;
  setPasses: React.Dispatch<React.SetStateAction<passwords[]>>;
  editingPass: passwords | null;
  setEditingPass: React.Dispatch<React.SetStateAction<passwords | null>>;
}

export const AppContext = createContext<AppContextType | null>(null);
