import React, { useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchSuggestions } from '../api/mockApi';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductModal from '../components/ProductModal/ProductModal';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import ChatbotAI from '../components/ChatbotAI/ChatbotAI';

const HomePage = ({ favorites, onFavoriteToggle, viewHistory, onAddToHistory }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
    onAddToHistory(product); // Thêm vào lịch sử xem
  };

  const handleSuggestionClick = () => {
    setIsSuggesting(true);
    setSuggestionError('');
    fetchSuggestions('user123')
      .then(suggestedProducts => {
        // Hiển thị gợi ý lên đầu danh sách
        const remainingProducts = products.filter(p => !suggestedProducts.find(s => s.id === p.id));
        setProducts([...suggestedProducts, ...remainingProducts]);
      })
      .catch(error => {
        setSuggestionError(error.message);
      })
      .finally(() => {
        setIsSuggesting(false);
      });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = () => {
        switch(priceFilter) {
          case '<500': return product.price < 500000;
          case '500-1M': return product.price >= 500000 && product.price <= 1000000;
          case '>1M': return product.price > 1000000;
          default: return true;
        }
      };

      return matchesSearch && matchesPrice();
    });
  }, [products, searchTerm, priceFilter]);

  return (
    <div className="page-container">
      <div className="controls-container">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="price-filter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">Tất cả mức giá</option>
          <option value="<500">Dưới 500K</option>
          <option value="500-1M">500K - 1 triệu</option>
          <option value=">1M">Trên 1 triệu</option>
        </select>
        <button onClick={handleSuggestionClick} className="suggestion-btn" disabled={isSuggesting}>
          {isSuggesting ? 'Đang tìm...' : 'Gợi ý cho tôi'}
        </button>
      </div>

      {suggestionError && <p className="error-message">{suggestionError}</p>}

      <div className="product-list">
        {isLoading || isSuggesting ? (
          Array.from({ length: 4 }).map((_, index) => <LoadingSkeleton key={index} />)
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailsClick={handleDetailsClick}
              onFavoriteToggle={onFavoriteToggle}
              isFavorite={favorites.includes(product.id)}
            />
          ))
        )}
      </div>

      {viewHistory.length > 0 && (
        <div className="view-history">
          <h3>Lịch sử đã xem</h3>
          <div className="history-list">
            {viewHistory.map(product => (
              <div key={product.id} className="history-item" onClick={() => handleDetailsClick(product)}>
                <img src={product.imageUrl} alt={product.name}/>
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default HomePage;