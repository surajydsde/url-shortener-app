import React, { useState } from 'react';
import URLCard from './URLCard';

function URLList({ urls, onUrlDeleted }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUrls = urls.filter(url =>
    url.original_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.short_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Shortened URLs</h2>
        
        {urls.length > 0 && (
          <input
            type="text"
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        )}
      </div>

      {filteredUrls.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">
            {urls.length === 0 ? 'No URLs shortened yet. Start by creating one above!' : 'No results found.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredUrls.map(url => (
            <URLCard
              key={url.short_code}
              url={url}
              onDelete={onUrlDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default URLList;
