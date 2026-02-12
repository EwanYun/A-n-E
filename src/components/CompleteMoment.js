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
        maxSizeMB: 1, // Maximum file size in MB
        maxWidthOrHeight: 1920, // Max width or height
        useWebWorker: true, // Use web worker for better performance
        fileType: 'image/jpeg' // Convert all images to JPEG
      };

      // Compress and upload photos
      const photoUrls = [];
      for (let i = 0; i < photos.length; i++) {
        setUploadProgress(`Compressing photo ${i + 1} of ${photos.length}...`);
        
        // Compress the image
        const compressedFile = await imageCompression(photos[i], options);
        
        setUploadProgress(`Uploading photo ${i + 1} of ${photos.length}...`);
        
        // Upload compressed image to Firebase Storage
        const photoRef = ref(storage, `moments/${moment.id}/${Date.now()}_${photos[i].name}`);
        await uploadBytes(photoRef, compressedFile);
        const url = await getDownloadURL(photoRef);
        photoUrls.push(url);
      }

      setUploadProgress('Saving...');
      
      // Update the moment in Firestore
      await updateDoc(doc(db, 'moments', moment.id), {
        completed: true,
        completedAt: new Date().toISOString(),
        photos: photoUrls,
        completedNote: note
      });

      onClose();
    } catch (error) {
      console.error('Error completing moment:', error);
      alert('Failed to complete moment. Please try again.');
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
            <label htmlFor="note">How was it? ✨</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Share your thoughts about this moment..."
            />
          </div>

          <div className="form-group">
            <label>Add Photos</label>
            <div className="photo-upload" onClick={() => document.getElementById('photo-input').click()}>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
              />
              <p>📸 Click to add photos</p>
              <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '8px' }}>
                You can select multiple photos
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
            {isUploading ? uploadProgress || 'Processing...' : 'Mark as Complete'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteMoment;
