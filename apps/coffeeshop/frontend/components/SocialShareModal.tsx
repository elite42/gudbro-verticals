'use client';

import { useState } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { engagementStore } from '../lib/engagement-store';
import { userProfileStore } from '../lib/user-profile-store';

interface SocialShareModalProps {
  action: 'photo' | 'checkin' | 'follow';
  onClose: () => void;
}

export function SocialShareModal({ action, onClose }: SocialShareModalProps) {
  const [step, setStep] = useState<'instructions' | 'verify' | 'success'>('instructions');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const engagement = (coffeeshopConfig as any).engagement;
  if (!engagement) return null;

  const { socialPlatforms, rewards } = engagement;
  const instagram = socialPlatforms.find((p: any) => p.id === 'instagram');

  const handleVerify = () => {
    // Create engagement record
    const userId = userProfileStore.getRaw().name || 'anonymous';
    const record = engagementStore.create({
      userId,
      action,
      instagramUsername: instagramUsername || undefined,
      postUrl: postUrl || undefined,
      platform: 'instagram',
      email: email || undefined,
    });

    setDiscountCode(record.discountCode);
    setStep('success');

    // TODO: In production, verify post/checkin/follow via API
    console.log('Social Action:', {
      action,
      instagramUsername,
      postUrl,
    });
  };

  const getConfig = () => {
    switch (action) {
      case 'photo':
        return {
          icon: '📸',
          title: 'Share a Photo',
          reward: rewards.photo_share.value,
          color: 'from-pink-400 to-rose-500',
        };
      case 'checkin':
        return {
          icon: '📍',
          title: 'Check-In',
          reward: rewards.checkin.value,
          color: 'from-blue-400 to-cyan-500',
        };
      case 'follow':
        return {
          icon: '👥',
          title: 'Follow Us',
          reward: rewards.follow.value,
          color: 'from-purple-400 to-indigo-500',
        };
    }
  };

  const config = getConfig();

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full
            bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Instructions */}
          {step === 'instructions' && (
            <>
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-4xl`}>
                  {config.icon}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {config.title}
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Follow these steps to earn {config.reward}% off
              </p>

              {/* Instructions */}
              <div className="space-y-4 mb-8">
                {action === 'photo' && instagram && (
                  <>
                    <InstructionStep
                      number={1}
                      text="Take a photo of your favorite dish"
                    />
                    <InstructionStep
                      number={2}
                      text={`Post on Instagram and tag ${instagram.handle}`}
                    />
                    <InstructionStep
                      number={3}
                      text={`Add hashtags: ${instagram.hashtags.join(' ')}`}
                    />
                    <InstructionStep
                      number={4}
                      text="Show to staff or enter your Instagram username below"
                    />
                  </>
                )}

                {action === 'checkin' && instagram && (
                  <>
                    <InstructionStep
                      number={1}
                      text="Open Instagram Stories"
                    />
                    <InstructionStep
                      number={2}
                      text="Tag our location: ROOTS Plant-Based Cafe"
                    />
                    <InstructionStep
                      number={3}
                      text={`Mention ${instagram.handle} in your story`}
                    />
                    <InstructionStep
                      number={4}
                      text="Enter your Instagram username below"
                    />
                  </>
                )}

                {action === 'follow' && instagram && (
                  <>
                    <InstructionStep
                      number={1}
                      text="Open Instagram"
                    />
                    <InstructionStep
                      number={2}
                      text={`Search for ${instagram.handle}`}
                    />
                    <InstructionStep
                      number={3}
                      text="Follow our account"
                    />
                    <InstructionStep
                      number={4}
                      text="Enter your Instagram username below"
                    />

                    {/* Quick Link */}
                    <a
                      href={`https://instagram.com/${instagram.handle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-xl font-bold text-center hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
                    >
                      Open Instagram →
                    </a>
                  </>
                )}
              </div>

              <button
                onClick={() => setStep('verify')}
                className={`w-full bg-gradient-to-r ${config.color} text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg`}
              >
                I've Done This! →
              </button>
            </>
          )}

          {/* Step 2: Verification */}
          {step === 'verify' && instagram && (
            <>
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-4xl`}>
                  ✓
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Verify Your Action
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Help us verify and claim your reward
              </p>

              {/* Verification Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Instagram Username
                  </label>
                  <input
                    type="text"
                    value={instagramUsername}
                    onChange={(e) => setInstagramUsername(e.target.value)}
                    placeholder="@username"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900
                      placeholder-gray-400 focus:outline-none focus:border-pink-500"
                  />
                </div>

                {action === 'photo' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Post URL (optional)
                    </label>
                    <input
                      type="url"
                      value={postUrl}
                      onChange={(e) => setPostUrl(e.target.value)}
                      placeholder="https://instagram.com/p/..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900
                        placeholder-gray-400 focus:outline-none focus:border-pink-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Paste the link to your Instagram post for faster verification
                    </p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Verification:</strong> Our staff will verify your {action === 'photo' ? 'post' : action === 'checkin' ? 'check-in' : 'follow'} and you'll receive your discount code instantly.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('instructions')}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleVerify}
                  disabled={!instagramUsername.trim()}
                  className={`flex-1 bg-gradient-to-r ${config.color} text-white px-6 py-4 rounded-xl font-bold
                    hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                >
                  Verify & Get Code
                </button>
              </div>
            </>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <>
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-4xl`}>
                  🎁
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Thank You!
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Here's your discount code
              </p>

              {/* Discount Code */}
              <div className={`bg-gradient-to-r ${config.color.replace('from-', 'from-').replace('to-', 'to-').replace('400', '50').replace('500', '50')} border-2 border-current rounded-2xl p-6 mb-6 text-center`} style={{borderColor: config.color.includes('pink') ? '#ec4899' : config.color.includes('blue') ? '#3b82f6' : '#a855f7'}}>
                <div className="text-sm text-gray-600 mb-2">Your Discount Code</div>
                <div className="text-3xl font-mono font-bold text-gray-900 mb-3">{discountCode}</div>
                <div className="text-sm text-gray-600 mb-4">
                  {config.reward}% OFF • Valid for 30 days
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(discountCode);
                    alert('Code copied to clipboard!');
                  }}
                  className={`bg-gradient-to-r ${config.color} text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all`}
                >
                  Copy Code
                </button>
              </div>

              {/* Optional Email Collection - Opzione A */}
              {!emailSent && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">
                    💌 Get this code via email?
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    We'll send it to you so you won't lose it!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (email && email.includes('@')) {
                          console.log('Email to send discount code:', email, discountCode);
                          setEmailSent(true);
                        } else {
                          alert('Please enter a valid email');
                        }
                      }}
                      disabled={!email || !email.includes('@')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Optional • Create an account to access your codes on any device
                  </p>
                </div>
              )}

              {/* Email sent confirmation */}
              {emailSent && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-green-800 font-medium">
                    ✅ Email sent to {email}!
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Instruction Step Component
 */
function InstructionStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
        {number}
      </div>
      <p className="flex-1 text-gray-700 pt-1">{text}</p>
    </div>
  );
}
