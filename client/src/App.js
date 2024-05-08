import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import UrlList from './components/UrlList'
import {RootPath} from './config/path';
function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(RootPath+'shorten', { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container">
      <div class="header">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      </div>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          Short URL: <a href={`${RootPath}${shortUrl}`}>{`${RootPath}${shortUrl}`}</a>
        </div>
      )}
       <div class="url-list">

       
      <UrlList />
     

      </div>
    </div>
  );
}

export default App;
