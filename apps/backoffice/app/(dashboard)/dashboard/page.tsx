import Link from 'next/link';

// Mock data - in production this would come from API
const stats = [
  { name: 'Total Scans', value: '2,847', change: '+12.5%', changeType: 'positive' },
  { name: 'Active QR Codes', value: '12', change: '+2', changeType: 'positive' },
  { name: 'Menu Items', value: '45', change: '0', changeType: 'neutral' },
  { name: 'Languages', value: '3', change: '+1', changeType: 'positive' },
];

const recentScans = [
  { id: 1, location: 'Table 5', time: '2 min ago', device: 'iPhone', language: 'Korean' },
  { id: 2, location: 'Table 3', time: '5 min ago', device: 'Android', language: 'English' },
  { id: 3, location: 'Table 8', time: '12 min ago', device: 'iPhone', language: 'Vietnamese' },
  { id: 4, location: 'Table 1', time: '18 min ago', device: 'Android', language: 'English' },
  { id: 5, location: 'Table 6', time: '25 min ago', device: 'iPhone', language: 'Japanese' },
];

const quickActions = [
  { name: 'Add Menu Item', href: '/dashboard/content/menu/new', icon: '🍽️' },
  { name: 'Create QR Code', href: '/dashboard/qr-codes/new', icon: '📱' },
  { name: 'Translate Content', href: '/dashboard/translations', icon: '🌍' },
  { name: 'View Analytics', href: '/dashboard/analytics', icon: '📊' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : stat.changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Scans */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Scans</h2>
              <Link
                href="/dashboard/analytics"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentScans.map((scan) => (
              <div key={scan.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{scan.location}</p>
                    <p className="text-sm text-gray-500">{scan.device} • {scan.language}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{scan.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium text-gray-900">{action.name}</span>
                <svg
                  className="h-4 w-4 text-gray-400 ml-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-semibold text-lg">Pro Tip: AI Translation</h3>
            <p className="mt-1 text-blue-100">
              You have 847 untranslated items. Click "Translate Content" to auto-translate
              your menu into all supported languages with one click.
            </p>
            <Link
              href="/dashboard/translations"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
            >
              Translate Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
