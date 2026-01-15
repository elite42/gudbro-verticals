'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type DomainStatus = 'pending' | 'verifying' | 'verified' | 'failed' | 'expired';
type SSLStatus = 'pending' | 'provisioning' | 'active' | 'failed';

interface DomainConfig {
  domain: string;
  status: DomainStatus;
  sslStatus: SSLStatus;
  verificationToken: string;
  failureReason: string | null;
  verifiedAt: string | null;
}

const CNAME_TARGET = 'cname.vercel-dns.com';

export default function DomainSettingsPage() {
  const [domain, setDomain] = useState('');
  const [config, setConfig] = useState<DomainConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Fetch current domain config
  useEffect(() => {
    async function fetchDomainConfig() {
      try {
        // For now, we'll use the brands table to get domain info
        // In production, this would use the current user's brand/location
        const { data, error } = await supabase
          .from('domain_verifications')
          .select('*')
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching domain:', error);
        }

        if (data) {
          setConfig({
            domain: data.domain,
            status: data.status,
            sslStatus: data.ssl_status || 'pending',
            verificationToken: data.verification_token,
            failureReason: data.failure_reason,
            verifiedAt: data.verified_at,
          });
          setDomain(data.domain);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDomainConfig();
  }, []);

  // Validate domain format
  const isValidDomain = (d: string): boolean => {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
    return domainRegex.test(d);
  };

  // Add/update domain
  const handleSaveDomain = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    if (!isValidDomain(domain.trim())) {
      setError('Please enter a valid domain (e.g., menu.yourdomain.com)');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/settings/domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save domain');
      }

      setConfig({
        domain: result.domain,
        status: 'pending',
        sslStatus: 'pending',
        verificationToken: result.verificationToken,
        failureReason: null,
        verifiedAt: null,
      });
      setSuccess('Domain saved. Please configure your DNS records below.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save domain');
    } finally {
      setIsSaving(false);
    }
  };

  // Verify domain
  const handleVerifyDomain = async () => {
    if (!config?.domain) return;

    setIsVerifying(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/settings/domain/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: config.domain }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Verification failed');
      }

      if (result.verified) {
        setConfig({
          ...config,
          status: 'verified',
          sslStatus: 'provisioning',
          verifiedAt: new Date().toISOString(),
        });
        setSuccess('Domain verified successfully! SSL certificate is being provisioned.');
      } else {
        setConfig({
          ...config,
          status: 'failed',
          failureReason: result.error || 'DNS records not found',
        });
        setError('Verification failed. Please check your DNS configuration.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  // Remove domain
  const handleRemoveDomain = async () => {
    if (!config?.domain) return;

    if (!confirm('Are you sure you want to remove this domain? This action cannot be undone.')) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/settings/domain', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: config.domain }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to remove domain');
      }

      setConfig(null);
      setDomain('');
      setSuccess('Domain removed successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove domain');
    } finally {
      setIsSaving(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Status badge
  const getStatusBadge = (status: DomainStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verifying: 'bg-blue-100 text-blue-800',
      verified: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      pending: 'Pending Verification',
      verifying: 'Verifying...',
      verified: 'Verified',
      failed: 'Verification Failed',
      expired: 'Expired',
    };

    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  // SSL status badge
  const getSSLBadge = (status: SSLStatus) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-800',
      provisioning: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'SSL Pending',
      provisioning: 'Provisioning SSL...',
      active: 'SSL Active',
      failed: 'SSL Failed',
    };

    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Custom Domain</h1>
        <p className="mt-1 text-sm text-gray-500">
          Connect your own domain to display your menu (e.g., menu.yourbrand.com)
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Current Domain Status */}
      {config && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Current Domain</h3>
              <p className="mt-1 font-mono text-lg text-gray-700">{config.domain}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(config.status)}
              {config.status === 'verified' && getSSLBadge(config.sslStatus)}
            </div>
          </div>

          {config.failureReason && (
            <div className="mt-4 rounded-lg bg-red-50 p-3">
              <p className="text-sm text-red-700">{config.failureReason}</p>
            </div>
          )}

          {config.verifiedAt && (
            <p className="mt-2 text-xs text-gray-500">
              Verified on {new Date(config.verifiedAt).toLocaleDateString()}
            </p>
          )}

          <div className="mt-4 flex gap-3">
            {config.status !== 'verified' && (
              <button
                onClick={handleVerifyDomain}
                disabled={isVerifying}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Verify Now'}
              </button>
            )}
            <button
              onClick={handleRemoveDomain}
              disabled={isSaving}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Remove Domain
            </button>
          </div>
        </div>
      )}

      {/* Add/Update Domain */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">
          {config ? 'Change Domain' : 'Add Custom Domain'}
        </h3>
        <p className="text-sm text-gray-500">Enter the domain you want to use for your menu</p>

        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value.toLowerCase())}
            placeholder="menu.yourdomain.com"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSaveDomain}
            disabled={isSaving || !domain.trim()}
            className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* DNS Configuration Instructions */}
      {config && config.status !== 'verified' && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="font-semibold text-gray-900">DNS Configuration</h3>
          <p className="mt-1 text-sm text-gray-600">
            Add the following DNS record to your domain provider:
          </p>

          <div className="mt-4 space-y-4">
            {/* CNAME Record */}
            <div className="rounded-lg bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  CNAME Record (Recommended)
                </span>
                <button
                  onClick={() => copyToClipboard(CNAME_TARGET, 'cname')}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {copied === 'cname' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-2 pr-4">Type</th>
                      <th className="pb-2 pr-4">Name/Host</th>
                      <th className="pb-2">Value/Target</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr>
                      <td className="py-2 pr-4">CNAME</td>
                      <td className="py-2 pr-4">{config.domain.split('.')[0]}</td>
                      <td className="py-2">{CNAME_TARGET}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TXT Record (Alternative) */}
            <div className="rounded-lg bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">TXT Record (Alternative)</span>
                <button
                  onClick={() => copyToClipboard(config.verificationToken, 'txt')}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {copied === 'txt' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-2 pr-4">Type</th>
                      <th className="pb-2 pr-4">Name/Host</th>
                      <th className="pb-2">Value</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr>
                      <td className="py-2 pr-4">TXT</td>
                      <td className="py-2 pr-4">_gudbro-verification</td>
                      <td className="break-all py-2">{config.verificationToken}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            DNS changes can take up to 24-48 hours to propagate. Click &quot;Verify Now&quot; once
            your records are configured.
          </p>
        </div>
      )}

      {/* Plan Upgrade Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💎</span>
          <div>
            <h3 className="font-semibold text-gray-900">Pro Feature</h3>
            <p className="mt-1 text-sm text-gray-600">
              Custom domains are available on Pro and higher plans. Your current plan allows 1
              custom domain.
            </p>
            <button className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
