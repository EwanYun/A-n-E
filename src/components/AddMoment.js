import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function AddMoment({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'adventure'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'adventure',
    'date night',
    'restaurant',
    'travel',
    'experience',
    'milestone',
    'other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please add a title');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'moments'), {
        title: formData.title,
        description: formData.description,
        date: formData.date || null,
        category: formData.category,
        completed: false,
        photos: [],
        createdAt: serverTimestamp()
      });
      onClose();
    } catch (error) {
      console.error('Error adding moment:', error);
      alert('Failed to add moment');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Moment</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What do you want to do?"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Details..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMoment;
