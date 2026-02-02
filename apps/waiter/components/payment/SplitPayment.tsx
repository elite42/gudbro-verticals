'use client';

/**
 * Split Payment Component
 *
 * Handles split bill payment (equal or custom amounts).
 */

import { useState } from 'react';
import { Divide, Users, CheckCircle, Minus, Plus } from '@phosphor-icons/react';

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

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
    setPeople((prev) =>
      prev.map((p) =>
        p.id === personId ? { ...p, paid: !p.paid } : p
      )
    );
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
        <div className="text-center py-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users size={24} weight="duotone" className="text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold text-blue-800 dark:text-blue-200">
              {paidCount} / {numPeople} pagati
            </span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mx-auto max-w-xs">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
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
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                person.paid
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-theme-border-light hover:border-theme-border-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  person.paid
                    ? 'bg-green-500 text-white'
                    : 'bg-theme-bg-secondary text-theme-text-secondary'
                }`}>
                  {person.paid ? <CheckCircle size={20} weight="bold" /> : person.id}
                </div>
                <span className={`font-medium ${person.paid ? 'text-green-700 dark:text-green-300' : 'text-theme-text-primary'}`}>
                  Persona {person.id}
                </span>
              </div>
              <span className={`font-bold ${person.paid ? 'text-green-600 dark:text-green-400 line-through' : 'text-theme-text-primary'}`}>
                {formatCurrency(person.amount)}
              </span>
            </button>
          ))}
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={!allPaid}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-colors ${
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
      <div className="text-center py-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
        <Divide size={40} weight="duotone" className="mx-auto text-blue-600 dark:text-blue-400 mb-2" />
        <p className="text-sm text-blue-700 dark:text-blue-300">Totale da dividere</p>
        <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Mode selection */}
      <div className="flex gap-2 p-1 bg-theme-bg-secondary rounded-xl">
        <button
          onClick={() => setMode('equal')}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            mode === 'equal'
              ? 'bg-blue-500 text-white'
              : 'text-theme-text-secondary'
          }`}
        >
          Parti uguali
        </button>
        <button
          onClick={() => setMode('custom')}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            mode === 'custom'
              ? 'bg-blue-500 text-white'
              : 'text-theme-text-secondary'
          }`}
        >
          Importi custom
        </button>
      </div>

      {mode === 'equal' && (
        <>
          {/* Number of people */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-theme-text-secondary">
              Quante persone?
            </p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setNumPeople(Math.max(2, numPeople - 1))}
                className="w-12 h-12 rounded-full bg-theme-bg-secondary flex items-center justify-center text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
              >
                <Minus size={24} weight="bold" />
              </button>
              <span className="text-4xl font-bold text-theme-text-primary w-16 text-center">
                {numPeople}
              </span>
              <button
                onClick={() => setNumPeople(Math.min(20, numPeople + 1))}
                className="w-12 h-12 rounded-full bg-theme-bg-secondary flex items-center justify-center text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
              >
                <Plus size={24} weight="bold" />
              </button>
            </div>
          </div>

          {/* Calculation */}
          <div className="p-4 bg-theme-bg-secondary rounded-2xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-theme-text-secondary">Totale</span>
              <span className="text-theme-text-primary">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-theme-text-secondary">Diviso per</span>
              <span className="text-theme-text-primary">{numPeople} persone</span>
            </div>
            <div className="border-t border-theme-border-light pt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-theme-text-primary">Ciascuno paga</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(amountPerPerson)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === 'custom' && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl text-center">
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
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Users size={24} weight="bold" />
        Inizia divisione
      </button>
    </div>
  );
}
