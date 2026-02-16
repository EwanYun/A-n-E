import React from 'react';
import { format } from 'date-fns';

function GridView({ moments, onSelectMoment }) {
  const getDisplayDate = (moment) => {
    const dateToUse = moment.completedAt || moment.date || moment.createdAt;
    if (!dateToUse) return null;
    
    const date = new Date(dateToUse);
    return {
      month: format(date, 'MMM').toUpperCase(),
      day: format(date, 'd')
    };
  };

  const getFirstPhoto = (moment) => {
    return moment.photos && moment.photos.length > 0 ? moment.photos[0] : null;
  };

  return (
    <div className="grid-view">
      {moments.map((moment) => {
        const displayDate = getDisplayDate(moment);
        const firstPhoto = getFirstPhoto(moment);

        return (
          <div 
            key={moment.id} 
            className="grid-tile"
            onClick={() => onSelectMoment(moment)}
          >
            {firstPhoto ? (
              <img 
                src={firstPhoto} 
                alt={moment.title}
                className="grid-photo"
              />
            ) : (
              <div className="grid-photo-placeholder">
                <span>📷</span>
              </div>
            )}
            
            {displayDate && (
              <div className="grid-date-badge">
                <span className="grid-badge-month">{displayDate.month}</span>
                <span className="grid-badge-day">{displayDate.day}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GridView;
