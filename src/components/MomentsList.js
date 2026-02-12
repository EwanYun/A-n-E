import React, { useState } from 'react';
import { format } from 'date-fns';
import CompleteMoment from './CompleteMoment';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function MomentsList({ moments }) {
  const [selectedMoment, setSelectedMoment] = useState(null);

  const handleDelete = async (momentId) => {
    if (window.confirm('Are you sure you want to delete this moment?')) {
      try {
        await deleteDoc(doc(db, 'moments', momentId));
      } catch (error) {
        console.error('Error deleting moment:', error);
        alert('Failed to delete moment. Please try again.');
      }
    }
  };

  if (moments.length === 0) {
    return (
      <div className="empty-state">
        <h3>No moments yet</h3>
        <p>Start adding some dreams to chase together! ✨</p>
      </div>
    );
  }

  return (
    <>
      <div className="moments-container">
        {moments.map((moment) => (
          <div 
            key={moment.id} 
            className={`moment-card ${moment.completed ? 'completed' : 'upcoming'}`}
          >
            <div className="moment-header">
              <h3 className="moment-title">{moment.title}</h3>
              <span className={`moment-status ${moment.completed ? 'completed' : 'upcoming'}`}>
                {moment.completed ? '✓ Done' : '○ Upcoming'}
              </span>
            </div>

            {moment.date && (
              <div className="moment-date">
                📅 {format(new Date(moment.date), 'MMMM d, yyyy')}
              </div>
            )}

            {moment.category && (
              <span className="moment-category">{moment.category}</span>
            )}

            {moment.description && (
              <p className="moment-description">{moment.description}</p>
            )}

            {moment.photos && moment.photos.length > 0 && (
              <div className="moment-photos">
                {moment.photos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`Memory ${index + 1}`}
                    className="moment-photo"
                    onClick={() => window.open(photo, '_blank')}
                  />
                ))}
              </div>
            )}

            {moment.completedNote && (
              <p className="moment-description" style={{ 
                marginTop: '15px', 
                paddingTop: '15px', 
                borderTop: '1px solid #f0f0f0',
                fontStyle: 'italic',
                color: '#9b7ebd'
              }}>
                💭 {moment.completedNote}
              </p>
            )}

            <div className="moment-actions">
              {!moment.completed && (
                <button 
                  className="complete-btn"
                  onClick={() => setSelectedMoment(moment)}
                >
                  Mark as Done
                </button>
              )}
              <button 
                className="delete-btn"
                onClick={() => handleDelete(moment.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMoment && (
        <CompleteMoment 
          moment={selectedMoment}
          onClose={() => setSelectedMoment(null)}
        />
      )}
    </>
  );
}

export default MomentsList;
