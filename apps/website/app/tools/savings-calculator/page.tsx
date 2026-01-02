'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'VND', symbol: '₫', rate: 24500 },
  { code: 'THB', symbol: '฿', rate: 35 },
  { code: 'KRW', symbol: '₩', rate: 1300 },
];

export default function SavingsCalculatorPage() {
  const [tables, setTables] = useState(15);
  const [coversPerMonth, setCoversPerMonth] = useState(1500);
  const [printFrequency, setPrintFrequency] = useState(4); // times per year
  const [costPerPrint, setCostPerPrint] = useState(100); // per batch
  const [currency, setCurrency] = useState(currencies[0]);
  const [showResults, setShowResults] = useState(false);

  // Calculations
  const annualPrintCost = printFrequency * costPerPrint;
  const staffTimeSaved = coversPerMonth * 0.5; // 0.5 minutes per cover saved
  const staffCostSaved = (staffTimeSaved / 60) * 15 * 12; // $15/hour, annual
  const aovIncrease = coversPerMonth * 25 * 0.22 * 12; // 22% AOV increase on $25 average
  const fasterTurnover = tables * 0.5 * 20 * 300; // 0.5 extra covers per table per day, 300 days

  const totalAnnualSavings = annualPrintCost + staffCostSaved;
  const totalAnnualRevenue = aovIncrease + fasterTurnover;
  const totalBenefit = totalAnnualSavings + totalAnnualRevenue;

  const formatCurrency = (amount: number) => {
    const converted = amount * currency.rate;
    if (currency.code === 'VND') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/tools" className="text-green-200 hover:text-white text-sm">
                Tools
              </Link>
              <span className="text-green-300">/</span>
              <span className="text-sm">Savings Calculator</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                How Much Can You Save with Digital Menus?
              </h1>
              <p className="text-xl text-green-100">
                Calculate your potential savings and ROI from switching to GUDBRO digital menus. Based on real industry data.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Form */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Restaurant Details</h2>

                {/* Currency Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setCurrency(c)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          currency.code === c.code
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {c.code} ({c.symbol})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tables */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Tables: <span className="text-green-600 font-bold">{tables}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={tables}
                    onChange={(e) => setTables(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Covers per Month */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Covers per Month: <span className="text-green-600 font-bold">{coversPerMonth.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={coversPerMonth}
                    onChange={(e) => setCoversPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>500</span>
                    <span>5,000</span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Print Frequency */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Menu Reprints per Year: <span className="text-green-600 font-bold">{printFrequency}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={printFrequency}
                    onChange={(e) => setPrintFrequency(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1x</span>
                    <span>6x</span>
                    <span>12x</span>
                  </div>
                </div>

                {/* Cost per Print */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per Print Batch ({currency.symbol}): <span className="text-green-600 font-bold">{formatCurrency(costPerPrint)}</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={costPerPrint}
                    onChange={(e) => setCostPerPrint(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatCurrency(50)}</span>
                    <span>{formatCurrency(250)}</span>
                    <span>{formatCurrency(500)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowResults(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Calculate My Savings
                </button>
              </div>

              {/* Results */}
              <div>
                {showResults ? (
                  <div className="space-y-6">
                    {/* Total Benefit */}
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white">
                      <p className="text-green-200 text-sm font-medium mb-2">Total Annual Benefit</p>
                      <p className="text-4xl md:text-5xl font-bold mb-2">{formatCurrency(totalBenefit)}</p>
                      <p className="text-green-200">per year with GUDBRO digital menus</p>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4">Savings Breakdown</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">Print Costs Eliminated</p>
                            <p className="text-sm text-gray-500">{printFrequency} reprints × {formatCurrency(costPerPrint)}</p>
                          </div>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(annualPrintCost)}</p>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">Staff Time Saved</p>
                            <p className="text-sm text-gray-500">{Math.round(staffTimeSaved / 60)} hours/month saved</p>
                          </div>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(staffCostSaved)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4">Revenue Increase</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">Higher Average Order (+22%)</p>
                            <p className="text-sm text-gray-500">Visual menus increase upsells</p>
                          </div>
                          <p className="text-lg font-bold text-blue-600">{formatCurrency(aovIncrease)}</p>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">Faster Table Turnover</p>
                            <p className="text-sm text-gray-500">~0.5 extra covers/table/day</p>
                          </div>
                          <p className="text-lg font-bold text-blue-600">{formatCurrency(fasterTurnover)}</p>
                        </div>
                      </div>
                    </div>

                    {/* ROI */}
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">🚀</span>
                        <h3 className="font-bold text-gray-900">ROI with GUDBRO</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        At just <strong>$29/month</strong> for GUDBRO Starter, your investment pays for itself in less than <strong>7 days</strong>.
                      </p>
                      <Link
                        href="/sign-up"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                      >
                        Start Free Trial
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                    <span className="text-6xl block mb-4">📊</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Details</h3>
                    <p className="text-gray-600">
                      Adjust the sliders on the left to see your personalized savings calculation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Based on Real Industry Data</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gray-900 mb-1">70%</p>
                <p className="text-sm text-gray-600">of customers prefer digital menus</p>
                <p className="text-xs text-gray-400 mt-1">Source: Tableo 2025</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gray-900 mb-1">+22%</p>
                <p className="text-sm text-gray-600">average order value increase</p>
                <p className="text-xs text-gray-400 mt-1">Source: ComQI 2023</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gray-900 mb-1">+20%</p>
                <p className="text-sm text-gray-600">more orders with visual menus</p>
                <p className="text-xs text-gray-400 mt-1">Source: Qamarero</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gray-900 mb-1">90%</p>
                <p className="text-sm text-gray-600">reduction in print costs</p>
                <p className="text-xs text-gray-400 mt-1">Source: Industry Average</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
