import { useEffect, useState } from 'react';
import './App.css';

type Alert = {
  text: string;
  scrapedAt: string;
  source: string;
};

function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch('/alerts.json'); // served from public folder
        const data: Alert[] = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>KPLC + X Outage Dashboard</h1>
      {alerts.length === 0 ? (
        <p>No alerts yet.</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Text</th>
              <th>Scraped At</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, idx) => (
              <tr key={idx}>
                <td>{alert.source}</td>
                <td>{alert.text}</td>
                <td>{new Date(alert.scrapedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;