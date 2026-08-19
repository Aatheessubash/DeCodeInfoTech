import React from 'react';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Results } from '../components/Results/Results';

export function WorkPage() {
  return (
    <div style={{ paddingTop: '88px', minHeight: '100vh' }}>
      <Portfolio />
      <Results />
    </div>
  );
}
