'use client';

import { useState } from 'react';
import { awardSocialShare } from '../lib/loyalty-service';

interface SocialShareButtonProps {
  productId: string;
  productName: string;
  productImage?: string;
  productUrl?: string;
  compact?: boolean;
  onShare?: (platform: string, pointsAwarded: number) => void;
}

export function SocialShareButton({
  productId,
  productName,
  productImage,
  productUrl,
  compact = false,
  onShare,
}: SocialShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const shareUrl = productUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `Check out ${productName} on GudBro!`;

  const handleShare = async (platform: string) => {
    setIsSharing(true);

    // Platform-specific share URLs
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    // Open share window
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
        setIsSharing(false);
        return;
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else if (platform === 'copy') {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    }

    // Award loyalty points
    const points = await awardSocialShare(productId, platform);
    setPointsEarned(points);

    if (points > 0) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    onShare?.(platform, points);
    setIsSharing(false);
    setIsOpen(false);
  };

  const platforms = [
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: 'bg-green-500' },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'bg-blue-500' },
    { id: 'facebook', name: 'Facebook', icon: '👍', color: 'bg-blue-600' },
    { id: 'twitter', name: 'X', icon: '𝕏', color: 'bg-black' },
    { id: 'copy', name: 'Copy Link', icon: '🔗', color: 'bg-gray-500' },
  ];

  // Check if native share is available
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  if (compact) {
    return (
      <button
        onClick={() => hasNativeShare ? handleShare('native') : setIsOpen(true)}
        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
        aria-label="Share"
      >
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    );
  }

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => hasNativeShare ? handleShare('native') : setIsOpen(true)}
        disabled={isSharing}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-medium transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
        <span className="text-xs bg-blue-200 px-1.5 py-0.5 rounded-full">+15 pts</span>
      </button>

      {/* Success Toast */}
      {showSuccess && pointsEarned > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10002] animate-bounce">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span>🎉</span>
            <span className="font-semibold">+{pointsEarned} points earned!</span>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[10002]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-[10003] animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>

            <h3 className="text-xl font-bold text-center mb-2">Share this dish</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Earn <span className="font-semibold text-blue-600">15 points</span> for sharing!
            </p>

            <div className="grid grid-cols-5 gap-4 mb-6">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handleShare(platform.id)}
                  disabled={isSharing}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <div className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {platform.icon}
                  </div>
                  <span className="text-xs text-gray-600">{platform.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 text-gray-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default SocialShareButton;
