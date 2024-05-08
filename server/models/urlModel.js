const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ip: String,
  userAgent: String,
});

const UrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  visits: [VisitSchema],
});

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;
