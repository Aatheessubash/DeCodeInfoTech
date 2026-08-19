import React from 'react';
import { Services } from '../components/Services/Services';
import { Process } from '../components/Process/Process';

export function ServicesPage() {
  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh' }}>
      <Services />
      <Process />
    </div>
  );
}
