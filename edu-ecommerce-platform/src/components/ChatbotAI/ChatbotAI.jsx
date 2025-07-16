import React, { useState, useEffect, useRef } from 'react';
import './ChatbotAI.css';

const ChatbotAI = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp bạn tìm kiếm và tư vấn sản phẩm phù hợp. Hãy cho tôi biết bạn đang tìm kiếm gì?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock AI responses based on keywords
  const aiResponses = {
    'reactjs': {
      response: 'Tôi thấy bạn quan tâm đến ReactJS! Đây là một framework JavaScript rất phổ biến. Tôi có thể gợi ý cho bạn:',
      products: ['reactjs', 'javascript', 'frontend']
    },
    'javascript': {
      response: 'JavaScript là ngôn ngữ lập trình cốt lõi cho web development. Đây là những khóa học phù hợp:',
      products: ['javascript', 'reactjs', 'frontend']
    },
    'vuejs': {
      response: 'VueJS là framework JavaScript dễ học và mạnh mẽ. Tôi gợi ý những khóa học sau:',
      products: ['vuejs', 'javascript', 'frontend']
    },
    'frontend': {
      response: 'Frontend development là lĩnh vực rất thú vị! Đây là các khóa học tôi đề xuất:',
      products: ['reactjs', 'vuejs', 'javascript']
    },
    'backend': {
      response: 'Backend development cũng rất quan trọng! Tôi có thể gợi ý:',
      products: ['javascript', 'nodejs']
    },
    'fullstack': {
      response: 'Fullstack development sẽ giúp bạn phát triển toàn diện! Đây là lộ trình học tập:',
      products: ['javascript', 'reactjs', 'nodejs']
    },
    'học lập trình': {
      response: 'Học lập trình là hành trình tuyệt vời! Tôi gợi ý bạn bắt đầu với:',
      products: ['javascript', 'reactjs']
    },
    'mới bắt đầu': {
      response: 'Tuyệt vời! Với người mới bắt đầu, tôi khuyên bạn nên học theo thứ tự:',
      products: ['javascript', 'reactjs']
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantProducts = (message) => {
    const keywords = Object.keys(aiResponses);
    const foundKeywords = keywords.filter(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (foundKeywords.length > 0) {
      return aiResponses[foundKeywords[0]];
    }
    
    return null;
  };

  const generateAIResponse = (userMessage) => {
    const relevantInfo = findRelevantProducts(userMessage);
    
    if (relevantInfo) {
      const suggestedProducts = products.filter(product => 
        relevantInfo.products.some(keyword => 
          product.name.toLowerCase().includes(keyword) ||
          product.shortDescription.toLowerCase().includes(keyword)
        )
      );
      
      return {
        response: relevantInfo.response,
        products: suggestedProducts.slice(0, 3) // Limit to 3 products
      };
    }
    
    // Default response
    return {
      response: 'Tôi hiểu bạn đang tìm kiếm thông tin. Bạn có thể cho tôi biết cụ thể hơn về loại khóa học nào bạn quan tâm? Ví dụ: ReactJS, JavaScript, VueJS, Frontend, Backend...',
      products: products.slice(0, 3)
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResult = generateAIResponse(inputValue);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResult.response,
        timestamp: new Date(),
        products: aiResult.products
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-title">
                <div className="bot-avatar">🤖</div>
                <div>
                  <h3>AI Assistant</h3>
                  <span className="status">Đang hoạt động</span>
                </div>
              </div>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                  <div className="message-content">
                    <p>{message.content}</p>
                    
                    {message.products && message.products.length > 0 && (
                      <div className="product-suggestions">
                        <h4>Gợi ý sản phẩm:</h4>
                        {message.products.map((product) => (
                          <div key={product.id} className="suggested-product">
                            <img src={product.imageUrl} alt={product.name} />
                            <div className="product-info">
                              <h5>{product.name}</h5>
                              <p>{product.shortDescription}</p>
                              <span className="price">{formatPrice(product.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chatbot-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                disabled={isTyping}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping || !inputValue.trim()}
                className="send-btn"
              >
                📤
              </button>
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default ChatbotAI;