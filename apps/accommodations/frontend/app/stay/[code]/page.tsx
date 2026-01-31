'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useStaySession } from '@/hooks/useStaySession';
import { useServiceCart } from '@/hooks/useServiceCart';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { fetchProperty } from '@/lib/stay-api';
import type { PropertyExtended, ServiceCategoryWithItems } from '@/types/stay';

import DashboardHeader from '@/components/stay/DashboardHeader';
import WifiCard from '@/components/stay/WifiCard';
import WelcomeCard from '@/components/stay/WelcomeCard';
import QuickActions from '@/components/stay/QuickActions';
import CheckoutInfo from '@/components/stay/CheckoutInfo';
import ContactSheet from '@/components/stay/ContactSheet';
import VisaStatusCard from '@/components/stay/VisaStatusCard';
import ReturnGuestBanner from '@/components/stay/ReturnGuestBanner';
import RestaurantSection from '@/components/stay/RestaurantSection';
import ServicesCarousel from '@/components/stay/ServicesCarousel';
import ServiceCatalog from '@/components/stay/ServiceCatalog';
import ActiveOrders from '@/components/stay/ActiveOrders';
import CartFAB from '@/components/stay/CartFAB';
import CartDrawer from '@/components/stay/CartDrawer';
import LocalDeals from '@/components/stay/LocalDeals';
import UsefulNumbers from '@/components/stay/UsefulNumbers';
import BottomNav from '@/components/BottomNav';

export default function InStayDashboard({ params }: { params: { code: string } }) {
  const router = useRouter();
  const { token, stay, isLoading, isAuthenticated } = useStaySession();
  const [propertyExtended, setPropertyExtended] = useState<PropertyExtended | null>(null);
  const [propertyLoading, setPropertyLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Cart state at page level -- survives tab navigation
  const cart = useServiceCart();

  // Catalog overlay state
  const [showCatalog, setShowCatalog] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryWithItems[]>([]);
  const [serviceTimezone, setServiceTimezone] = useState('UTC');

  // Order polling
  const { orders, refetch: refetchOrders } = useOrderPolling({
    bookingCode: params.code,
    token: token ?? '',
    enabled: isAuthenticated,
  });

  // Callback for ServicesCarousel when categories load
  const handleCategoriesLoaded = useCallback(
    (categories: ServiceCategoryWithItems[], timezone: string) => {
      setServiceCategories(categories);
      setServiceTimezone(timezone);
    },
    []
  );

  // Handle BottomNav tab changes -- "services" opens catalog
  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      if (tab === 'services' && serviceCategories.length > 0) {
        setShowCatalog(true);
      }
    },
    [serviceCategories.length]
  );

  // Redirect to landing if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch extended property data once authenticated
  useEffect(() => {
    if (!token || !stay) return;

    let cancelled = false;
    setPropertyLoading(true);

    fetchProperty(params.code, token).then(({ data }) => {
      if (cancelled) return;
      if (data) {
        // Merge property data with any extended fields
        const extended: PropertyExtended = {
          ...data.property,
          quickActions: (data.property as unknown as PropertyExtended).quickActions || [],
          returnBannerText: (data.property as unknown as PropertyExtended).returnBannerText || null,
          returnBannerUrl: (data.property as unknown as PropertyExtended).returnBannerUrl || null,
          hasLinkedFnb: (data.property as unknown as PropertyExtended).hasLinkedFnb ?? false,
          linkedFnbSlug: (data.property as unknown as PropertyExtended).linkedFnbSlug ?? null,
        };
        setPropertyExtended(extended);
      }
      setPropertyLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [token, stay, params.code]);

  // Loading state
  if (isLoading || !stay) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E07A5F] border-t-transparent" />
          <p className="text-sm text-[#8B7355]">Loading your stay...</p>
        </div>
      </div>
    );
  }

  const { property, room, booking, wifi } = stay;
  const hostPhone = property.contactWhatsapp || property.contactPhone || '';
  // Use first item currency or fallback
  const propertyCurrency = serviceCategories[0]?.items[0]?.currency ?? 'EUR';

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader property={property} />

      <div className="pb-20">
        <WifiCard wifi={wifi} />

        <WelcomeCard booking={booking} room={room} />

        {booking.guestCountry && (
          <VisaStatusCard guestCountry={booking.guestCountry} checkInDate={booking.checkIn} />
        )}

        {hostPhone && (
          <QuickActions
            actions={propertyExtended?.quickActions}
            phone={hostPhone}
            roomNumber={room.number}
            propertyName={property.name}
          />
        )}

        <RestaurantSection
          hasLinkedFnb={propertyExtended?.hasLinkedFnb ?? false}
          linkedFnbSlug={propertyExtended?.linkedFnbSlug ?? null}
          bookingCode={params.code}
          token={token!}
        />

        <ServicesCarousel
          bookingCode={params.code}
          token={token!}
          cart={cart}
          onViewAll={() => setShowCatalog(true)}
          onCategoriesLoaded={handleCategoriesLoaded}
        />

        <ActiveOrders orders={orders} currency={propertyCurrency} />

        <LocalDeals bookingCode={params.code} token={token!} />

        <UsefulNumbers bookingCode={params.code} token={token!} />

        {propertyExtended?.returnBannerText && propertyExtended?.returnBannerUrl && (
          <ReturnGuestBanner
            text={propertyExtended.returnBannerText}
            url={propertyExtended.returnBannerUrl}
          />
        )}

        <CheckoutInfo checkoutTime={property.checkoutTime} houseRules={property.houseRules} />

        {hostPhone && (
          <ContactSheet
            phone={hostPhone}
            whatsapp={property.contactWhatsapp}
            roomNumber={room.number}
            propertyName={property.name}
          />
        )}
      </div>

      {/* CartFAB -- visible when cart has items */}
      <CartFAB itemCount={cart.itemCount} onClick={() => setShowCart(true)} />

      {/* Cart drawer overlay */}
      {showCart && (
        <CartDrawer
          cart={cart}
          bookingCode={params.code}
          token={token!}
          currency={propertyCurrency}
          timezone={serviceTimezone}
          onClose={() => setShowCart(false)}
          onOrderPlaced={() => {
            refetchOrders();
            setShowCart(false);
          }}
        />
      )}

      {/* Full catalog overlay */}
      {showCatalog && serviceCategories.length > 0 && (
        <ServiceCatalog
          categories={serviceCategories}
          cart={cart}
          timezone={serviceTimezone}
          propertyCurrency={propertyCurrency}
          onClose={() => {
            setShowCatalog(false);
            setActiveTab('home');
          }}
        />
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} onMenuToggle={() => {}} />
    </div>
  );
}
