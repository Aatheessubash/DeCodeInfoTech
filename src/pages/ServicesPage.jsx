import React, { useEffect } from 'react';
import { Services } from '../components/Services/Services';
import { Technology } from '../components/Technology/Technology';
import { Process } from '../components/Process/Process';

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Services />
      <Technology />
      <Process />
    </div>
  );
}
