import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';

function Dashboard({ token, onLogout }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProtectedData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/hello', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setError('Erreur: ' + response.status);
      }
    } catch (err) {
      setError('Erreur de connexion: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProtectedData();
  }, [fetchProtectedData]);

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="card-header">
          <div className="title-group">
            <div className="badge">Authentifié</div>
            <h2 className="card-title">Bienvenue 👋</h2>
            <p className="card-subtitle">Vous êtes connecté. Voici un endpoint protégé pour test.</p>
          </div>
          <div className="actions">
            <button onClick={fetchProtectedData} className="btn">
              <span className="btn-icon">🔄</span> Rafraîchir
            </button>
            <button onClick={onLogout} className="btn btn-danger">
              <span className="btn-icon">⎋</span> Déconnexion
            </button>
          </div>
        </div>

        <div className="card-body">
          {loading && <div className="skeleton" />}
          {error && <div className="alert alert-error">{error}</div>}
          {message && !loading && (
            <div className="panel">
              <div className="panel-title">Réponse du serveur</div>
              <div className="panel-content">{message}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
