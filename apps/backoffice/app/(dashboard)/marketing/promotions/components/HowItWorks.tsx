'use client';

interface HowItWorksProps {
  t: (key: string) => string;
}

export function HowItWorks({ t }: HowItWorksProps) {
  return (
    <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <h3 className="mb-4 font-bold text-gray-900">{t('howItWorks.title')}</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
            1
          </div>
          <div>
            <p className="font-medium text-gray-900">{t('howItWorks.step1Title')}</p>
            <p className="text-sm text-gray-600">{t('howItWorks.step1Desc')}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
            2
          </div>
          <div>
            <p className="font-medium text-gray-900">{t('howItWorks.step2Title')}</p>
            <p className="text-sm text-gray-600">{t('howItWorks.step2Desc')}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 font-bold text-white">
            3
          </div>
          <div>
            <p className="font-medium text-gray-900">{t('howItWorks.step3Title')}</p>
            <p className="text-sm text-gray-600">{t('howItWorks.step3Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
