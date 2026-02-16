import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PhotoLightbox from './PhotoLightbox';

function MemoryDetailLightbox({ moment, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getDisplayDate = (moment) => {
    const dateToUse = moment.completedAt || moment.date || moment.createdAt;
    if (!dateToUse) return null;
    
    const date = new Date(dateToUse);
    const isApproximate = !moment.completedAt && !moment.date;
    
    return {
      full: format(date, 'MMMM d, yyyy'),
      isApproximate
    };
  };

  const displayDate = getDisplayDate(moment);
  const photoCount = moment.photos?.length || 0;

  return (
    <>
      <div className="memory-detail-overlay" onClick={onClose}>
        <div className="memory-detail-content" onClick={(e) => e.stopPropagation()}>
          <button className="memory-detail-close" onClick={onClose}>
            ✕
          </button>

          <div className="memory-detail-scroll">
            {/* Photos */}
            {photoCount > 0 && (
              <div className={`memory-detail-photos memory-detail-photos-${photoCount}`}>
                {moment.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${moment.title} ${index + 1}`}
                    className="memory-detail-photo"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="memory-detail-info">
              <h2 className="memory-detail-title">{moment.title}</h2>
              
              {displayDate && (
                <p className="memory-detail-date">
                  {displayDate.isApproximate && '~'}
                  {displayDate.full}
                </p>
              )}

              {moment.category && (
                <span className="memory-detail-category">{moment.category}</span>
              )}

              {moment.description && (
                <p className="memory-detail-description">{moment.description}</p>
              )}

              {moment.completedNote && (
                <p className="memory-detail-note">
                  💭 {moment.completedNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Photo lightbox */}
      {selectedPhoto && (
        <PhotoLightbox 
          photoUrl={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}
    </>
  );
}

export default MemoryDetailLightbox;
