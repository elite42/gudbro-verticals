import { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | ROOTS Plant-Based Cafe',
  description: 'Get in touch with us. Find our location, hours, and contact information.',
};

export default function ContactPage() {
  return <ContactClient />;
}
