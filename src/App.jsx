import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/index.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        <Header
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="flex-1">
          <HomePage searchQuery={searchQuery} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
