'use client';

import { useState } from 'react';

interface PropertyDescriptionProps {
  description: string | null;
}

const TRUNCATE_LENGTH = 200;

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  const needsTruncation = description.length > TRUNCATE_LENGTH;
  const displayText =
    !expanded && needsTruncation ? description.slice(0, TRUNCATE_LENGTH) + '...' : description;

  return (
    <div>
      <h2 className="font-display text-foreground mb-2 text-lg font-semibold">About this place</h2>
      <p className="text-foreground-muted whitespace-pre-line text-sm leading-relaxed">
        {displayText}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary hover:text-primary-hover mt-1 text-sm font-medium"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
