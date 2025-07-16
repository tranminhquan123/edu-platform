import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onDetailsClick, onFavoriteToggle, isFavorite }) => {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>
        <p className="product-price">{formattedPrice}</p>
      </div>
      <div className="product-actions">
        <button onClick={() => onDetailsClick(product)} className="details-btn">
          Xem chi tiết
        </button>
        <button 
          onClick={() => onFavoriteToggle(product.id)} 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default ProductCard;