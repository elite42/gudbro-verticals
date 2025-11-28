/**
 * Wellness Module - Express Server
 * Handles API requests for spa/massage/beauty businesses
 */

const express = require('express');
const cors = require('cors');
const wellnessRoutes = require('./routes/wellness');

const app = express();
const PORT = process.env.PORT || 3013;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'wellness-module', version: '1.0.0' });
});

// API Routes
app.use('/api/wellness', wellnessRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Wellness API running on http://localhost:${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`🌺 Endpoints:`);
  console.log(`   GET  /api/wellness/:hubId - Business info`);
  console.log(`   GET  /api/wellness/:hubId/services - List services`);
  console.log(`   GET  /api/wellness/:hubId/staff - List staff`);
  console.log(`   GET  /api/wellness/:hubId/staff/:staffId - Staff details`);
  console.log(`   POST /api/wellness/:hubId/booking - Create booking`);
});

module.exports = app;
