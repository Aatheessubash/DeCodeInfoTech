import React from 'react';
import { Contact } from '../components/Contact/Contact';
import { FAQ } from '../components/FAQ/FAQ';

export function ContactPage() {
  return (
    <div style={{ paddingTop: '88px' }}>
      <Contact />
      <FAQ />
    </div>
  );
}
