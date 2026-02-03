'use client';

/**
 * Split Payment Component
 *
 * Handles split bill payment (equal or custom amounts).
 */

import { useState } from 'react';
import { Divide, Users, CheckCircle, Minus, Plus } from '@phosphor-icons/react';
import { formatPrice as _fp } from '@gudbro/utils';

interface SplitPaymentProps {
  total: number;
  onConfirm: (details?: Record<string, unknown>) => void;
}

type SplitMode = 'equal' | 'custom';

interface SplitPerson {
  id: number;
  amount: number;
  paid: boolean;
}

export function SplitPayment({ total, onConfirm }: SplitPaymentProps) {
  const [mode, setMode] = useState<SplitMode>('equal');
  const [numPeople, setNumPeople] = useState(2);
  const [people, setPeople] = useState<SplitPerson[]>([]);

  const formatCurrency = (amount: number) => _fp(amount, 'EUR');

  const amountPerPerson = total / numPeople;
  const allPaid = people.length === numPeople && people.every((p) => p.paid);

  const handleStartSplit = () => {
    setPeople(
      Array.from({ length: numPeople }, (_, i) => ({
        id: i + 1,
        amount: amountPerPerson,
        paid: false,
      }))
    );
  };

  const handleTogglePaid = (personId: number) => {
    setPeople((prev) => prev.map((p) => (p.id === personId ? { ...p, paid: !p.paid } : p)));
  };

  const handleConfirm = () => {
    onConfirm({
      method: 'split',
      mode,
      numPeople,
      amountPerPerson,
      paidCount: people.filter((p) => p.paid).length,
    });
  };

  // Show split tracking view
  if (people.length > 0) {
    const paidCount = people.filter((p) => p.paid).length;
    const paidAmount = paidCount * amountPerPerson;
    const remainingAmount = total - paidAmount;

    return (
      <div className="space-y-6">
        {/* Progress */}
        <div className="rounded-2xl bg-blue-50 py-4 text-center dark:bg-blue-900/20">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Users size={24} weight="duotone" className="text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold text-blue-800 dark:text-blue-200">
              {paidCount} / {numPeople} pagati
            </span>
          </div>
          <div className="mx-auto h-2 w-full max-w-xs rounded-full bg-blue-200 dark:bg-blue-800">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${(paidCount / numPeople) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
            Rimanente: {formatCurrency(remainingAmount)}
          </p>
        </div>

        {/* People list */}
        <div className="space-y-2">
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => handleTogglePaid(person.id)}
              className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all ${
                person.paid
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-theme-border-light hover:border-theme-border-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                    person.paid
                      ? 'bg-green-500 text-white'
                      : 'bg-theme-bg-secondary text-theme-text-secondary'
                  }`}
                >
                  {person.paid ? <CheckCircle size={20} weight="bold" /> : person.id}
                </div>
                <span
                  className={`font-medium ${person.paid ? 'text-green-700 dark:text-green-300' : 'text-theme-text-primary'}`}
                >
                  Persona {person.id}
                </span>
              </div>
              <span
                className={`font-bold ${person.paid ? 'text-green-600 line-through dark:text-green-400' : 'text-theme-text-primary'}`}
              >
                {formatCurrency(person.amount)}
              </span>
            </button>
          ))}
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={!allPaid}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold transition-colors ${
            allPaid
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-theme-bg-secondary text-theme-text-tertiary cursor-not-allowed'
          }`}
        >
          <CheckCircle size={24} weight="bold" />
          {allPaid ? 'Tutto pagato - Chiudi tavolo' : `Mancano ${numPeople - paidCount} pagamenti`}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="rounded-2xl bg-blue-50 py-4 text-center dark:bg-blue-900/20">
        <Divide
          size={40}
          weight="duotone"
          className="mx-auto mb-2 text-blue-600 dark:text-blue-400"
        />
        <p className="text-sm text-blue-700 dark:text-blue-300">Totale da dividere</p>
        <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Mode selection */}
      <div className="bg-theme-bg-secondary flex gap-2 rounded-xl p-1">
        <button
          onClick={() => setMode('equal')}
          className={`flex-1 rounded-lg py-2 font-medium transition-colors ${
            mode === 'equal' ? 'bg-blue-500 text-white' : 'text-theme-text-secondary'
          }`}
        >
          Parti uguali
        </button>
        <button
          onClick={() => setMode('custom')}
          className={`flex-1 rounded-lg py-2 font-medium transition-colors ${
            mode === 'custom' ? 'bg-blue-500 text-white' : 'text-theme-text-secondary'
          }`}
        >
          Importi custom
        </button>
      </div>

      {mode === 'equal' && (
        <>
          {/* Number of people */}
          <div className="space-y-3">
            <p className="text-theme-text-secondary text-sm font-medium">Quante persone?</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setNumPeople(Math.max(2, numPeople - 1))}
                className="bg-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-tertiary flex h-12 w-12 items-center justify-center rounded-full transition-colors"
              >
                <Minus size={24} weight="bold" />
              </button>
              <span className="text-theme-text-primary w-16 text-center text-4xl font-bold">
                {numPeople}
              </span>
              <button
                onClick={() => setNumPeople(Math.min(20, numPeople + 1))}
                className="bg-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-tertiary flex h-12 w-12 items-center justify-center rounded-full transition-colors"
              >
                <Plus size={24} weight="bold" />
              </button>
            </div>
          </div>

          {/* Calculation */}
          <div className="bg-theme-bg-secondary space-y-2 rounded-2xl p-4">
            <div className="flex justify-between text-sm">
              <span className="text-theme-text-secondary">Totale</span>
              <span className="text-theme-text-primary">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-theme-text-secondary">Diviso per</span>
              <span className="text-theme-text-primary">{numPeople} persone</span>
            </div>
            <div className="border-theme-border-light border-t pt-2">
              <div className="flex justify-between">
                <span className="text-theme-text-primary font-semibold">Ciascuno paga</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(amountPerPerson)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === 'custom' && (
        <div className="rounded-2xl bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Importi custom disponibili prossimamente.
            <br />
            Per ora usa "Parti uguali".
          </p>
        </div>
      )}

      {/* Start split button */}
      <button
        onClick={handleStartSplit}
        disabled={mode === 'custom'}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Users size={24} weight="bold" />
        Inizia divisione
      </button>
    </div>
  );
}
