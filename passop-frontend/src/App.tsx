import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { AppContext } from "./context/context";
import type { Inputs } from "./types/interfaces";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingPass, setEditingPass] = useState<Inputs | null>(null);
  const [passes, setPasses] = useState<Inputs[]>([]);

  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isFormOpen,
        setIsFormOpen,
        passes,
        setPasses,
        editingPass,
        setEditingPass,
      }}
    >
      <section className="relative min-h-screen flex flex-col">
        <div
          className={`absolute inset-0 bg-blueprint pointer-events-none -z-10 ${isFormOpen ? "blur-xs" : ""}`}
        />
        <Navbar />
      </section>
    </AppContext.Provider>
  );
}

export default App;
