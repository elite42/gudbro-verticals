import { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | ROOTS Plant-Based Cafe',
  description:
    'Learn about our story, mission, and commitment to healthy, sustainable plant-based dining.',
};

export default function AboutPage() {
  return <AboutClient />;
}
