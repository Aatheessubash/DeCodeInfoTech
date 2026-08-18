import React, { useEffect } from 'react';
import { Services } from '../components/Services/Services';
import { Process } from '../components/Process/Process';

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '110px', minHeight: '100vh' }}>
      <Services />
      <Process />
    </div>
  );
}
