import React, { useState, useEffect } from 'react';
import './App.css';
import URLForm from './components/URLForm';
import URLList from './components/URLList';

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/urls');
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleUrlCreated = (newUrl) => {
    setUrls([newUrl, ...urls]);
  };

  const handleUrlDeleted = (shortCode) => {
    setUrls(urls.filter(url => url.short_code !== shortCode));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-lg text-gray-600">Shorten your long URLs into easy-to-share links</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <URLForm onUrlCreated={handleUrlCreated} />
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <URLList urls={urls} onUrlDeleted={handleUrlDeleted} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
