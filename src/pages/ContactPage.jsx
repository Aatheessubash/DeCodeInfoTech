import React, { useEffect } from 'react';
import { Contact } from '../components/Contact/Contact';
import { FAQ } from '../components/FAQ/FAQ';

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Contact />
      <FAQ />
    </div>
  );
}
