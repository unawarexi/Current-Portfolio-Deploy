import React, { useEffect, useState } from 'react';
import { FaTimes, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinksModal = ({ isOpen, onClose }) => {
  const [imageLinks, setImageLinks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    if (isOpen) {
      fetch(`${API_URL}/fetch-images`)
        .then((res) => res.json())
        .then((data) => {
          // Group links by date
          const grouped = data.reduce((acc, item) => {
            const date = new Date(item.created_at).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
          }, {});
          setImageLinks(grouped);
          setLoading(false);
        })
        .catch((err) => console.error('Error fetching images:', err));
    }
  }, [isOpen]);

  const copyToClipboard = (url, event) => {
    if (event) event.stopPropagation(); // Ensure the event doesn't propagate
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-purple-950 w-full max-w-4xl h-4/5 overflow-y-auto rounded-lg shadow-xl relative">
        <div className="sticky top-0 bg-gradient-to-br from-purple-900 to-purple-950 z-10 px-6 py-5 border-b border-purple-700">
          <button
            className="absolute top-5 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="md:text-2xl text-lg font-semibold text-white">Uploaded Image Links</h2>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-white text-lg">Loading...</p>
            </div>
          ) : (
            <div className="space-y-8 pb-8">
              {Object.keys(imageLinks).map((date) => (
                <div key={date} className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4 px-2">{date}</h3>
                  <ul className="space-y-6">
                    {imageLinks[date].map((link) => (
                      <li
                        key={link.public_id}
                        className="bg-white bg-opacity-95 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="group relative">
                              <a
                                href={link.secure_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-800 hover:text-purple-600 break-all text-[10px] md:text-sm transition-colors"
                              >
                                {link.secure_url}
                              </a>
                              <button
                                onClick={(e) => copyToClipboard(link.secure_url, e)}
                                className="ml-2 text-purple-600 hover:text-purple-800 transition-colors inline-flex items-center"
                                aria-label="Copy link"
                              >
                                <FaCopy size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <img
                              src={link.secure_url}
                              alt="Preview"
                              className="w-20 h-20 object-contain rounded-md border border-gray-300 bg-gray-100"
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinksModal;