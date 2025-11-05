import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configure axios defaults
axios.defaults.withCredentials = true;

const api = {
  // Auth endpoints
  auth: {
    getUser: () => axios.get(`${API_BASE_URL}/auth/user`),
    logout: () => axios.get(`${API_BASE_URL}/auth/logout`)
  },

  // Search endpoints
  search: {
    getTopSearches: () => axios.get(`${API_BASE_URL}/api/top-searches`),
    searchImages: (term) => axios.post(`${API_BASE_URL}/api/search`, { term }),
    getHistory: () => axios.get(`${API_BASE_URL}/api/history`)
  },

  // OAuth login URLs
  getOAuthUrl: (provider) => `${API_BASE_URL}/auth/${provider}`
};

export default api;
