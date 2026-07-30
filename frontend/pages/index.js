import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/api/hello`);
        setMessage(response.data.message);
      } catch (err) {
        setError('Error connecting to API: ' + err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div style={{
      padding: '50px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🚀 Test App - VillaEx Deployment</h1>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '30px',
        borderRadius: '10px',
        marginTop: '30px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2>Status</h2>
        {loading && <p>⏳ Loading...</p>}
        {error && <p style={{color: '#ff6b6b'}}>❌ {error}</p>}
        {!loading && !error && (
          <div>
            <p style={{fontSize: '18px', lineHeight: '1.6'}}>
              <strong>API Response:</strong><br />
              {message}
            </p>
          </div>
        )}
      </div>

      <div style={{marginTop: '40px', opacity: 0.8}}>
        <p>Deployed via Komodo on 10.99.1.100:9020</p>
        <p>Environment: <code>{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}</code></p>
      </div>
    </div>
  );
}
