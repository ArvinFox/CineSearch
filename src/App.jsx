import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./styles/index.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <Header
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage searchQuery={searchQuery} />}
                />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
