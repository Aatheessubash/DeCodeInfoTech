import React, { useEffect } from 'react';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Results } from '../components/Results/Results';

export function WorkPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Portfolio />
      <Results />
    </div>
  );
}
