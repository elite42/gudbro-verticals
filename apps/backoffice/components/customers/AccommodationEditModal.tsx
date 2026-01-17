'use client';

/**
 * Accommodation Edit Modal
 *
 * Modal for editing customer accommodation details.
 * Uses Google Places autocomplete for hotel/address search.
 */

import { useState, useEffect } from 'react';
import { X, Building2, MapPin, Calendar, Home, Globe, Loader2 } from 'lucide-react';
import { HotelSearch, AddressSearch, type PlaceResult } from '@/components/onboarding';

export interface AccommodationData {
  visitorType: 'resident' | 'tourist' | 'unknown';
  hotelName?: string | null;
  hotelPlaceId?: string | null;
  hotelAddress?: string | null;
  hotelLatitude?: number | null;
  hotelLongitude?: number | null;
  roomNumber?: string | null;
  arrivalDate?: string | null;
  departureDate?: string | null;
  lifecycleStatus?: 'active' | 'departed' | 'returning';
  homeCity?: string | null;
  homeCountry?: string | null;
}

interface AccommodationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AccommodationData) => Promise<void>;
  initialData?: Partial<AccommodationData>;
  customerName: string;
  /** Location bias for search results */
  locationBias?: { lat: number; lng: number };
}

const VISITOR_TYPES = [
  { value: 'tourist', label: 'Tourist', icon: '✈️', description: 'Visiting from abroad' },
  { value: 'resident', label: 'Resident', icon: '🏠', description: 'Lives locally' },
  { value: 'unknown', label: 'Unknown', icon: '❓', description: 'Not determined yet' },
];

const LIFECYCLE_STATUSES = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'departed', label: 'Departed', color: 'bg-gray-100 text-gray-800' },
  { value: 'returning', label: 'Returning', color: 'bg-purple-100 text-purple-800' },
];

export function AccommodationEditModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  customerName,
  locationBias,
}: AccommodationEditModalProps) {
  const [visitorType, setVisitorType] = useState<'resident' | 'tourist' | 'unknown'>(
    initialData?.visitorType || 'unknown'
  );
  const [hotelName, setHotelName] = useState(initialData?.hotelName || '');
  const [hotelPlaceId, setHotelPlaceId] = useState(initialData?.hotelPlaceId || '');
  const [hotelAddress, setHotelAddress] = useState(initialData?.hotelAddress || '');
  const [hotelLatitude, setHotelLatitude] = useState<number | null>(
    initialData?.hotelLatitude || null
  );
  const [hotelLongitude, setHotelLongitude] = useState<number | null>(
    initialData?.hotelLongitude || null
  );
  const [roomNumber, setRoomNumber] = useState(initialData?.roomNumber || '');
  const [arrivalDate, setArrivalDate] = useState(initialData?.arrivalDate || '');
  const [departureDate, setDepartureDate] = useState(initialData?.departureDate || '');
  const [lifecycleStatus, setLifecycleStatus] = useState<'active' | 'departed' | 'returning'>(
    initialData?.lifecycleStatus || 'active'
  );
  const [homeCity, setHomeCity] = useState(initialData?.homeCity || '');
  const [homeCountry, setHomeCountry] = useState(initialData?.homeCountry || '');
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when modal opens with new data
  useEffect(() => {
    if (isOpen && initialData) {
      setVisitorType(initialData.visitorType || 'unknown');
      setHotelName(initialData.hotelName || '');
      setHotelPlaceId(initialData.hotelPlaceId || '');
      setHotelAddress(initialData.hotelAddress || '');
      setHotelLatitude(initialData.hotelLatitude || null);
      setHotelLongitude(initialData.hotelLongitude || null);
      setRoomNumber(initialData.roomNumber || '');
      setArrivalDate(initialData.arrivalDate || '');
      setDepartureDate(initialData.departureDate || '');
      setLifecycleStatus(initialData.lifecycleStatus || 'active');
      setHomeCity(initialData.homeCity || '');
      setHomeCountry(initialData.homeCountry || '');
    }
  }, [isOpen, initialData]);

  const handleHotelSelect = (place: PlaceResult) => {
    setHotelName(place.name);
    setHotelPlaceId(place.placeId);
    setHotelAddress(place.address);
    setHotelLatitude(place.latitude);
    setHotelLongitude(place.longitude);
  };

  const handleAddressSelect = (place: PlaceResult) => {
    // For residents, store address in the same fields
    setHotelName(''); // Clear hotel name for residents
    setHotelPlaceId(place.placeId);
    setHotelAddress(place.address);
    setHotelLatitude(place.latitude);
    setHotelLongitude(place.longitude);
  };

  const handleClearAccommodation = () => {
    setHotelName('');
    setHotelPlaceId('');
    setHotelAddress('');
    setHotelLatitude(null);
    setHotelLongitude(null);
    setRoomNumber('');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        visitorType,
        hotelName: hotelName || null,
        hotelPlaceId: hotelPlaceId || null,
        hotelAddress: hotelAddress || null,
        hotelLatitude,
        hotelLongitude,
        roomNumber: roomNumber || null,
        arrivalDate: arrivalDate || null,
        departureDate: departureDate || null,
        lifecycleStatus,
        homeCity: homeCity || null,
        homeCountry: homeCountry || null,
      });
      onClose();
    } catch (error) {
      console.error('Error saving accommodation:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Accommodation</h2>
            <p className="text-sm text-gray-500">{customerName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
          {/* Visitor Type */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Customer Type</label>
            <div className="grid grid-cols-3 gap-3">
              {VISITOR_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setVisitorType(type.value as 'resident' | 'tourist' | 'unknown')}
                  className={`flex flex-col items-center rounded-lg border-2 p-3 transition-colors ${
                    visitorType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="mt-1 text-sm font-medium text-gray-900">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tourist-specific fields */}
          {visitorType === 'tourist' && (
            <>
              {/* Hotel Search */}
              <div className="mb-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Building2 className="h-4 w-4" />
                  Accommodation
                </label>
                <HotelSearch
                  onSelect={handleHotelSelect}
                  locationBias={locationBias}
                  defaultValue={hotelName}
                  placeholder="Search hotel, hostel, resort..."
                />
                {hotelAddress && (
                  <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-50 p-2">
                    <p className="text-xs text-gray-600">{hotelAddress}</p>
                    <button
                      type="button"
                      onClick={handleClearAccommodation}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Room Number */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Room Number (optional)
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="e.g. 305, Suite A"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Dates */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4" />
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4" />
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Lifecycle Status */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                <div className="flex gap-2">
                  {LIFECYCLE_STATUSES.map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() =>
                        setLifecycleStatus(status.value as 'active' | 'departed' | 'returning')
                      }
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        lifecycleStatus === status.value
                          ? status.color + ' ring-2 ring-offset-1'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Location */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Home className="h-4 w-4" />
                    Home City
                  </label>
                  <input
                    type="text"
                    value={homeCity}
                    onChange={(e) => setHomeCity(e.target.value)}
                    placeholder="e.g. Seoul, Tokyo"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Globe className="h-4 w-4" />
                    Home Country
                  </label>
                  <input
                    type="text"
                    value={homeCountry}
                    onChange={(e) => setHomeCountry(e.target.value.toUpperCase().slice(0, 2))}
                    placeholder="e.g. KR, JP"
                    maxLength={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* Resident-specific fields */}
          {visitorType === 'resident' && (
            <div className="mb-4">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4" />
                Home Address (optional)
              </label>
              <AddressSearch
                onSelect={handleAddressSelect}
                locationBias={locationBias}
                defaultValue={hotelAddress || ''}
                placeholder="Search address..."
              />
              {hotelAddress && visitorType === 'resident' && (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-50 p-2">
                  <p className="text-xs text-gray-600">{hotelAddress}</p>
                  <button
                    type="button"
                    onClick={handleClearAccommodation}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
