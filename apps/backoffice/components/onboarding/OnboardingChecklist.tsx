'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  isCompleted: boolean;
}

interface OnboardingChecklistProps {
  steps: OnboardingStep[];
  onStepComplete?: (stepId: string) => void;
  onDismiss?: () => void;
}

const STORAGE_KEY = 'gudbro_onboarding_dismissed';

export function OnboardingChecklist({
  steps,
  onStepComplete,
  onDismiss,
}: OnboardingChecklistProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if dismissed on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }
  }, []);

  const completedSteps = steps.filter((s) => s.isCompleted).length;
  const totalSteps = steps.length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);
  const isComplete = completedSteps === totalSteps;

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    setIsDismissed(true);
    onDismiss?.();
  };

  // Don't show if dismissed or all complete
  if (isDismissed) {
    return null;
  }

  // Show completion celebration
  if (isComplete) {
    return (
      <div className="mb-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎉</div>
            <div>
              <h3 className="text-lg font-bold">Setup Complete!</h3>
              <p className="text-green-100">
                You&apos;ve completed all onboarding steps. Your menu is ready to go!
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div
        className="cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Get Started with GudBro</h3>
              <p className="text-sm text-gray-500">
                Complete these steps to set up your digital menu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {completedSteps}/{totalSteps}
              </span>
            </div>
            {/* Collapse toggle */}
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Steps */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                stepNumber={index + 1}
                onComplete={() => onStepComplete?.(step.id)}
              />
            ))}
          </div>

          {/* Skip link */}
          <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-400 transition-colors hover:text-gray-600"
            >
              Skip setup guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepCard({
  step,
  stepNumber,
  onComplete,
}: {
  step: OnboardingStep;
  stepNumber: number;
  onComplete: () => void;
}) {
  return (
    <Link
      href={step.href}
      className={`block rounded-lg border-2 p-4 transition-all hover:shadow-md ${
        step.isCompleted
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status indicator */}
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            step.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {step.isCompleted ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            stepNumber
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{step.icon}</span>
            <h4
              className={`truncate font-medium ${
                step.isCompleted ? 'text-green-700' : 'text-gray-900'
              }`}
            >
              {step.title}
            </h4>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{step.description}</p>
        </div>
      </div>

      {/* CTA */}
      {!step.isCompleted && (
        <div className="mt-3 flex items-center text-sm font-medium text-blue-600">
          <span>Get started</span>
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </Link>
  );
}

// Hook to manage onboarding state
export function useOnboardingSteps(initialSteps: Omit<OnboardingStep, 'isCompleted'>[]) {
  const STEPS_STORAGE_KEY = 'gudbro_onboarding_steps';

  const [steps, setSteps] = useState<OnboardingStep[]>(() => {
    return initialSteps.map((step) => ({ ...step, isCompleted: false }));
  });

  // Load completed steps from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STEPS_STORAGE_KEY);
      if (saved) {
        try {
          const completedIds = JSON.parse(saved) as string[];
          setSteps((prev) =>
            prev.map((step) => ({
              ...step,
              isCompleted: completedIds.includes(step.id),
            }))
          );
        } catch (e) {
          console.error('Failed to parse onboarding steps:', e);
        }
      }
    }
  }, []);

  const completeStep = (stepId: string) => {
    setSteps((prev) => {
      const updated = prev.map((step) =>
        step.id === stepId ? { ...step, isCompleted: true } : step
      );

      // Save to localStorage
      if (typeof window !== 'undefined') {
        const completedIds = updated.filter((s) => s.isCompleted).map((s) => s.id);
        localStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(completedIds));
      }

      return updated;
    });
  };

  const resetSteps = () => {
    setSteps((prev) => prev.map((step) => ({ ...step, isCompleted: false })));
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STEPS_STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { steps, completeStep, resetSteps };
}

export default OnboardingChecklist;
