// frontend-app/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you ran 'npm install axios'
import { clientLog } from './utils/logger'; // Import your client-side logger

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Log when the component mounts (first function written conceptually for frontend)
    clientLog("frontend", "info", "page", "App component loaded and trying to fetch data.");

    const fetchData = async () => {
      try {
        // This fetches from your Node.js/Express backend API
        const response = await axios.get('http://localhost:5000/api/shortened-urls');
        setData(response.data);
        clientLog("frontend", "info", "api", "Successfully fetched short URLs from backend."); // Log success
      } catch (err) {
        setError(err);
        clientLog("frontend", "error", "api", `Failed to fetch data: ${err.message}`); // Log error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading shortened URLs...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>My Basic URL Shortener (Frontend)</h1>
      <p>This is a very basic app to demonstrate required setup.</p>
      <h2>Shortened URLs (from backend)</h2>
      {data.length === 0 ? (
        <p>No URLs found yet.</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id} style={{ marginBottom: '10px' }}>
              <strong>Original:</strong> {item.originalUrl}<br/>
              <strong>Short Code:</strong> {item.shortCode}<br/>
              <strong>Clicks:</strong> {item.clicks}
            </li>
          ))}
        </ul>
      )}
      {/* This is where your actual URL shortener form and stats display would go */}
    </div>
  );
}

export default App;