import React, { useEffect } from 'react';

function PhotoLightbox({ photoUrl, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <img 
        src={photoUrl} 
        alt="Full screen" 
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default PhotoLightbox;
