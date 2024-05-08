const shortid = require('shortid');
const Url = require('../models/urlModel');

 const  urlList = async (req, res) => {
    try {
      const urls = await Url.find({}).sort({ 'visits.timestamp': -1 });
      const urlsWithHistory = urls.map(url => ({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        visitCount: url.visits.length,
        lastVisitDate: url.visits.length > 0 ? url.visits[url.visits.length - 1].timestamp : null, 
        visitorIps: url.visits.map(visit => visit.ip),
        qrScans:`${req.hostname}/${url.shortUrl}`
      }));
      res.json(urlsWithHistory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}


 const shorten=async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();
    await Url.create({ originalUrl, shortUrl });
    res.json({ originalUrl, shortUrl });
}


 const shortUrl= async (req, res) => {
    const { shortUrl }    = req.params;
    const { ip, headers } = req;
    const userAgent = headers['user-agent'];

    try {
      const url = await Url.findOne({ shortUrl });
      if (!url) {
         return res.status(404).json({ error: 'URL not found' });
      }
    
      url.visits.push({ ip, userAgent });
      await url.save();
  
      res.redirect(url.originalUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports ={shortUrl,shorten,urlList}