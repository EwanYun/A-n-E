import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PhotoLightbox from './PhotoLightbox';
import GridView from './GridView';
import MemoryDetailLightbox from './MemoryDetailLightbox';

function MemoriesTimeline({ moments }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'grid'

  // Load saved view preference
  useEffect(() => {
    const savedView = localStorage.getItem('memoriesViewMode');
    if (savedView) {
      setViewMode(savedView);
    }
  }, []);

  // Save view preference
  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('memoriesViewMode', mode);
  };

  if (moments.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nothing here yet </h3>
      </div>
    );
  }

  // Sort moments by display date (newest first)
  const sortedMoments = [...moments].sort((a, b) => {
    const dateA = new Date(a.completedAt || a.date || a.createdAt);
    const dateB = new Date(b.completedAt || b.date || b.createdAt);
    return dateB - dateA;
  });

  const getDisplayDate = (moment) => {
    const dateToUse = moment.completedAt || moment.date || moment.createdAt;
    
    if (!dateToUse) return null;
    
    const date = new Date(dateToUse);
    const isApproximate = !moment.completedAt && !moment.date;
    
    return {
      month: format(date, 'MMM').toUpperCase(),
      day: format(date, 'dd'),
      full: format(date, 'MMMM d, yyyy'),
      isApproximate
    };
  };

  return (
    <>
      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={`view-toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
          onClick={() => handleViewChange('timeline')}
          aria-label="Timeline view"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="3" width="16" height="2" />
            <rect x="2" y="9" width="16" height="2" />
            <rect x="2" y="15" width="16" height="2" />
          </svg>
        </button>
        <button 
          className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => handleViewChange('grid')}
          aria-label="Grid view"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="2" width="6" height="6" />
            <rect x="11" y="2" width="6" height="6" />
            <rect x="2" y="11" width="6" height="6" />
            <rect x="11" y="11" width="6" height="6" />
          </svg>
        </button>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <GridView 
          moments={sortedMoments} 
          onSelectMoment={setSelectedMemory}
        />
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
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
                  {/* Photos section */}
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
      )}

      {/* Photo lightbox */}
      {selectedPhoto && (
        <PhotoLightbox 
          photoUrl={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}

      {/* Memory detail lightbox */}
      {selectedMemory && (
        <MemoryDetailLightbox 
          moment={selectedMemory} 
          onClose={() => setSelectedMemory(null)} 
        />
      )}
    </>
  );
}

export default MemoriesTimeline;
