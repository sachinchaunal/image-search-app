import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TopSearches from './TopSearches';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import SearchHistory from './SearchHistory';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [topSearches, setTopSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetchTopSearches();
    fetchSearchHistory();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await api.search.getTopSearches();
      setTopSearches(response.data);
    } catch (error) {
      console.error('Failed to fetch top searches:', error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await api.search.getHistory();
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch search history:', error);
    }
  };

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setSelectedImages([]);
    
    try {
      const response = await api.search.searchImages(term);
      setSearchResults(response.data);
      
      // Refresh top searches and history
      fetchTopSearches();
      fetchSearchHistory();
    } catch (error) {
      console.error('Search failed:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleSelectAll = () => {
    if (searchResults && searchResults.images) {
      if (selectedImages.length === searchResults.images.length) {
        setSelectedImages([]);
      } else {
        setSelectedImages(searchResults.images.map(img => img.id));
      }
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image to download');
      return;
    }

    try {
      setDownloading(true);
      const zip = new JSZip();
      const folder = zip.folder('selected-images');

      // Get selected image objects
      const imagesToDownload = searchResults.images.filter(img => 
        selectedImages.includes(img.id)
      );

      // Download each image and add to zip
      const downloadPromises = imagesToDownload.map(async (image, index) => {
        try {
          const response = await fetch(image.url);
          const blob = await response.blob();
          const extension = blob.type.split('/')[1] || 'jpg';
          const filename = `${image.photographer.replace(/\s+/g, '_')}_${index + 1}.${extension}`;
          folder.file(filename, blob);
        } catch (error) {
          console.error(`Failed to download image ${image.id}:`, error);
        }
      });

      await Promise.all(downloadPromises);

      // Generate zip file
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${searchResults.term}_images.zip`);

      alert(`Successfully downloaded ${selectedImages.length} image(s)!`);
    } catch (error) {
      console.error('Failed to download images:', error);
      alert('Failed to download images. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🖼️ Image Search & Multi-Select</h1>
          <div className="user-section">
            <img 
              src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=667eea&color=fff&size=40`} 
              alt={user?.displayName || 'User'}
              className="user-avatar"
              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=667eea&color=fff&size=40`; }}
            />
            <span className="user-name">{user?.displayName || 'User'}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <TopSearches searches={topSearches} onSearchClick={handleSearch} />

      <div className="dashboard-body">
        <main className="main-content">
          <SearchBar onSearch={handleSearch} loading={loading} />

          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Searching for images...</p>
            </div>
          )}

          {searchResults && !loading && (
            <>
              <div className="results-header">
                <h2>
                  You searched for "{searchResults.term}" -- {searchResults.count} results
                </h2>
                <div className="results-actions">
                  <div className="selected-counter">
                    Selected: {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''}
                  </div>
                  <div>
                    <button 
                      className="select-all-btn"
                      onClick={handleSelectAll}
                    >
                      {selectedImages.length === searchResults.images.length ? 'Deselect All' : 'Select All'}
                    </button>
                    <button 
                      className="download-btn"
                      onClick={handleDownloadSelected}
                      disabled={selectedImages.length === 0 || downloading}
                    >
                      {downloading ? 'Downloading...' : `📥 Download (${selectedImages.length})`}
                    </button>
                  </div>
                </div>
              </div>

              <ImageGrid 
                images={searchResults.images}
                selectedImages={selectedImages}
                onImageSelect={handleImageSelect}
              />
            </>
          )}

          {!searchResults && !loading && (
            <div className="welcome-message">
              <h2>Welcome to Image Search! 🎨</h2>
              <p>Start searching for amazing images from Unsplash</p>
              <p className="tip">💡 Try searching for: nature, technology, people, architecture</p>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <SearchHistory 
            history={searchHistory} 
            onHistoryClick={handleSearch}
          />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
