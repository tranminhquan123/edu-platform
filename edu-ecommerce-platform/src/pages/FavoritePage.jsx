import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductModal from '../components/ProductModal/ProductModal';
import { fetchProducts } from '../api/mockApi';

const FavoritesPage = ({ favorites, onFavoriteToggle }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then(data => setAllProducts(data));
  }, []);
  
  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));

  return (
    <div className="page-container">
      <h2>Khóa học yêu thích của bạn</h2>
      {favoriteProducts.length > 0 ? (
        <div className="product-list">
          {favoriteProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailsClick={setSelectedProduct}
              onFavoriteToggle={onFavoriteToggle}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <p>Bạn chưa yêu thích khóa học nào.</p>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default FavoritesPage;