'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════════════════
   INPUT COMPONENT

   Form input with warm styling and smooth focus states.
   Designed for mobile-first touch interactions.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', label, error, hint, icon, iconPosition = 'left', id, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="text-foreground-muted mb-2 block text-sm font-medium">
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Icon left */}
          {icon && iconPosition === 'left' && (
            <span className="text-foreground-subtle pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
              {icon}
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              // Base
              'w-full rounded-xl px-4 py-3',
              'border-2 bg-white',
              'text-foreground placeholder:text-foreground-subtle',
              'transition-all duration-200',
              'min-h-[48px]', // Touch-friendly

              // Default border
              error ? 'border-error' : 'border-border',

              // Focus
              error
                ? 'focus:border-error focus:ring-error/10 focus:ring-4'
                : 'focus:border-primary focus:ring-primary/10 focus:ring-4',

              // Hover
              !error && 'hover:border-border-strong',

              // Icon padding
              icon && iconPosition === 'left' && 'pl-12',
              icon && iconPosition === 'right' && 'pr-12',

              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {/* Icon right */}
          {icon && iconPosition === 'right' && (
            <span className="text-foreground-subtle pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              {icon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-error mt-2 flex items-center gap-1.5 text-sm"
            role="alert"
          >
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </p>
        )}

        {/* Hint */}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-foreground-muted mt-2 text-sm">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

/* ─────────────────────────────────────────────────────────────────────
   TEXTAREA
   ───────────────────────────────────────────────────────────────────── */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="text-foreground-muted mb-2 block text-sm font-medium">
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl px-4 py-3',
            'resize-none border-2 bg-white',
            'text-foreground placeholder:text-foreground-subtle',
            'transition-all duration-200',
            'min-h-[120px]',
            error ? 'border-error' : 'border-border',
            error
              ? 'focus:border-error focus:ring-error/10 focus:ring-4'
              : 'focus:border-primary focus:ring-primary/10 focus:ring-4',
            !error && 'hover:border-border-strong',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />

        {error && (
          <p className="text-error mt-2 flex items-center gap-1.5 text-sm" role="alert">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </p>
        )}

        {hint && !error && <p className="text-foreground-muted mt-2 text-sm">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
