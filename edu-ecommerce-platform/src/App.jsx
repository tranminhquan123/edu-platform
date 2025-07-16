import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import FavoritesPage from './pages/FavoritePage.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewHistory, setViewHistory] = useState(() => {
    const saved = localStorage.getItem('viewHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
  }, [viewHistory]);

  const handleFavoriteToggle = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToHistory = (product) => {
    setViewHistory(prev => {
      // Tránh thêm trùng lặp và giới hạn 5 sản phẩm
      const newHistory = [product, ...prev.filter(p => p.id !== product.id)];
      return newHistory.slice(0, 5);
    });
  };

  return (
    <div className="App">
      <Header onNavigate={setCurrentPage} activePage={currentPage} />
      <main>
        {currentPage === 'home' && (
          <HomePage 
            favorites={favorites} 
            onFavoriteToggle={handleFavoriteToggle}
            viewHistory={viewHistory}
            onAddToHistory={handleAddToHistory}
          />
        )}
        {currentPage === 'favorites' && (
          <FavoritesPage 
            favorites={favorites} 
            onFavoriteToggle={handleFavoriteToggle} 
          />
        )}
      </main>
    </div>
  );
}

export default App;