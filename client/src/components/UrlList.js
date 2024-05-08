import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import {RootPath} from '../config/path';
const UrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(RootPath+'urls');
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div>
    <h1>URL List</h1>
    <table>
      <thead>
        <tr>
          <th>Original URL</th>
          <th>Shortened URL</th>
          <th>Visit Count</th>
          <th>last Visit Date</th>
          <th>QR Code</th>
        </tr>
      </thead>
      <tbody>
        {urls.map(url => (
          <tr key={url.shortUrl}>
            <td>{url.originalUrl}</td>
            <td><a href={`${RootPath}/${url.shortUrl}`} target="_blank">{url.shortUrl}</a></td>
            <td>{url.visitCount}</td>
            <td>{url.lastVisitDate}</td>
            <td><QRCode value={url.qrScans} /></td>
          </tr> 
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default UrlList;
