'use client';

import { useState, useEffect } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { useTranslation } from '../lib/use-translation';

export function WiFiQuickConnect() {
  // @ts-ignore - wifi feature not yet in VerticalConfig type
  const wifi = coffeeshopConfig.wifi;

  // Check if WiFi is configured and enabled BEFORE any hooks
  if (!wifi || !wifi.enabled) {
    return null;
  }

  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // Block scroll when modal is open
  useEffect(() => {
    if (showModal) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Block scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [showModal]);

  // Generate WiFi QR code string
  const generateWiFiString = () => {
    const { ssid, password, security, hidden } = wifi;
    const h = hidden ? 'true' : 'false';

    // Standard WiFi QR format: WIFI:T:WPA;S:SSID;P:password;H:false;;
    return `WIFI:T:${security};S:${ssid};P:${password};H:${h};;`;
  };

  // Generate QR code URL using qrserver API
  const getQRCodeUrl = () => {
    const wifiString = generateWiFiString();
    const encoded = encodeURIComponent(wifiString);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
  };

  // Handle connect button click
  const handleConnect = () => {
    setQrCodeUrl(getQRCodeUrl());
    setShowModal(true);
  };

  // Copy password to clipboard
  const copyPassword = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(wifi.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Swipe to dismiss handlers
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartTime(Date.now());
    setDragY(0);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - startY;
    // Only allow dragging down (positive deltaY)
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const deltaTime = Date.now() - startTime;
    const velocity = dragY / deltaTime; // px per ms

    // Distance threshold: 100px
    // Velocity threshold: 0.5 px/ms
    const shouldClose = dragY > 100 || velocity > 0.5;

    if (shouldClose) {
      // Close modal with animation
      setShowModal(false);
    }

    // Reset drag state
    setIsDragging(false);
    setDragY(0);
    setStartY(0);
    setStartTime(0);
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse event handlers (for desktop testing)
  const onMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientY);
    }
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  return (
    <>
      {/* WiFi Quick Connect Button */}
      <button
        onClick={handleConnect}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 mb-8"
        aria-label={`${t.wifi.button} - ${wifi.ssid}`}
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
        <span className="font-bold text-lg">{t.wifi.button}</span>
      </button>

      {/* Bottom Sheet Modal */}
      {showModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-[60] flex items-end justify-center"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${Math.max(0.4 - (dragY / 500), 0.1)})`
          }}
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.wifi.modalTitle}
        >
          <div
            className="bg-theme-bg-elevated rounded-t-3xl shadow-2xl w-full max-w-lg mb-20 select-none"
            style={{
              transform: `translateY(${dragY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-theme-text-primary">
                    {t.wifi.modalTitle}
                  </h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-secondary hover:text-theme-text-primary transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Network Info */}
              <div className="space-y-4 mb-6">
                {/* Network Name */}
                <div>
                  <label className="text-sm font-medium text-theme-text-tertiary mb-1.5 block">
                    {t.wifi.networkLabel}
                  </label>
                  <div className="bg-theme-bg-secondary px-4 py-3 rounded-xl">
                    <span className="font-mono font-bold text-theme-text-primary text-lg">{wifi.ssid}</span>
                  </div>
                </div>

                {/* Password with Copy */}
                <div>
                  <label className="text-sm font-medium text-theme-text-tertiary mb-1.5 block">
                    {t.wifi.passwordLabel}
                  </label>
                  <div className="bg-theme-bg-secondary px-4 py-3 rounded-xl flex items-center justify-between">
                    <span className="font-mono font-bold text-theme-text-primary text-lg">{wifi.password}</span>
                    <button
                      onClick={copyPassword}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                      aria-label={`${t.common.copy} ${t.wifi.passwordLabel}`}
                    >
                      {copied ? '✓ Copied' : t.common.copy}
                    </button>
                  </div>
                </div>
              </div>

              {/* Share with Friends Section */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-theme-text-primary mb-1">
                    {t.wifi.shareTitle}
                  </h3>
                  <p className="text-sm text-theme-text-secondary">
                    {t.wifi.shareSubtitle}
                  </p>
                </div>

                {/* QR Code */}
                <div className="bg-theme-bg-elevated rounded-xl p-4 flex justify-center shadow-sm">
                  {qrCodeUrl && (
                    <img
                      src={qrCodeUrl}
                      alt="WiFi QR Code"
                      className="w-48 h-48"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
