'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { listPartnerOrganizations, PartnerOrganization } from '@/lib/partner-service';

export default function PartnerOrganizationsPage() {
  const [organizations, setOrganizations] = useState<PartnerOrganization[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    async function fetchOrganizations() {
      setIsLoading(true);
      try {
        // In production, get partnerId from session
        const partnerId = 'demo-partner-id';
        const result = await listPartnerOrganizations(partnerId, {
          limit,
          offset: page * limit,
          status: statusFilter,
          search: search || undefined,
        });
        setOrganizations(result.organizations);
        setTotal(result.total);
      } catch {
        console.error('Failed to fetch organizations');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrganizations();
  }, [page, statusFilter, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your client organizations ({total} total)
          </p>
        </div>
        <Link
          href="/partner/organizations/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Organization
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Organizations Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          </div>
        ) : organizations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No organizations found</p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Organization
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Brands</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Locations</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Created</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/partner/organizations/${org.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      {org.name}
                    </Link>
                    {org.email && <p className="text-sm text-gray-500">{org.email}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {org.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{org.brandCount}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{org.locationCount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        org.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {org.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(org.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/partner/organizations/${org.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-gray-500">
              Showing {page * limit + 1} to {Math.min((page + 1) * limit, total)} of {total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
