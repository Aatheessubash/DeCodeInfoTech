'use client';

import React from 'react';
import { useData } from '@/context/useData';
import styles from './Contact.module.css';
import { Mail, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';

export function Contact() {
  const { siteContent } = useData();

  const contactDetails = (
    <div className={styles.directContact}>
      <div className={styles.contactItem}>
        <Mail className={styles.contactIcon} aria-hidden="true" />
        <a href={`mailto:${siteContent?.contactEmail || 'contact@decodeinfotech.in'}`}>
          {siteContent?.contactEmail || 'contact@decodeinfotech.in'}
        </a>
      </div>
      <div className={styles.contactItem}>
        <MapPin className={styles.contactIcon} aria-hidden="true" />
        <span>{siteContent?.contactLocation || 'Coimbatore, Tamil Nadu, India'}</span>
      </div>
    </div>
  );

  return (
    <section id="contact" className={styles.contactSection} aria-labelledby="contact-heading">
      <div className={styles.mainWrapper}>
        <div className={styles.sideCol}>
          <div className={styles.intro}>
            <h2 id="contact-heading" className={styles.heading}>
              Let's Build Something <span>Exceptional</span>
            </h2>
            <p className={styles.subheading}>
              Ready to turn your vision into a high-performing digital product? Fill out the
              proposal form below and the <strong>DeCode</strong> team will get back to you within
              24 hours.
            </p>
          </div>
          {contactDetails}
        </div>

        {/* RIGHT COLUMN: PROPOSAL REQUEST FORM */}
        <div className={styles.formCol}>
          <ContactForm idPrefix="contact" />
        </div>
      </div>
    </section>
  );
}

export default Contact;
