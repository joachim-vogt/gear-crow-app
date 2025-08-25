// React Router Test Components

import { useEffect, useState } from 'react';
import { getHealth } from '../lib/api';

export default function Home() {
  const [status, setStatus] = useState<string>('Loading...');

  useEffect(() => {
    getHealth()
      .then((data) => setStatus(data))
      .catch((err) => setStatus('Error: ' + err.message));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Home</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}
