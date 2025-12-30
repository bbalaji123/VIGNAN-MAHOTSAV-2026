import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache for location data
let statesCache = null;
let districtsCache = null;
let collegesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Load and cache location data from JSON files
 */
async function loadLocationData() {
  try {
    // Use backend's own data folder instead of public folder
    const dataPath = path.join(__dirname, '../data');
    
    // Check if cache is still valid
    if (cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      logger.info('📍 Using cached location data');
      return;
    }

    logger.info('📍 Loading location data from files...');
    logger.info(`📁 Data path: ${dataPath}`);
    
    // Load all files in parallel for better performance
    const [statesData, districtsData, collegesData] = await Promise.all([
      fs.readFile(path.join(dataPath, 'state.json'), 'utf-8'),
      fs.readFile(path.join(dataPath, 'district.json'), 'utf-8'),
      fs.readFile(path.join(dataPath, 'college.json'), 'utf-8')
    ]);

    // Parse JSON data
    statesCache = JSON.parse(statesData);
    districtsCache = JSON.parse(districtsData);
    
    // Parse and process colleges
    const rawColleges = JSON.parse(collegesData);
    
    // Filter out invalid entries
    const validColleges = rawColleges.filter(c => c && c.Name && typeof c.Name === 'string');
    
    // Remove duplicates (case-insensitive) and keep first occurrence
    const seen = new Set();
    const uniqueColleges = validColleges.filter(college => {
      const lowerName = college.Name.toLowerCase().trim();
      if (seen.has(lowerName)) {
        return false;
      }
      seen.add(lowerName);
      return true;
    });
    
    // Sort alphabetically by name for better UX
    collegesCache = uniqueColleges.sort((a, b) => 
      a.Name.localeCompare(b.Name)
    );
    
    cacheTimestamp = Date.now();
    
    logger.info(`✅ Location data loaded successfully`);
    logger.info(`📊 States: ${statesCache.length}, Districts: ${districtsCache.length}, Colleges: ${collegesCache.length}`);
    
  } catch (error) {
    logger.error('❌ Error loading location data:', error);
    throw error;
  }
}

// Initialize cache on server startup
loadLocationData().catch(err => {
  logger.error('Failed to initialize location data:', err);
});

/**
 * GET /api/location/states
 * Get all states
 */
router.get('/location/states', async (req, res) => {
  try {
    // Ensure data is loaded
    if (!statesCache) {
      await loadLocationData();
    }

    res.json({
      success: true,
      count: statesCache.length,
      data: statesCache
    });
  } catch (error) {
    logger.error('Error fetching states:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching states'
    });
  }
});

/**
 * GET /api/location/districts
 * Get all districts (optionally filtered by state)
 * Query params: ?stateNo=<state_no>
 */
router.get('/location/districts', async (req, res) => {
  try {
    // Ensure data is loaded
    if (!districtsCache) {
      await loadLocationData();
    }

    const { stateNo } = req.query;
    
    let districts = districtsCache;
    
    // Filter by state if provided
    if (stateNo) {
      districts = districtsCache.filter(d => d.sno === stateNo);
    }

    res.json({
      success: true,
      count: districts.length,
      data: districts
    });
  } catch (error) {
    logger.error('Error fetching districts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching districts'
    });
  }
});

/**
 * GET /api/location/colleges
 * Get all colleges (optionally filtered by state and/or district)
 * Query params: ?state=<state_name>&district=<district_name>
 */
router.get('/location/colleges', async (req, res) => {
  try {
    // Ensure data is loaded
    if (!collegesCache) {
      await loadLocationData();
    }

    const { state, district } = req.query;
    
    let colleges = collegesCache;
    
    // Filter by state if provided
    if (state) {
      colleges = colleges.filter(c => 
        c.State.toLowerCase() === state.toLowerCase()
      );
    }
    
    // Filter by district if provided
    if (district) {
      colleges = colleges.filter(c => 
        c.District.toLowerCase() === district.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (error) {
    logger.error('Error fetching colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching colleges'
    });
  }
});

/**
 * POST /api/location/reload-cache
 * Admin endpoint to reload cache manually
 */
router.post('/location/reload-cache', async (req, res) => {
  try {
    cacheTimestamp = null; // Invalidate cache
    await loadLocationData();
    
    res.json({
      success: true,
      message: 'Location data cache reloaded successfully',
      stats: {
        states: statesCache.length,
        districts: districtsCache.length,
        colleges: collegesCache.length
      }
    });
  } catch (error) {
    logger.error('Error reloading cache:', error);
    res.status(500).json({
      success: false,
      message: 'Error reloading cache'
    });
  }
});

export default router;
