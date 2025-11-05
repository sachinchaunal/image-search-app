import React from 'react';
import './SearchHistory.css';

const SearchHistory = ({ history, onHistoryClick }) => {
  if (!history || history.length === 0) {
    return (
      <div className="search-history">
        <h3>Your Search History</h3>
        <p className="empty-message">No search history yet. Start searching!</p>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="search-history">
      <h3>Your Search History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div 
            key={index} 
            className="history-item"
            onClick={() => onHistoryClick(item.term)}
          >
            <div className="history-content">
              <span className="history-icon">🔍</span>
              <div className="history-details">
                <p className="history-term">{item.term}</p>
                <p className="history-time">{formatTime(item.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
