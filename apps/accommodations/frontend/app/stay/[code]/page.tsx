'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  WifiHigh,
  CallBell,
  BookOpen,
  IdentificationCard,
  ClipboardText,
  Compass,
} from '@phosphor-icons/react';
import { useStaySession } from '@/hooks/useStaySession';
import { useServiceCart } from '@/hooks/useServiceCart';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { fetchProperty, fetchDocuments } from '@/lib/stay-api';
import type { PropertyExtended, ServiceCategoryWithItems, GuestDocument } from '@/types/stay';

import DashboardHeader from '@/components/stay/DashboardHeader';
import DashboardGrid from '@/components/stay/DashboardGrid';
import DashboardCard from '@/components/stay/DashboardCard';
import WifiCard, { isWifiDismissed } from '@/components/stay/WifiCard';
import HouseRulesSheet from '@/components/stay/HouseRulesSheet';
import ContactSheet from '@/components/stay/ContactSheet';
import ProfileView from '@/components/stay/ProfileView';
import ReturnGuestBanner from '@/components/stay/ReturnGuestBanner';
import RestaurantSection from '@/components/stay/RestaurantSection';
import ServicesCarousel from '@/components/stay/ServicesCarousel';
import ServiceCatalog from '@/components/stay/ServiceCatalog';
import ActiveOrders from '@/components/stay/ActiveOrders';
import OrderListView from '@/components/stay/OrderListView';
import CartFAB from '@/components/stay/CartFAB';
import CartDrawer from '@/components/stay/CartDrawer';
import LocalDeals from '@/components/stay/LocalDeals';
import UsefulNumbers from '@/components/stay/UsefulNumbers';
import BottomNav from '@/components/BottomNav';
import DocumentUpload from '@/components/stay/DocumentUpload';

export default function InStayDashboard({ params }: { params: { code: string } }) {
  const router = useRouter();
  const { token, stay, isLoading, isAuthenticated } = useStaySession();
  const [propertyExtended, setPropertyExtended] = useState<PropertyExtended | null>(null);
  const [_propertyLoading, setPropertyLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Cart state at page level -- survives tab navigation
  const cart = useServiceCart();

  // Catalog overlay state
  const [showCatalog, setShowCatalog] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryWithItems[]>([]);
  const [serviceTimezone, setServiceTimezone] = useState('UTC');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Order polling
  const { orders, refetch: refetchOrders } = useOrderPolling({
    bookingCode: params.code,
    token: token ?? '',
    enabled: isAuthenticated,
  });

  // Document state
  const [documents, setDocuments] = useState<GuestDocument[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  // WiFi dismiss state for card grid visibility
  const [wifiDismissed, setWifiDismissed] = useState(true); // start hidden to avoid flash

  // Sheet overlay states
  const [showHouseRules, setShowHouseRules] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const loadDocuments = useCallback(async () => {
    if (!token || !isAuthenticated) return;
    const { data } = await fetchDocuments(params.code, token);
    if (data?.documents) setDocuments(data.documents);
  }, [params.code, token, isAuthenticated]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Initialize wifi dismissed state from localStorage
  useEffect(() => {
    setWifiDismissed(isWifiDismissed());
  }, []);

  // Find latest active visa document (used by ProfileView)
  const activeVisa = documents.find((d) => d.documentType === 'visa' && !d.supersededBy);

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

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <div className="px-4 py-6">
            <div className="rounded-2xl border border-[#E8E2D9] bg-white p-8 text-center shadow-sm">
              <MapPin size={48} weight="duotone" className="mx-auto mb-3 text-[#3D8B87]" />
              <h3 className="mb-1 text-base font-semibold text-[#2D2016]">Map</h3>
              <p className="text-sm text-[#8B7355]">
                Explore the local area around {property.name}. Coming soon.
              </p>
            </div>
          </div>
        );

      case 'profile':
        return (
          <ProfileView
            booking={booking}
            room={room}
            property={property}
            documents={documents}
            orders={orders}
            activeVisa={activeVisa}
            onUploadDocument={() => setShowUpload(true)}
          />
        );

      case 'home':
      default: {
        const hasWifi = !!(wifi.network || (wifi.zones && wifi.zones.length > 0));
        const activeOrderCount = orders.filter(
          (o) => o.status !== 'delivered' && o.status !== 'cancelled'
        ).length;
        const documentCount = documents.filter((d) => !d.supersededBy).length;

        return (
          <div className="flex flex-col gap-4">
            {/* Card Grid -- main navigation */}
            <DashboardGrid>
              {/* Row 1: WiFi + Services */}
              {hasWifi && !wifiDismissed && (
                <DashboardCard
                  icon={WifiHigh}
                  label="WiFi"
                  color="#3D8B87"
                  onClick={() =>
                    document.getElementById('wifi-section')?.scrollIntoView({ behavior: 'smooth' })
                  }
                />
              )}
              <DashboardCard
                icon={CallBell}
                label="Services"
                color="#E07A5F"
                badge={serviceCategories.length > 0 ? `${serviceCategories.length}` : undefined}
                onClick={() => setShowCatalog(true)}
              />

              {/* Row 2: House Rules + Documents */}
              <DashboardCard
                icon={BookOpen}
                label="House Rules"
                color="#8B6914"
                onClick={() => setShowHouseRules(true)}
              />
              <DashboardCard
                icon={IdentificationCard}
                label="Documents"
                color="#6366F1"
                badge={documentCount > 0 ? `${documentCount}` : undefined}
                onClick={() =>
                  document
                    .getElementById('documents-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              />

              {/* Row 3: Orders + Concierge */}
              <DashboardCard
                icon={ClipboardText}
                label="Orders"
                color="#059669"
                badge={activeOrderCount > 0 ? `${activeOrderCount}` : undefined}
                onClick={() =>
                  document.getElementById('orders-section')?.scrollIntoView({ behavior: 'smooth' })
                }
              />
              <DashboardCard
                icon={Compass}
                label="Concierge"
                color="#D97706"
                onClick={() => {
                  /* Phase 36 will build Concierge hub */
                }}
              />
            </DashboardGrid>

            {/* Detail sections below the card grid */}
            <div className="flex flex-col gap-4 px-4 pb-4">
              {/* WiFi section -- scroll target */}
              <div id="wifi-section">
                <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                  <WifiCard wifi={wifi} onDismiss={() => setWifiDismissed(true)} />
                </div>
              </div>

              <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                <RestaurantSection
                  hasLinkedFnb={propertyExtended?.hasLinkedFnb ?? false}
                  linkedFnbSlug={propertyExtended?.linkedFnbSlug ?? null}
                  bookingCode={params.code}
                  token={token!}
                />
              </div>

              <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                <ServicesCarousel
                  bookingCode={params.code}
                  token={token!}
                  cart={cart}
                  onViewAll={() => setShowCatalog(true)}
                  onCategoriesLoaded={handleCategoriesLoaded}
                />
              </div>

              {/* Active orders quick status */}
              <ActiveOrders orders={orders} currency={propertyCurrency} />

              {/* Full order history with category tabs */}
              <div id="orders-section">
                <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                  <OrderListView orders={orders} currency={propertyCurrency} />
                </div>
              </div>

              {/* Documents section -- scroll target */}
              <div id="documents-section">
                {token && (
                  <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                    {showUpload ? (
                      <DocumentUpload
                        bookingCode={params.code}
                        token={token}
                        onUploadComplete={() => {
                          loadDocuments();
                          setShowUpload(false);
                        }}
                        existingDocuments={documents}
                      />
                    ) : (
                      <>
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-[#2D2016]">Documents</h3>
                          <button
                            onClick={() => setShowUpload(true)}
                            className="rounded-lg bg-[#3D8B87]/10 px-3 py-1.5 text-xs font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/20"
                          >
                            Upload Document
                          </button>
                        </div>
                        {documents.length === 0 ? (
                          <p className="text-xs text-[#8B7355]">
                            No documents uploaded yet. Upload your passport for residence
                            registration.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {documents
                              .filter((d) => !d.supersededBy)
                              .map((doc) => (
                                <div
                                  key={doc.id}
                                  className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-3 py-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">
                                      {doc.documentType === 'passport' ? '\u{1F6C2}' : '\u{1F4C4}'}
                                    </span>
                                    <div>
                                      <p className="text-xs font-medium capitalize text-[#2D2016]">
                                        {doc.documentType}
                                      </p>
                                      {doc.visaExpiryDate && (
                                        <p className="text-[10px] text-[#8B7355]">
                                          Expires: {doc.visaExpiryDate}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {doc.registeredWithAuthorities && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                                      Registered
                                    </span>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                <LocalDeals bookingCode={params.code} token={token!} />
              </div>

              <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                <UsefulNumbers bookingCode={params.code} token={token!} />
              </div>

              {propertyExtended?.returnBannerText && propertyExtended?.returnBannerUrl && (
                <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                  <ReturnGuestBanner
                    text={propertyExtended.returnBannerText}
                    url={propertyExtended.returnBannerUrl}
                  />
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        property={property}
        defaultCurrency={propertyCurrency}
        onCurrencyChange={setSelectedCurrency}
        onContactHost={() => setShowContact(true)}
      />

      <div className="pb-20">{renderTabContent()}</div>

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

      {/* House Rules bottom sheet */}
      <HouseRulesSheet
        isOpen={showHouseRules}
        onClose={() => setShowHouseRules(false)}
        checkInTime={property.checkInTime}
        checkoutTime={property.checkoutTime}
        checkoutProcedure={property.checkoutProcedure}
        houseRules={property.houseRules}
      />

      {/* Contact Host bottom sheet */}
      <ContactSheet
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        phone={hostPhone}
        whatsapp={property.contactWhatsapp}
        roomNumber={room.number}
        propertyName={property.name}
      />

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
