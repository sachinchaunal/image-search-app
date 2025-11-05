import React from 'react';
import './TopSearches.css';

const TopSearches = ({ searches, onSearchClick }) => {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <div className="top-searches-content">
        <span className="banner-label">🔥 Top Searches:</span>
        <div className="search-tags">
          {searches.map((search, index) => (
            <button
              key={index}
              className="search-tag"
              onClick={() => onSearchClick(search.term)}
            >
              {search.term}
              <span className="search-count">{search.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSearches;
