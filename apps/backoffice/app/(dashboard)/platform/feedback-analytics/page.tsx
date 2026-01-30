import { AnalyticsDashboard } from '@/components/feedback-analytics/AnalyticsDashboard';

export default function FeedbackAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback Analytics</h1>
        <p className="text-gray-500">
          Visual insights into feedback volume, distribution, and response performance
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
