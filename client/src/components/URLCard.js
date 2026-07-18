import React, { useState } from 'react';

function URLCard({ url, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shortUrl = `${window.location.origin}/${url.short_code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/urls/${url.short_code}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Failed to delete URL');
        return;
      }

      onDelete(url.short_code);
    } catch (error) {
      console.error('Error deleting URL:', error);
      alert('Error deleting URL');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-200 truncate"
            >
              {shortUrl}
            </a>
          </div>
          <p className="text-gray-600 text-sm mb-2 break-words">
            <span className="font-medium">Original:</span> {url.original_url}
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Created: {formatDate(url.created_at)}</span>
            <span className="font-medium">Clicks: {url.click_count}</span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition disabled:bg-gray-400 cursor-pointer"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default URLCard;
