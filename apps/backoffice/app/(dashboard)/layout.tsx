import { Sidebar as _Sidebar } from '@/components/layout/Sidebar';
import { Header as _Header } from '@/components/layout/Header';
import { TenantProvider } from '@/lib/contexts/TenantContext';
import { ToastProvider } from '@/lib/contexts/ToastContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { AIProvider } from '@/lib/contexts/AIContext';
import { SidebarProvider } from '@/lib/contexts/SidebarContext';
import { ToastContainer } from '@/components/ui/Toast';
import { AIChatWrapper } from '@/components/ai';
import { DashboardContent } from '@/components/layout/DashboardContent';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TenantProvider>
        <ToastProvider>
          <AIProvider>
            <SidebarProvider>
              <DashboardContent>{children}</DashboardContent>
              <ToastContainer />
              {/* AI Co-Manager sidebar */}
              <AIChatWrapper />
            </SidebarProvider>
          </AIProvider>
        </ToastProvider>
      </TenantProvider>
    </AuthProvider>
  );
}
