import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { TenantProvider } from '@/lib/contexts/TenantContext';
import { ToastProvider } from '@/lib/contexts/ToastContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { ToastContainer } from '@/components/ui/Toast';
import { AIChatWrapper } from '@/components/ai';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TenantProvider>
        <ToastProvider>
          <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </div>
          <ToastContainer />
          {/* AI Co-Manager floating chat */}
          <AIChatWrapper />
        </ToastProvider>
      </TenantProvider>
    </AuthProvider>
  );
}
