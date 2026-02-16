import React, { useState } from 'react';
import { format } from 'date-fns';
import PhotoLightbox from './PhotoLightbox';

function MemoriesTimeline({ moments }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (moments.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nothing here yet</h3>
      </div>
    );
  }

  // Sort moments by display date (newest first)
  const sortedMoments = [...moments].sort((a, b) => {
    const dateA = new Date(a.completedAt || a.date || a.createdAt);
    const dateB = new Date(b.completedAt || b.date || b.createdAt);
    return dateB - dateA; // Descending order (newest first)
  });

  const getDisplayDate = (moment) => {
    // Use completedAt if available, otherwise use date, otherwise use createdAt
    const dateToUse = moment.completedAt || moment.date || moment.createdAt;
    
    if (!dateToUse) return null;
    
    const date = new Date(dateToUse);
    const isApproximate = !moment.completedAt && !moment.date; // Using createdAt as fallback
    
    return {
      month: format(date, 'MMM').toUpperCase(),
      day: format(date, 'dd'),
      full: format(date, 'MMMM d, yyyy'),
      isApproximate
    };
  };

  return (
    <>
      <div className="timeline-container">
        {sortedMoments.map((moment) => {
          const displayDate = getDisplayDate(moment);
          const photoCount = moment.photos?.length || 0;

          return (
            <div key={moment.id} className="timeline-item">
              {/* Date on the left */}
              {displayDate && (
                <div className="timeline-date">
                  <div className="timeline-month">{displayDate.month}</div>
                  <div className="timeline-day">{displayDate.day}</div>
                </div>
              )}

              {/* Main content card */}
              <div className="timeline-card">
                {/* Photos section - takes up most of the card */}
                {photoCount > 0 && (
                  <div className={`timeline-photos timeline-photos-${photoCount}`}>
                    {moment.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${moment.title} ${index + 1}`}
                        className="timeline-photo"
                        onClick={() => setSelectedPhoto(photo)}
                      />
                    ))}
                  </div>
                )}

                {/* Title and date below photos */}
                <div className="timeline-content">
                  <h3 className="timeline-title">{moment.title}</h3>
                  {displayDate && (
                    <p className="timeline-date-text">
                      {displayDate.isApproximate && '~'}
                      {displayDate.full}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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

export default MemoriesTimeline;
