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
    if (event) event.stopPropagation();
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

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setDragging(true);
      setOffset({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (dragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchEnd = () => {
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
      className="fixed bg-white dark:bg-indigo-900 w-72 h-72 md:w-96 md:h-96 overflow-y-auto rounded-lg shadow-xl z-50 border border-gray-300 dark:border-indigo-700"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="sticky top-0 bg-gray-100 dark:bg-indigo-800 z-10 px-4 py-3 border-b border-gray-300 dark:border-indigo-700 flex justify-between items-center"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <h2 className="text-sm md:text-xl font-semibold text-gray-800">Uploaded Image Links</h2>
        <div
          className="text-gray-800 hover:text-gray-600 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-800 dark:text-indigo-200 text-sm md:text-lg">Loading...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(imageLinks).map((date) => (
              <div key={date}>
                <h3 className="text-sm md:text-md font-medium text-gray-800 dark:text-indigo-200 mb-2">{date}</h3>
                <ul className="space-y-4">
                  {imageLinks[date].map((link) => (
                    <li
                      key={link.public_id}
                      className="bg-gray-50 dark:bg-indigo-700 p-2 md:p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-300 dark:border-indigo-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <a
                            href={link.secure_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 dark:text-indigo-300 hover:text-gray-600 dark:hover:text-indigo-100 break-all text-[10px] md:text-sm transition-colors"
                          >
                            {link.secure_url}
                          </a>
                          <div
                            onClick={(e) => copyToClipboard(link.secure_url, e)}
                            className="ml-2 text-gray-600 py-4 md:py-0 dark:text-indigo-300 hover:text-gray-800 dark:hover:text-indigo-100 transition-colors cursor-pointer"
                            aria-label="Copy link"
                          >
                            <FaCopy size={16} />
                          </div>
                        </div>
                        <img
                          src={link.secure_url}
                          alt="Preview"
                          className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-md border border-gray-300 dark:border-indigo-600 bg-gray-100 dark:bg-indigo-800"
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