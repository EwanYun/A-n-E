import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import imageCompression from 'browser-image-compression';

function CompleteMoment({ moment, onClose }) {
  const [photos, setPhotos] = useState([]);
  const [note, setNote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Compression options
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg'
      };

      // Compress and upload photos
      const photoUrls = [];
      for (let i = 0; i < photos.length; i++) {
        setUploadProgress(`Compressing ${i + 1} of ${photos.length}...`);
        
        const compressedFile = await imageCompression(photos[i], options);
        
        setUploadProgress(`Uploading ${i + 1} of ${photos.length}...`);
        
        const photoRef = ref(storage, `moments/${moment.id}/${Date.now()}_${photos[i].name}`);
        await uploadBytes(photoRef, compressedFile);
        const url = await getDownloadURL(photoRef);
        photoUrls.push(url);
      }

      setUploadProgress('Saving...');
      
      await updateDoc(doc(db, 'moments', moment.id), {
        completed: true,
        completedAt: moment.date || new Date().toISOString(),  // ← Use original date if exists
        photos: photoUrls,
        completedNote: note
      });

      onClose();
    } catch (error) {
      console.error('Error completing moment:', error);
      alert('Failed to complete moment');
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Complete: {moment.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="note">Notes</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How was it? (optional)"
            />
          </div>

          <div className="form-group">
            <label>Photos</label>
            <div className="photo-upload" onClick={() => document.getElementById('photo-input').click()}>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
              />
              <p>📸 Add photos</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(232, 227, 216, 0.6)', marginTop: '8px' }}>
                Select multiple if you want
              </p>
            </div>
            {photos.length > 0 && (
              <div className="photo-preview">
                {photos.map((photo, index) => (
                  <img 
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isUploading}
          >
            {isUploading ? uploadProgress || 'Processing...' : 'Complete'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteMoment;
