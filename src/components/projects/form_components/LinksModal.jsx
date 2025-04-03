import React, { useEffect, useState, useRef } from 'react';
import { FaTimes, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinksModal = ({ isOpen, onClose }) => {
  const [imageLinks, setImageLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed bg-gradient-to-br from-purple-900 to-purple-950 w-96 h-96 overflow-y-auto rounded-lg shadow-xl z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={handleMouseMove}
    >
      <div
        className="sticky top-0 bg-gradient-to-br from-purple-900 to-purple-950 z-10 px-4 py-3 border-b border-purple-700 flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-lg font-semibold text-white">Uploaded Image Links</h2>
        <div
          className="text-white hover:text-gray-300 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </div>
      </div>
      
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-white text-lg">Loading...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(imageLinks).map((date) => (
              <div key={date}>
                <h3 className="text-md font-medium text-white mb-2">{date}</h3>
                <ul className="space-y-4">
                  {imageLinks[date].map((link) => (
                    <li
                      key={link.public_id}
                      className="bg-white bg-opacity-95 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <a
                            href={link.secure_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-800 hover:text-purple-600 break-all text-sm transition-colors"
                          >
                            {link.secure_url}
                          </a>
                          <div
                            onClick={(e) => copyToClipboard(link.secure_url, e)}
                            className="ml-2 text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                            aria-label="Copy link"
                          >
                            <FaCopy size={16} />
                          </div>
                        </div>
                        <img
                          src={link.secure_url}
                          alt="Preview"
                          className="w-12 h-12 object-contain rounded-md border border-gray-300 bg-gray-100"
                        />
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
  );
};

export default LinksModal;