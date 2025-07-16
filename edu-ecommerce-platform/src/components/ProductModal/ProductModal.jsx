import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <img src={product.imageUrl} alt={product.name} className="modal-image" />
        <div className="modal-info">
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-price">{formattedPrice}</p>
          <p className="modal-description">{product.longDescription}</p>
          <div className="modal-reviews">
            <h3>Đánh giá</h3>
            {product.reviews.length > 0 ? (
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.user}:</strong> "{review.comment}"
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;