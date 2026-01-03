'use client';

import { useState, useEffect } from 'react';

interface DepositFormProps {
  authToken: string;
  onSuccess?: (result: { pointsCredited: number; newBalance: number }) => void;
  onCancel?: () => void;
}

interface EconomyConfig {
  pointValue: { value: number; currency: string; pointsPerEuro: number };
  maxDepositPerTransaction: number;
  maxDepositPerDay: number;
  depositOptions: number[];
}

export function DepositForm({ authToken, onSuccess, onCancel }: DepositFormProps) {
  const [config, setConfig] = useState<EconomyConfig | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'amount' | 'payment' | 'processing' | 'success'>('amount');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/economy/config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (e) {
      console.error('Failed to load config:', e);
    }
  };

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
    } else {
      setAmount(null);
    }
    setError(null);
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0) {
      setError('Please select or enter an amount');
      return;
    }

    if (config && amount > config.maxDepositPerTransaction) {
      setError(`Maximum deposit is EUR ${config.maxDepositPerTransaction}`);
      return;
    }

    setLoading(true);
    setStep('processing');
    setError(null);

    try {
      const response = await fetch('/api/economy/deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          amountEur: amount,
          paymentMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Deposit failed');
      }

      setStep('success');
      onSuccess?.(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Deposit failed');
      setStep('payment');
    } finally {
      setLoading(false);
    }
  };

  const pointsToReceive = amount ? Math.floor(amount * (config?.pointValue.pointsPerEuro || 100)) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Add Points</h2>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            &#10005;
          </button>
        )}
      </div>

      {step === 'success' ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">&#10004;</div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Deposit Successful!</h3>
          <p className="text-gray-600">
            You received <strong>{pointsToReceive.toLocaleString()}</strong> points
          </p>
          <button
            onClick={onCancel}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Done
          </button>
        </div>
      ) : step === 'processing' ? (
        <div className="text-center py-8">
          <div className="animate-spin text-4xl mb-4">&#8987;</div>
          <p className="text-gray-600">Processing your deposit...</p>
        </div>
      ) : (
        <>
          {/* Amount Selection */}
          {step === 'amount' && (
            <>
              <p className="text-gray-600 mb-4">Select an amount to add</p>

              {/* Preset amounts */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {(config?.depositOptions || [5, 10, 20, 50, 100]).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAmountSelect(option)}
                    className={`py-3 px-4 rounded-xl border-2 font-semibold transition-colors ${
                      amount === option && !customAmount
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    EUR {option}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    EUR
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    max={config?.maxDepositPerTransaction || 200}
                    step="0.01"
                    className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Max EUR {config?.maxDepositPerTransaction || 200} per transaction
                </p>
              </div>

              {/* Points preview */}
              {amount && amount > 0 && (
                <div className="bg-green-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">You will receive</span>
                    <span className="text-2xl font-bold text-green-600">
                      {pointsToReceive.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep('payment')}
                disabled={!amount || amount <= 0}
                className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Payment
              </button>
            </>
          )}

          {/* Payment Method */}
          {step === 'payment' && (
            <>
              <button
                onClick={() => setStep('amount')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
              >
                &larr; Back
              </button>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold">EUR {amount?.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">Points</span>
                  <span className="font-bold text-green-600">
                    +{pointsToReceive.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-sm font-medium text-gray-700 mb-3">Payment method</p>

              <div className="space-y-3 mb-6">
                {[
                  { value: 'credit_card', label: 'Credit Card', icon: '&#128179;' },
                  { value: 'paypal', label: 'PayPal', icon: '&#127380;' },
                  { value: 'apple_pay', label: 'Apple Pay', icon: '&#63743;' },
                  { value: 'google_pay', label: 'Google Pay', icon: '&#71;' },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                      paymentMethod === method.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span
                      className="text-2xl"
                      dangerouslySetInnerHTML={{ __html: method.icon }}
                    />
                    <span className="font-medium">{method.label}</span>
                    {paymentMethod === method.value && (
                      <span className="ml-auto text-green-500">&#10003;</span>
                    )}
                  </button>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Processing...' : `Pay EUR ${amount?.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Points expire after 24 months of inactivity
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
