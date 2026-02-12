import React, { useState, useEffect } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';
import MomentsList from './components/MomentsList';
import AddMoment from './components/AddMoment';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [moments, setMoments] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'completed'

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('ourMomentsAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Subscribe to moments from Firebase
  useEffect(() => {
    if (isAuthenticated) {
      const q = query(collection(db, 'moments'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const momentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMoments(momentsData);
      });

      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('ourMomentsAuth', 'true');
    }
  };

  const filteredMoments = moments.filter(moment => {
    if (filter === 'upcoming') return !moment.completed;
    if (filter === 'completed') return moment.completed;
    return true;
  });

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Our Moments ✨</h1>
        <p className="subtitle">Our adventures, together</p>
      </header>

      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'upcoming' ? 'active' : ''} 
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Memories
        </button>
      </div>

      <MomentsList moments={filteredMoments} />

      <button className="add-button" onClick={() => setShowAddForm(true)}>
        + Add a Moment
      </button>

      {showAddForm && (
        <AddMoment onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

export default App;
