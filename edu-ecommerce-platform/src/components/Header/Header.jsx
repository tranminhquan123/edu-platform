import React from 'react';
import './Header.css';

const Header = ({ onNavigate, activePage }) => {
  return (
    <header className="app-header">
      <h1 className="logo">EduPlatform</h1>
      <nav>
        <button 
          onClick={() => onNavigate('home')} 
          className={activePage === 'home' ? 'active' : ''}
        >
          Trang chủ
        </button>
        <button 
          onClick={() => onNavigate('favorites')} 
          className={activePage === 'favorites' ? 'active' : ''}
        >
          Yêu thích
        </button>
      </nav>
    </header>
  );
};

export default Header;