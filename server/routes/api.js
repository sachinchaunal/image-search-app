const express = require('express');
const axios = require('axios');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const Search = require('../models/Search');

// GET /api/top-searches - Get top 5 most frequent search terms across all users
router.get('/top-searches', isAuthenticated, async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          term: '$_id',
          count: 1
        }
      }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Error fetching top searches:', error);
    res.status(500).json({ 
      error: 'Failed to fetch top searches',
      message: error.message 
    });
  }
});

// POST /api/search - Search for images using Unsplash API
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;

    if (!term || term.trim() === '') {
      return res.status(400).json({ 
        error: 'Search term is required' 
      });
    }

    const trimmedTerm = term.trim().toLowerCase();

    // Store search in database
    await Search.create({
      userId: req.user._id,
      term: trimmedTerm,
      timestamp: new Date()
    });

    // Fetch images from Unsplash API
    const unsplashResponse = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: trimmedTerm,
        per_page: 30,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const images = unsplashResponse.data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumbnail: img.urls.small,
      description: img.description || img.alt_description || 'No description',
      photographer: img.user.name,
      photographerUrl: img.user.links.html
    }));

    res.json({
      term: trimmedTerm,
      count: images.length,
      images: images
    });

  } catch (error) {
    console.error('Error searching images:', error);
    
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: 'Invalid Unsplash API key',
        message: 'Please check your UNSPLASH_ACCESS_KEY in .env file'
      });
    }

    res.status(500).json({ 
      error: 'Failed to search images',
      message: error.message 
    });
  }
});

// GET /api/history - Get user's search history
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp -_id');

    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ 
      error: 'Failed to fetch search history',
      message: error.message 
    });
  }
});

module.exports = router;
