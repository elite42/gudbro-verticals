'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  WarningCircle,
  UserMinus,
  Calendar,
  Star,
  Target,
  Gear,
  Bell,
  Gift,
  Users,
  CaretLeft,
  Check,
  SpinnerGap,
  CurrencyDollar,
  EnvelopeSimple,
  Chat,
  DeviceMobile,
  Lightning,
} from '@phosphor-icons/react';

// Types
type Step = 'type' | 'conditions' | 'action' | 'budget' | 'review';
type TriggerType =
  | 'churn_risk'
  | 'inactivity'
  | 'birthday'
  | 'milestone'
  | 'segment_change'
  | 'custom';
type ActionType = 'notification' | 'promo' | 'loyalty_reward' | 'alert_manager';
type Channel = 'push' | 'email' | 'whatsapp' | 'sms';
type RiskLevel = 'medium' | 'high' | 'critical';
type Segment = 'champion' | 'loyal' | 'potential' | 'new' | 'at_risk' | 'dormant' | 'lost';

const STEPS: Step[] = ['type', 'conditions', 'action', 'budget', 'review'];

interface TriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: ExistingTrigger;
  onSave: (trigger: CreateTriggerInput) => Promise<void>;
  merchantId: string;
  currencyCode: string;
}

interface ExistingTrigger {
  id: string;
  name: string;
  description: string | null;
  triggerType: TriggerType;
  conditions: Record<string, any>;
  actionType: ActionType;
  actionConfig: Record<string, any>;
  cooldownDays: number;
  targetSegments: string[];
  excludeSegments: string[];
  minClv: number | null;
  maxClv: number | null;
  isActive: boolean;
  budget?: {
    totalBudget: number | null;
    maxRedemptions: number | null;
    startDate: string | null;
    endDate: string | null;
  };
}

interface CreateTriggerInput {
  name: string;
  description: string;
  triggerType: TriggerType;
  conditions: Record<string, any>;
  actionType: ActionType;
  actionConfig: Record<string, any>;
  cooldownDays: number;
  targetSegments: string[];
  excludeSegments: string[];
  minClv: number | null;
  maxClv: number | null;
  isActive: boolean;
  budget?: {
    hasBudget: boolean;
    totalBudget?: number;
    costPerExecution?: number;
    maxRedemptions?: number;
    startDate?: string;
    endDate?: string;
  };
}

interface FormState {
  triggerType: TriggerType | null;
  // Conditions
  riskLevels: RiskLevel[];
  daysInactive: number;
  orderCount: number;
  totalSpend: number;
  targetSegments: Segment[];
  segmentAction: 'enter' | 'leave';
  minClv: string;
  maxClv: string;
  cooldownDays: number;
  // Action
  actionType: ActionType | null;
  channel: Channel;
  template: string;
  discountPercent: string;
  pointsAmount: string;
  customMessage: string;
  // Budget
  hasBudget: boolean;
  totalBudget: string;
  costPerExecution: string;
  maxRedemptions: string;
  startDate: string;
  endDate: string;
  // Review
  name: string;
  description: string;
  isActive: boolean;
}

const initialFormState: FormState = {
  triggerType: null,
  riskLevels: ['high', 'critical'],
  daysInactive: 30,
  orderCount: 10,
  totalSpend: 500,
  targetSegments: [],
  segmentAction: 'enter',
  minClv: '',
  maxClv: '',
  cooldownDays: 30,
  actionType: null,
  channel: 'push',
  template: '',
  discountPercent: '15',
  pointsAmount: '100',
  customMessage: '',
  hasBudget: false,
  totalBudget: '',
  costPerExecution: '',
  maxRedemptions: '',
  startDate: '',
  endDate: '',
  name: '',
  description: '',
  isActive: true,
};

// Trigger type configs
const TRIGGER_TYPES: {
  value: TriggerType;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    value: 'churn_risk',
    label: 'Churn Risk',
    description: 'Alert when customer risk is high',
    icon: WarningCircle,
    color: 'text-red-600 bg-red-100',
  },
  {
    value: 'inactivity',
    label: 'Inactivity',
    description: 'After X days with no visits',
    icon: UserMinus,
    color: 'text-orange-600 bg-orange-100',
  },
  {
    value: 'birthday',
    label: 'Birthday',
    description: 'On customer birthday',
    icon: Calendar,
    color: 'text-pink-600 bg-pink-100',
  },
  {
    value: 'milestone',
    label: 'Milestone',
    description: 'On order # or spend milestone',
    icon: Star,
    color: 'text-yellow-600 bg-yellow-100',
  },
  {
    value: 'segment_change',
    label: 'Segment Change',
    description: 'When customer enters/leaves segment',
    icon: Target,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    value: 'custom',
    label: 'Custom',
    description: 'Build your own rules',
    icon: Gear,
    color: 'text-gray-600 bg-gray-100',
  },
];

// Action type configs
const ACTION_TYPES: {
  value: ActionType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: 'notification',
    label: 'Send Notification',
    description: 'Push notification or message',
    icon: Bell,
  },
  {
    value: 'promo',
    label: 'Send Promo Code',
    description: 'Discount or special offer',
    icon: Gift,
  },
  {
    value: 'loyalty_reward',
    label: 'Award Points',
    description: 'Bonus loyalty points',
    icon: Star,
  },
  {
    value: 'alert_manager',
    label: 'Alert Staff',
    description: 'Notify manager to take action',
    icon: Users,
  },
];

// Channel options
const CHANNELS: { value: Channel; label: string; icon: React.ElementType }[] = [
  { value: 'push', label: 'Push', icon: DeviceMobile },
  { value: 'email', label: 'Email', icon: EnvelopeSimple },
  { value: 'whatsapp', label: 'WhatsApp', icon: Chat },
  { value: 'sms', label: 'SMS', icon: Chat },
];

// Segment options
const SEGMENTS: { value: Segment; label: string; color: string }[] = [
  { value: 'champion', label: 'Champion', color: 'bg-purple-100 text-purple-700' },
  { value: 'loyal', label: 'Loyal', color: 'bg-green-100 text-green-700' },
  { value: 'potential', label: 'Potential', color: 'bg-blue-100 text-blue-700' },
  { value: 'new', label: 'New', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'at_risk', label: 'At Risk', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'dormant', label: 'Dormant', color: 'bg-orange-100 text-orange-700' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700' },
];

import { formatPrice as _fp } from '@gudbro/utils';

function formatCurrency(value: number, currencyCode: string): string {
  return _fp(value, currencyCode, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function TriggerModal({
  isOpen,
  onClose,
  trigger,
  onSave,
  merchantId,
  currencyCode,
}: TriggerModalProps) {
  const [step, setStep] = useState<Step>('type');
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!trigger;

  // Initialize form on open
  useEffect(() => {
    if (isOpen) {
      if (trigger) {
        // Edit mode - populate form
        setForm({
          triggerType: trigger.triggerType,
          riskLevels: trigger.conditions.riskLevels || ['high', 'critical'],
          daysInactive: trigger.conditions.daysInactive || 30,
          orderCount: trigger.conditions.orderCount || 10,
          totalSpend: trigger.conditions.totalSpend || 500,
          targetSegments: (trigger.targetSegments || []) as Segment[],
          segmentAction: trigger.conditions.segmentAction || 'enter',
          minClv: trigger.minClv?.toString() || '',
          maxClv: trigger.maxClv?.toString() || '',
          cooldownDays: trigger.cooldownDays || 30,
          actionType: trigger.actionType,
          channel: trigger.actionConfig.channel || 'push',
          template: trigger.actionConfig.template || '',
          discountPercent: trigger.actionConfig.discountPercent?.toString() || '15',
          pointsAmount: trigger.actionConfig.pointsAmount?.toString() || '100',
          customMessage: trigger.actionConfig.customMessage || '',
          hasBudget: !!trigger.budget,
          totalBudget: trigger.budget?.totalBudget?.toString() || '',
          costPerExecution: '',
          maxRedemptions: trigger.budget?.maxRedemptions?.toString() || '',
          startDate: trigger.budget?.startDate?.split('T')[0] || '',
          endDate: trigger.budget?.endDate?.split('T')[0] || '',
          name: trigger.name,
          description: trigger.description || '',
          isActive: trigger.isActive,
        });
        setStep('conditions');
      } else {
        // Create mode - reset form
        setForm(initialFormState);
        setStep('type');
      }
      setErrors({});
    }
  }, [isOpen, trigger]);

  // Generate default name based on type
  const generateDefaultName = (): string => {
    if (!form.triggerType) return '';

    const typeConfig = TRIGGER_TYPES.find((t) => t.value === form.triggerType);
    const actionConfig = ACTION_TYPES.find((a) => a.value === form.actionType);

    if (form.triggerType === 'churn_risk') {
      return `Churn Risk - ${actionConfig?.label || 'Alert'}`;
    }
    if (form.triggerType === 'inactivity') {
      return `${form.daysInactive} Days Inactive - ${actionConfig?.label || 'Win-back'}`;
    }
    if (form.triggerType === 'birthday') {
      return `Birthday ${actionConfig?.label || 'Reward'}`;
    }
    if (form.triggerType === 'milestone') {
      return `Milestone ${form.orderCount ? `(${form.orderCount} orders)` : ''} - ${actionConfig?.label || 'Reward'}`;
    }

    return `${typeConfig?.label || 'Custom'} Trigger`;
  };

  // Validate current step
  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'type') {
      if (!form.triggerType) {
        newErrors.triggerType = 'Please select a trigger type';
      }
    }

    if (currentStep === 'conditions') {
      if (form.triggerType === 'inactivity' && form.daysInactive < 1) {
        newErrors.daysInactive = 'Days must be at least 1';
      }
      if (form.cooldownDays < 1) {
        newErrors.cooldownDays = 'Cooldown must be at least 1 day';
      }
    }

    if (currentStep === 'action') {
      if (!form.actionType) {
        newErrors.actionType = 'Please select an action type';
      }
      if (form.actionType === 'promo') {
        const discount = parseFloat(form.discountPercent);
        if (isNaN(discount) || discount < 1 || discount > 100) {
          newErrors.discountPercent = 'Discount must be between 1-100%';
        }
      }
      if (form.actionType === 'loyalty_reward') {
        const points = parseInt(form.pointsAmount);
        if (isNaN(points) || points < 1) {
          newErrors.pointsAmount = 'Points must be at least 1';
        }
      }
    }

    if (currentStep === 'budget') {
      if (form.hasBudget) {
        if (form.totalBudget && parseFloat(form.totalBudget) < 0) {
          newErrors.totalBudget = 'Budget cannot be negative';
        }
        if (form.maxRedemptions && parseInt(form.maxRedemptions) < 1) {
          newErrors.maxRedemptions = 'Must be at least 1';
        }
        if (form.startDate && form.endDate && form.startDate > form.endDate) {
          newErrors.endDate = 'End date must be after start date';
        }
      }
    }

    if (currentStep === 'review') {
      if (!form.name.trim()) {
        newErrors.name = 'Name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (!validateStep(step)) return;

    const currentIndex = STEPS.indexOf(step);
    if (currentIndex < STEPS.length - 1) {
      // Auto-generate name when reaching review
      if (STEPS[currentIndex + 1] === 'review' && !form.name) {
        setForm((prev) => ({ ...prev, name: generateDefaultName() }));
      }
      setStep(STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  };

  // Submit
  const handleSave = async () => {
    if (!validateStep('review')) return;

    setIsSubmitting(true);
    try {
      const conditions: Record<string, any> = {};

      if (form.triggerType === 'churn_risk') {
        conditions.riskLevels = form.riskLevels;
      } else if (form.triggerType === 'inactivity') {
        conditions.daysInactive = form.daysInactive;
      } else if (form.triggerType === 'milestone') {
        if (form.orderCount) conditions.orderCount = form.orderCount;
        if (form.totalSpend) conditions.totalSpend = form.totalSpend;
      } else if (form.triggerType === 'segment_change') {
        conditions.segmentAction = form.segmentAction;
      }

      const actionConfig: Record<string, any> = {
        channel: form.channel,
      };

      if (form.actionType === 'promo') {
        actionConfig.discountPercent = parseFloat(form.discountPercent);
      } else if (form.actionType === 'loyalty_reward') {
        actionConfig.pointsAmount = parseInt(form.pointsAmount);
      }

      if (form.customMessage) {
        actionConfig.customMessage = form.customMessage;
      }

      if (form.template) {
        actionConfig.template = form.template;
      }

      const input: CreateTriggerInput = {
        name: form.name,
        description: form.description,
        triggerType: form.triggerType!,
        conditions,
        actionType: form.actionType!,
        actionConfig,
        cooldownDays: form.cooldownDays,
        targetSegments: form.targetSegments,
        excludeSegments: [],
        minClv: form.minClv ? parseFloat(form.minClv) : null,
        maxClv: form.maxClv ? parseFloat(form.maxClv) : null,
        isActive: form.isActive,
      };

      if (form.hasBudget) {
        input.budget = {
          hasBudget: true,
          totalBudget: form.totalBudget ? parseFloat(form.totalBudget) : undefined,
          costPerExecution: form.costPerExecution ? parseFloat(form.costPerExecution) : undefined,
          maxRedemptions: form.maxRedemptions ? parseInt(form.maxRedemptions) : undefined,
          startDate: form.startDate || undefined,
          endDate: form.endDate || undefined,
        };
      }

      await onSave(input);
      onClose();
    } catch (error) {
      console.error('Error saving trigger:', error);
      setErrors({ submit: 'Failed to save trigger. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepIndex = STEPS.indexOf(step);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Trigger' : 'Create Trigger'}</DialogTitle>
          <DialogDescription>
            {step === 'type' && 'Select the type of trigger you want to create'}
            {step === 'conditions' && 'Configure when this trigger should fire'}
            {step === 'action' && 'Choose what happens when the trigger fires'}
            {step === 'budget' && 'Set budget limits (optional)'}
            {step === 'review' && 'Review and activate your trigger'}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          {STEPS.map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  index < currentStepIndex
                    ? 'bg-green-500 text-white'
                    : index === currentStepIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                )}
              >
                {index < currentStepIndex ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-1 h-0.5 w-8',
                    index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          {/* Step 1: Type Selection */}
          {step === 'type' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">What triggers this action?</p>
              <div className="grid grid-cols-2 gap-3">
                {TRIGGER_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => {
                        setForm({ ...form, triggerType: type.value });
                        handleNext();
                      }}
                      className={cn(
                        'rounded-lg border-2 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50',
                        form.triggerType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn('rounded-lg p-2', type.color)}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{type.label}</p>
                          <p className="text-xs text-gray-500">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.triggerType && <p className="text-sm text-red-500">{errors.triggerType}</p>}
            </div>
          )}

          {/* Step 2: Conditions */}
          {step === 'conditions' && (
            <div className="space-y-6">
              {/* Type-specific conditions */}
              {form.triggerType === 'churn_risk' && (
                <div className="space-y-3">
                  <Label>Risk Levels to Target</Label>
                  <div className="flex gap-2">
                    {(['medium', 'high', 'critical'] as RiskLevel[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          const newLevels = form.riskLevels.includes(level)
                            ? form.riskLevels.filter((l) => l !== level)
                            : [...form.riskLevels, level];
                          setForm({ ...form, riskLevels: newLevels });
                        }}
                        className={cn(
                          'rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors',
                          form.riskLevels.includes(level)
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {form.triggerType === 'inactivity' && (
                <div className="space-y-3">
                  <Label htmlFor="daysInactive">Days Inactive</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="daysInactive"
                      type="number"
                      min={1}
                      value={form.daysInactive}
                      onChange={(e) =>
                        setForm({ ...form, daysInactive: parseInt(e.target.value) || 0 })
                      }
                      className="w-24"
                    />
                    <span className="text-gray-600">days without a visit</span>
                  </div>
                  {errors.daysInactive && (
                    <p className="text-sm text-red-500">{errors.daysInactive}</p>
                  )}
                </div>
              )}

              {form.triggerType === 'milestone' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderCount">Order Count Milestone</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="orderCount"
                        type="number"
                        min={1}
                        value={form.orderCount}
                        onChange={(e) =>
                          setForm({ ...form, orderCount: parseInt(e.target.value) || 0 })
                        }
                        className="w-24"
                      />
                      <span className="text-gray-600">orders</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSpend">Or Total Spend Milestone</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="totalSpend"
                        type="number"
                        min={0}
                        value={form.totalSpend}
                        onChange={(e) =>
                          setForm({ ...form, totalSpend: parseInt(e.target.value) || 0 })
                        }
                        className="w-32"
                      />
                      <span className="text-gray-600">{currencyCode}</span>
                    </div>
                  </div>
                </div>
              )}

              {form.triggerType === 'segment_change' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Trigger When Customer</Label>
                    <div className="flex gap-2">
                      {(['enter', 'leave'] as const).map((action) => (
                        <button
                          key={action}
                          onClick={() => setForm({ ...form, segmentAction: action })}
                          className={cn(
                            'rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors',
                            form.segmentAction === action
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          )}
                        >
                          {action === 'enter' ? 'Enters' : 'Leaves'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Segments</Label>
                    <div className="flex flex-wrap gap-2">
                      {SEGMENTS.map((seg) => (
                        <button
                          key={seg.value}
                          onClick={() => {
                            const newSegments = form.targetSegments.includes(seg.value)
                              ? form.targetSegments.filter((s) => s !== seg.value)
                              : [...form.targetSegments, seg.value];
                            setForm({ ...form, targetSegments: newSegments as Segment[] });
                          }}
                          className={cn(
                            'rounded-full px-3 py-1 text-sm font-medium transition-all',
                            form.targetSegments.includes(seg.value)
                              ? seg.color
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          )}
                        >
                          {seg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Common: CLV Filter */}
              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-700">CLV Filter (optional)</Label>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Min:</span>
                    <Input
                      type="number"
                      min={0}
                      value={form.minClv}
                      onChange={(e) => setForm({ ...form, minClv: e.target.value })}
                      placeholder="0"
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Max:</span>
                    <Input
                      type="number"
                      min={0}
                      value={form.maxClv}
                      onChange={(e) => setForm({ ...form, maxClv: e.target.value })}
                      placeholder="No limit"
                      className="w-24"
                    />
                  </div>
                  <span className="text-sm text-gray-500">{currencyCode}</span>
                </div>
              </div>

              {/* Common: Cooldown */}
              <div className="space-y-2">
                <Label htmlFor="cooldown">Cooldown Period</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="cooldown"
                    type="number"
                    min={1}
                    value={form.cooldownDays}
                    onChange={(e) =>
                      setForm({ ...form, cooldownDays: parseInt(e.target.value) || 30 })
                    }
                    className="w-24"
                  />
                  <span className="text-gray-600">days between triggers per customer</span>
                </div>
                {errors.cooldownDays && (
                  <p className="text-sm text-red-500">{errors.cooldownDays}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Action */}
          {step === 'action' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What happens when triggered?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {ACTION_TYPES.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.value}
                        onClick={() => setForm({ ...form, actionType: action.value })}
                        className={cn(
                          'flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all',
                          form.actionType === action.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <div className="rounded-lg bg-gray-100 p-2">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{action.label}</p>
                          <p className="text-xs text-gray-500">{action.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.actionType && <p className="text-sm text-red-500">{errors.actionType}</p>}
              </div>

              {/* Action-specific config */}
              {form.actionType && form.actionType !== 'alert_manager' && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Delivery Channel</Label>
                    <div className="flex gap-2">
                      {CHANNELS.map((ch) => {
                        const Icon = ch.icon;
                        return (
                          <button
                            key={ch.value}
                            onClick={() => setForm({ ...form, channel: ch.value })}
                            className={cn(
                              'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                              form.channel === ch.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {ch.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {form.actionType === 'promo' && (
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Amount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="discount"
                      type="number"
                      min={1}
                      max={100}
                      value={form.discountPercent}
                      onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-gray-600">% off</span>
                  </div>
                  {errors.discountPercent && (
                    <p className="text-sm text-red-500">{errors.discountPercent}</p>
                  )}
                </div>
              )}

              {form.actionType === 'loyalty_reward' && (
                <div className="space-y-2">
                  <Label htmlFor="points">Bonus Points</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="points"
                      type="number"
                      min={1}
                      value={form.pointsAmount}
                      onChange={(e) => setForm({ ...form, pointsAmount: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-gray-600">points</span>
                  </div>
                  {errors.pointsAmount && (
                    <p className="text-sm text-red-500">{errors.pointsAmount}</p>
                  )}
                </div>
              )}

              {/* Custom message */}
              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (optional)</Label>
                <Textarea
                  id="message"
                  value={form.customMessage}
                  onChange={(e) => setForm({ ...form, customMessage: e.target.value })}
                  placeholder="We miss you! Here's a special offer..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 'budget' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="hasBudget"
                  checked={form.hasBudget}
                  onChange={(e) => setForm({ ...form, hasBudget: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="hasBudget" className="text-base font-medium">
                  Set budget limits for this trigger
                </Label>
              </div>

              {form.hasBudget && (
                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalBudget">Total Budget</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="totalBudget"
                          type="number"
                          min={0}
                          value={form.totalBudget}
                          onChange={(e) => setForm({ ...form, totalBudget: e.target.value })}
                          placeholder="No limit"
                        />
                        <span className="text-sm text-gray-500">{currencyCode}</span>
                      </div>
                      {errors.totalBudget && (
                        <p className="text-sm text-red-500">{errors.totalBudget}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxRedemptions">Max Redemptions</Label>
                      <Input
                        id="maxRedemptions"
                        type="number"
                        min={1}
                        value={form.maxRedemptions}
                        onChange={(e) => setForm({ ...form, maxRedemptions: e.target.value })}
                        placeholder="Unlimited"
                      />
                      <p className="text-xs text-gray-500">e.g., "first 1000 customers"</p>
                      {errors.maxRedemptions && (
                        <p className="text-sm text-red-500">{errors.maxRedemptions}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      />
                      {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Trigger will auto-pause when budget or redemption limit is reached.
                  </p>
                </div>
              )}

              {!form.hasBudget && (
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-600">
                    No budget limits - trigger will run until manually paused.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {step === 'review' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Trigger Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Give your trigger a name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What does this trigger do?"
                  rows={2}
                />
              </div>

              {/* Summary */}
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <h4 className="font-medium text-gray-900">Summary</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 font-medium capitalize">
                      {form.triggerType?.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Action:</span>
                    <span className="ml-2 font-medium capitalize">
                      {form.actionType?.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cooldown:</span>
                    <span className="ml-2 font-medium">{form.cooldownDays} days</span>
                  </div>
                  {form.hasBudget && (
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <span className="ml-2 font-medium">
                        {form.totalBudget
                          ? formatCurrency(parseFloat(form.totalBudget), currencyCode)
                          : 'No limit'}
                        {form.maxRedemptions && ` / ${form.maxRedemptions} max`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Activate toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isActive">Activate trigger immediately</Label>
              </div>

              {errors.submit && <p className="text-center text-sm text-red-500">{errors.submit}</p>}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {step !== 'type' && (
            <Button variant="outline" onClick={handleBack}>
              <CaretLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}

          {step !== 'review' && step !== 'type' && <Button onClick={handleNext}>Next</Button>}

          {step === 'review' && (
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? (
                <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightning className="mr-2 h-4 w-4" />
              )}
              {isEditMode ? 'Update' : 'Create'} Trigger
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
