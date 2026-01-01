'use client';

import { useState } from 'react';
import {
  PointsAction,
  ShareTemplate,
  DEFAULT_POINTS_ACTIONS,
  DEFAULT_SHARE_TEMPLATES,
  SharePlatform,
  formatShareMessage,
  buildShareUrl,
} from '@/types/loyalty';

interface EarnPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantName: string;
  merchantHashtags?: string[];
  merchantMentions?: Partial<Record<SharePlatform, string>>;
  customActions?: PointsAction[];
  customTemplates?: ShareTemplate[];
  language?: 'en' | 'it';
  onActionComplete?: (actionType: string, points: number) => void;
}

type TabId = 'all' | 'social' | 'engagement' | 'referral';

export function EarnPointsModal({
  isOpen,
  onClose,
  merchantName,
  merchantHashtags = [],
  merchantMentions = {},
  customActions,
  customTemplates,
  language = 'it',
  onActionComplete,
}: EarnPointsModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [showShareFlow, setShowShareFlow] = useState<ShareTemplate | null>(null);
  const [shareStep, setShareStep] = useState<'choose' | 'photo' | 'preview' | 'done'>('choose');

  const actions = customActions || DEFAULT_POINTS_ACTIONS.filter(a => a.enabled);
  const templates = customTemplates || DEFAULT_SHARE_TEMPLATES;

  if (!isOpen) return null;

  const tabs: { id: TabId; label: string; labelIt: string; icon: string }[] = [
    { id: 'all', label: 'All', labelIt: 'Tutto', icon: '✨' },
    { id: 'social', label: 'Social', labelIt: 'Social', icon: '📱' },
    { id: 'engagement', label: 'Engagement', labelIt: 'Engagement', icon: '🎯' },
    { id: 'referral', label: 'Referral', labelIt: 'Invita', icon: '👥' },
  ];

  const filteredActions = actions.filter(action => {
    if (activeTab === 'all') return true;
    if (activeTab === 'social') return action.category === 'social';
    if (activeTab === 'engagement') return ['engagement', 'gamification', 'event'].includes(action.category);
    if (activeTab === 'referral') return action.category === 'referral';
    return true;
  });

  const handleShare = async (template: ShareTemplate, platform: SharePlatform) => {
    // Build the message
    const message = formatShareMessage(
      language === 'it' ? template.messageTemplateIt : template.messageTemplate,
      { merchant: merchantName }
    );

    // Combine hashtags
    const allHashtags = [...template.hashtags, ...merchantHashtags];

    // Get merchant mention for platform
    const mention = merchantMentions[platform];
    const mentionText = mention ? `@${mention}` : '';

    // Full message with hashtags and mention
    const fullMessage = `${message} ${mentionText} ${allHashtags.map(h => `#${h}`).join(' ')}`.trim();

    // Share URL (merchant profile or menu)
    const shareUrl = `${window.location.origin}/menu`;

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: merchantName,
          text: fullMessage,
          url: shareUrl,
        });
        // Award points for share intent
        onActionComplete?.('share_intent', template.pointsReward);
        setShareStep('done');
      } catch {
        // User cancelled
      }
    } else if (platform === 'instagram') {
      // Instagram doesn't have a share URL, copy to clipboard and open app
      await navigator.clipboard.writeText(fullMessage);
      window.open('instagram://camera', '_blank');
      onActionComplete?.('share_intent', template.pointsReward);
      setShareStep('done');
    } else {
      // Other platforms
      const url = buildShareUrl(platform, fullMessage, shareUrl, allHashtags);
      if (url) {
        window.open(url, '_blank', 'width=600,height=400');
        onActionComplete?.('share_intent', template.pointsReward);
        setShareStep('done');
      }
    }
  };

  const resetShareFlow = () => {
    setShowShareFlow(null);
    setShareStep('choose');
  };

  // Share flow modal
  if (showShareFlow) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]" onClick={resetShareFlow} />
        <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-md mx-auto overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-theme-border-light">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{showShareFlow.icon}</span>
                <h3 className="text-lg font-bold text-theme-text-primary">
                  {language === 'it' ? showShareFlow.nameIt : showShareFlow.name}
                </h3>
              </div>
              <button onClick={resetShareFlow} className="p-2 hover:bg-theme-bg-secondary rounded-lg">
                <svg className="w-5 h-5 text-theme-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {shareStep === 'choose' && (
              <>
                <p className="text-theme-text-secondary text-center mb-6">
                  {language === 'it' ? showShareFlow.descriptionIt : showShareFlow.description}
                </p>

                {/* Points reward */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-theme-text-secondary">
                    {language === 'it' ? 'Guadagnerai' : "You'll earn"}
                  </p>
                  <p className="text-3xl font-black text-green-600 dark:text-green-400">
                    +{showShareFlow.pointsReward}
                  </p>
                  <p className="text-sm text-theme-text-secondary">
                    {language === 'it' ? 'punti' : 'points'}
                  </p>
                </div>

                {/* Message preview */}
                <div className="bg-theme-bg-secondary rounded-xl p-4 mb-6">
                  <p className="text-xs text-theme-text-tertiary mb-2">
                    {language === 'it' ? 'Il tuo messaggio:' : 'Your message:'}
                  </p>
                  <p className="text-theme-text-primary">
                    {formatShareMessage(
                      language === 'it' ? showShareFlow.messageTemplateIt : showShareFlow.messageTemplate,
                      { merchant: merchantName }
                    )}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {[...showShareFlow.hashtags, ...merchantHashtags].map(tag => (
                      <span key={tag} className="text-xs text-blue-500">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Platform buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {showShareFlow.platforms.includes('instagram') && (
                    <button
                      onClick={() => handleShare(showShareFlow, 'instagram')}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90"
                    >
                      <span className="text-xl">📷</span>
                      Instagram
                    </button>
                  )}
                  {showShareFlow.platforms.includes('facebook') && (
                    <button
                      onClick={() => handleShare(showShareFlow, 'facebook')}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl bg-blue-600 text-white font-medium hover:opacity-90"
                    >
                      <span className="text-xl">👍</span>
                      Facebook
                    </button>
                  )}
                  {showShareFlow.platforms.includes('whatsapp') && (
                    <button
                      onClick={() => handleShare(showShareFlow, 'whatsapp')}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl bg-green-500 text-white font-medium hover:opacity-90"
                    >
                      <span className="text-xl">💬</span>
                      WhatsApp
                    </button>
                  )}
                  {showShareFlow.platforms.includes('native') && (
                    <button
                      onClick={() => handleShare(showShareFlow, 'native')}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl bg-theme-bg-secondary text-theme-text-primary font-medium hover:bg-theme-bg-tertiary"
                    >
                      <span className="text-xl">📤</span>
                      {language === 'it' ? 'Altro' : 'Other'}
                    </button>
                  )}
                </div>
              </>
            )}

            {shareStep === 'done' && (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h3 className="text-xl font-bold text-theme-text-primary mb-2">
                  {language === 'it' ? 'Grazie!' : 'Thank you!'}
                </h3>
                <p className="text-theme-text-secondary mb-4">
                  {language === 'it'
                    ? `Hai guadagnato ${showShareFlow.pointsReward} punti!`
                    : `You earned ${showShareFlow.pointsReward} points!`}
                </p>
                <button
                  onClick={resetShareFlow}
                  className="px-6 py-3 bg-theme-bg-secondary text-theme-text-primary rounded-xl font-medium hover:bg-theme-bg-tertiary"
                >
                  {language === 'it' ? 'Chiudi' : 'Close'}
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-md mx-auto max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-theme-border-light">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-theme-text-primary">
                {language === 'it' ? 'Guadagna Punti' : 'Earn Points'}
              </h2>
              <p className="text-sm text-theme-text-secondary">
                {language === 'it' ? 'Completa azioni per accumulare punti' : 'Complete actions to earn points'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-theme-bg-secondary rounded-lg">
              <svg className="w-5 h-5 text-theme-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-theme-border-light overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] py-3 px-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-pink-500 border-b-2 border-pink-500'
                  : 'text-theme-text-secondary hover:text-theme-text-primary'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {language === 'it' ? tab.labelIt : tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {/* Social Share Templates (when social tab or all) */}
          {(activeTab === 'social' || activeTab === 'all') && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide mb-3">
                {language === 'it' ? 'Condividi e Guadagna' : 'Share & Earn'}
              </h3>
              <div className="space-y-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setShowShareFlow(template);
                      setShareStep('choose');
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-theme-bg-secondary rounded-xl hover:bg-theme-bg-tertiary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl">
                      {template.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-theme-text-primary">
                        {language === 'it' ? template.nameIt : template.name}
                      </p>
                      <p className="text-sm text-theme-text-secondary">
                        {language === 'it' ? template.descriptionIt : template.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-500">+{template.pointsReward}</p>
                      <p className="text-xs text-theme-text-tertiary">
                        {language === 'it' ? 'punti' : 'pts'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Other Actions */}
          {filteredActions.length > 0 && (
            <div>
              {(activeTab === 'social' || activeTab === 'all') && (
                <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide mb-3">
                  {language === 'it' ? 'Altre Azioni' : 'Other Actions'}
                </h3>
              )}
              <div className="space-y-2">
                {filteredActions
                  .filter(a => a.category !== 'social' || activeTab !== 'all')
                  .map(action => (
                    <div
                      key={action.type}
                      className="flex items-center gap-4 p-4 bg-theme-bg-secondary rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-xl bg-theme-bg-tertiary flex items-center justify-center text-2xl">
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-theme-text-primary">
                          {language === 'it' ? action.nameIt : action.name}
                        </p>
                        <p className="text-sm text-theme-text-secondary">
                          {language === 'it' ? action.descriptionIt : action.description}
                        </p>
                        {action.maxPointsPerDay && (
                          <p className="text-xs text-theme-text-tertiary mt-1">
                            {language === 'it'
                              ? `Max ${action.maxPointsPerDay} punti/giorno`
                              : `Max ${action.maxPointsPerDay} pts/day`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-500">
                          +{action.points || action.pointsPerUnit}
                          {action.pointsPerUnit && <span className="text-xs">/€</span>}
                        </p>
                        <p className="text-xs text-theme-text-tertiary">
                          {language === 'it' ? 'punti' : 'pts'}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
