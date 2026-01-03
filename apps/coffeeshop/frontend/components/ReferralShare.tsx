'use client';

import { useState, useEffect } from 'react';
import { getCurrentSession } from '../lib/auth-service';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ReferralShareProps {
  compact?: boolean;
}

export function ReferralShare({ compact = false }: ReferralShareProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ successful: 0, pending: 0, totalPoints: 0 });

  useEffect(() => {
    async function loadReferralData() {
      if (!isSupabaseConfigured || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          setIsLoading(false);
          return;
        }

        // Get account with referral code
        const { data: account } = await supabase
          .from('accounts')
          .select('id, referral_code')
          .eq('auth_id', session.user.id)
          .single();

        if (account) {
          setReferralCode(account.referral_code);

          // Get referral stats
          const { data: statsData } = await supabase
            .from('v_referral_stats')
            .select('successful_referrals, pending_referrals, total_points_earned')
            .eq('account_id', account.id)
            .single();

          if (statsData) {
            setStats({
              successful: statsData.successful_referrals || 0,
              pending: statsData.pending_referrals || 0,
              totalPoints: statsData.total_points_earned || 0,
            });
          }
        }
      } catch (err) {
        console.error('[ReferralShare] Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadReferralData();
  }, []);

  const referralUrl = referralCode
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/sign-up?ref=${referralCode}`
    : '';

  const handleCopy = async () => {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async (platform: string) => {
    const shareText = `Join me on GudBro and get rewarded! Use my referral code: ${referralCode}`;

    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${referralUrl}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(shareText)}`,
      email: `mailto:?subject=${encodeURIComponent('Join me on GudBro!')}&body=${encodeURIComponent(`${shareText}\n\n${referralUrl}`)}`,
    };

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: 'Join GudBro',
          text: shareText,
          url: referralUrl,
        });
      } catch {
        // User cancelled
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-xl p-4">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-full" />
      </div>
    );
  }

  if (!referralCode) {
    return (
      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👥</span>
          <div>
            <p className="font-semibold text-purple-900">Invite Friends</p>
            <p className="text-sm text-purple-600">Sign in to get your referral code</p>
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-semibold text-purple-900">Your Referral Code</p>
              <p className="text-lg font-mono font-bold text-purple-600">{referralCode}</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        {stats.successful > 0 && (
          <p className="text-xs text-purple-600 mt-2">
            {stats.successful} friends joined | {stats.totalPoints} pts earned
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
          👥
        </div>
        <div>
          <h3 className="text-xl font-bold">Invite Friends</h3>
          <p className="text-purple-100 text-sm">Earn 100 pts per friend!</p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="bg-white/20 rounded-xl p-4 mb-4">
        <p className="text-sm text-purple-100 mb-1">Your Referral Code</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-mono font-bold tracking-wider">{referralCode}</span>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-green-400 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex-1 py-3 bg-green-500 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>💬</span> WhatsApp
        </button>
        <button
          onClick={() => handleShare('telegram')}
          className="flex-1 py-3 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>✈️</span> Telegram
        </button>
        <button
          onClick={() => handleShare('email')}
          className="flex-1 py-3 bg-gray-600 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>📧</span> Email
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 bg-white/10 rounded-xl p-3">
        <div className="text-center">
          <p className="text-2xl font-bold">{stats.successful}</p>
          <p className="text-xs text-purple-200">Joined</p>
        </div>
        <div className="text-center border-x border-white/20">
          <p className="text-2xl font-bold">{stats.pending}</p>
          <p className="text-xs text-purple-200">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{stats.totalPoints}</p>
          <p className="text-xs text-purple-200">Pts Earned</p>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="mt-4 text-center text-sm text-purple-200">
        <p>🎁 Your friend gets <strong>25 pts</strong> welcome bonus too!</p>
      </div>
    </div>
  );
}

export default ReferralShare;
