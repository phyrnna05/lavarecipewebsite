import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Cocktails from './pages/Cocktails';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-black text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/cocktails" element={<Cocktails />} />
              <Route path="/:type/:id" element={<RecipeDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;