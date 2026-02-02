'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

/* =============================================================================
   MOCK DATA — All products
   ============================================================================= */

const ALL_PRODUCTS = [
  {
    id: '1', slug: 'paracetamol-500mg',
    nameEn: 'Paracetamol 500mg', nameBrand: 'Panadol', nameVi: 'Thuốc giảm đau hạ sốt',
    generic: 'Acetaminophen / Paracetamol',
    category: 'Pain Relief', categoryKey: 'pain_relief',
    type: 'otc' as const,
    price: 25000,
    dosage: '1-2 tablets every 4-6 hours. Max 8 tablets per day.',
    dosageVi: '1-2 viên mỗi 4-6 giờ. Tối đa 8 viên/ngày.',
    uses: ['Headache', 'Fever', 'Mild pain', 'Toothache', 'Menstrual cramps'],
    warnings: ['Do not exceed recommended dose', 'Avoid with alcohol', 'Check for paracetamol in other medications to avoid double-dosing'],
    sideEffects: ['Rare at normal doses', 'Liver damage if overdosed'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    relatedSymptoms: ['headache', 'fever', 'muscle_pain'],
  },
  {
    id: '2', slug: 'ibuprofen-400mg',
    nameEn: 'Ibuprofen 400mg', nameBrand: 'Advil', nameVi: 'Thuốc kháng viêm giảm đau',
    generic: 'Ibuprofen',
    category: 'Pain Relief', categoryKey: 'pain_relief',
    type: 'otc' as const,
    price: 35000,
    dosage: '1 tablet every 6-8 hours with food. Max 3 tablets per day.',
    dosageVi: '1 viên mỗi 6-8 giờ, uống cùng thức ăn. Tối đa 3 viên/ngày.',
    uses: ['Headache', 'Muscle pain', 'Back pain', 'Inflammation', 'Fever'],
    warnings: ['Take with food', 'Not suitable for stomach ulcer patients', 'Avoid in late pregnancy'],
    sideEffects: ['Stomach irritation', 'Nausea', 'Dizziness (rare)'],
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=300&fit=crop',
    relatedSymptoms: ['headache', 'muscle_pain', 'fever'],
  },
  {
    id: '3', slug: 'loperamide-2mg',
    nameEn: 'Loperamide 2mg', nameBrand: 'Imodium', nameVi: 'Thuốc trị tiêu chảy',
    generic: 'Loperamide Hydrochloride',
    category: 'Stomach & Digestive', categoryKey: 'stomach',
    type: 'otc' as const,
    price: 30000,
    dosage: '2 capsules initially, then 1 after each loose stool. Max 8 per day.',
    dosageVi: '2 viên đầu tiên, sau đó 1 viên sau mỗi lần đi phân lỏng. Tối đa 8 viên/ngày.',
    uses: ['Acute diarrhea', "Traveler's diarrhea"],
    warnings: ['Not for use with fever or bloody stools', 'See a doctor if diarrhea persists over 48 hours', 'Stay hydrated — use ORS'],
    sideEffects: ['Constipation', 'Abdominal cramps', 'Nausea'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
    relatedSymptoms: ['diarrhea', 'stomach'],
  },
  {
    id: '4', slug: 'ors-electrolytes',
    nameEn: 'ORS Electrolytes', nameBrand: 'Oresol', nameVi: 'Bù điện giải',
    generic: 'Oral Rehydration Salts',
    category: 'Stomach & Digestive', categoryKey: 'stomach',
    type: 'otc' as const,
    price: 8000,
    dosage: 'Dissolve 1 packet in 1 liter of clean water. Sip frequently.',
    dosageVi: 'Hòa tan 1 gói trong 1 lít nước sạch. Uống thường xuyên.',
    uses: ['Dehydration', 'After vomiting', 'After diarrhea', 'Heat exhaustion'],
    warnings: ['Use clean or bottled water', 'Discard after 24 hours', 'See doctor if symptoms persist'],
    sideEffects: ['None at normal use'],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop',
    relatedSymptoms: ['diarrhea', 'dehydration', 'fever'],
  },
  {
    id: '5', slug: 'cetirizine-10mg',
    nameEn: 'Cetirizine 10mg', nameBrand: 'Zyrtec', nameVi: 'Thuốc dị ứng',
    generic: 'Cetirizine Hydrochloride',
    category: 'Allergy', categoryKey: 'allergy',
    type: 'otc' as const,
    price: 20000,
    dosage: '1 tablet once daily.',
    dosageVi: '1 viên mỗi ngày.',
    uses: ['Seasonal allergies', 'Hay fever', 'Hives', 'Insect bite itching'],
    warnings: ['May cause drowsiness', 'Avoid driving if drowsy', 'Not suitable for children under 6'],
    sideEffects: ['Drowsiness', 'Dry mouth', 'Headache'],
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop',
    relatedSymptoms: ['allergy', 'insect_bite'],
  },
  {
    id: '6', slug: 'amoxicillin-500mg',
    nameEn: 'Amoxicillin 500mg', nameBrand: 'Amoxil', nameVi: 'Kháng sinh',
    generic: 'Amoxicillin Trihydrate',
    category: 'Antibiotics', categoryKey: 'antibiotics',
    type: 'prescription' as const,
    price: 45000,
    dosage: '1 capsule 3 times daily for 5-7 days. Complete the full course.',
    dosageVi: '1 viên 3 lần/ngày trong 5-7 ngày. Uống hết liều.',
    uses: ['Bacterial infections', 'Respiratory infections', 'Urinary infections', 'Skin infections'],
    warnings: ['Prescription required', 'Complete the full course even if feeling better', 'Allergic reactions possible — tell pharmacist about any penicillin allergy'],
    sideEffects: ['Diarrhea', 'Nausea', 'Rash (may indicate allergy)'],
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=300&fit=crop',
    relatedSymptoms: [],
  },
  {
    id: '7', slug: 'sunscreen-spf50',
    nameEn: 'Sunscreen SPF50+', nameBrand: 'Bioré UV', nameVi: 'Kem chống nắng',
    generic: 'UV Protection Cream',
    category: 'Skincare & Sun', categoryKey: 'skincare',
    type: 'otc' as const,
    price: 120000,
    dosage: 'Apply generously 15 minutes before sun exposure. Reapply every 2 hours.',
    dosageVi: 'Thoa đều 15 phút trước khi ra nắng. Thoa lại mỗi 2 giờ.',
    uses: ['Sun protection', 'Prevent sunburn', 'Prevent skin damage'],
    warnings: ['Reapply after swimming or sweating', 'Avoid eyes', 'Check expiry date'],
    sideEffects: ['Skin irritation (rare)'],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    relatedSymptoms: ['sunburn'],
  },
  {
    id: '8', slug: 'tiger-balm',
    nameEn: 'Tiger Balm', nameBrand: 'Tiger Balm', nameVi: 'Dầu con hổ',
    generic: 'Camphor + Menthol',
    category: 'Pain Relief', categoryKey: 'pain_relief',
    type: 'otc' as const,
    price: 40000,
    dosage: 'Apply to affected area 2-3 times daily. Massage gently.',
    dosageVi: 'Thoa lên vùng đau 2-3 lần/ngày. Massage nhẹ nhàng.',
    uses: ['Muscle aches', 'Headache (temples)', 'Insect bites', 'Nasal congestion'],
    warnings: ['For external use only', 'Avoid eyes and mucous membranes', 'Do not apply on broken skin'],
    sideEffects: ['Skin irritation', 'Burning sensation'],
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=400&h=300&fit=crop',
    relatedSymptoms: ['muscle_pain', 'headache', 'insect_bite'],
  },
];

function formatPrice(vnd: number): string {
  return `${Math.round(vnd / 1000)}k₫`;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={star <= rating ? '#E8A838' : '#E5E7EB'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* =============================================================================
   PRODUCT DETAIL PAGE
   ============================================================================= */

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product = ALL_PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center" style={{ background: 'var(--cloud)' }}>
        <div className="text-center">
          <p className="text-5xl mb-4">💊</p>
          <h2 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
            Product Not Found
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--charcoal-muted)' }}>
            We couldn&apos;t find this product.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--green)' }}
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const typeBadge = {
    otc: { label: 'OTC — No Prescription Needed', bg: 'var(--green)', icon: '✅' },
    prescription: { label: 'Prescription Required', bg: 'var(--amber)', icon: '⚠️' },
    controlled: { label: 'Controlled Substance', bg: 'var(--red)', icon: '🚫' },
  }[product.type];

  const whatsappText = encodeURIComponent(
    `Hi MediViet! I need:\n\n💊 ${product.nameEn} (${product.nameBrand})\n🇻🇳 ${product.nameVi}\n💰 ${formatPrice(product.price)}\n\nPlease confirm availability and delivery.`
  );

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--cloud)' }}>
      {/* Back Navigation */}
      <div
        className="sticky top-0 z-40 glass border-b"
        style={{ borderColor: 'rgba(45, 159, 131, 0.12)' }}
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/products" className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: 'var(--cloud)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="font-display text-sm font-bold truncate" style={{ color: 'var(--charcoal)' }}>
            {product.nameEn}
          </h1>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4">
        {/* Product Image */}
        <div
          className={`mt-4 rounded-2xl overflow-hidden relative h-52 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(135deg, var(--green-light) 0%, var(--mint-light) 100%)',
          }}
        >
          <img
            src={product.image}
            alt={product.nameEn}
            className="w-full h-full object-cover opacity-80 mix-blend-multiply"
          />
          {/* Type badge */}
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold text-white flex items-center gap-1.5"
            style={{ background: typeBadge.bg }}
          >
            <span>{typeBadge.icon}</span>
            {product.type === 'otc' ? 'OTC' : 'Rx'}
          </span>
        </div>

        {/* Names */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}>
                {product.nameEn}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--charcoal-muted)' }}>
                {product.nameVi}
              </p>
            </div>
            <p className="font-display text-xl font-bold" style={{ color: 'var(--green-dark)' }}>
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Brand + Generic */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}
            >
              Brand: {product.nameBrand}
            </span>
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{ background: 'var(--cloud-dark)', color: 'var(--charcoal-light)' }}
            >
              Generic: {product.generic}
            </span>
          </div>

          {/* Type Info */}
          <div
            className="mt-3 flex items-center gap-2 p-3 rounded-xl"
            style={{
              background: product.type === 'otc' ? 'var(--green-light)' : product.type === 'prescription' ? 'var(--amber-light)' : 'var(--red-light)',
              borderLeft: `3px solid ${typeBadge.bg}`,
            }}
          >
            <span className="text-lg">{typeBadge.icon}</span>
            <p className="text-xs font-medium" style={{ color: 'var(--charcoal)' }}>
              {typeBadge.label}
            </p>
          </div>
        </section>

        {/* Uses */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <h3 className="font-display text-sm font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
            Used For
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {product.uses.map((use) => (
              <span
                key={use}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: 'white', color: 'var(--charcoal-light)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              >
                {use}
              </span>
            ))}
          </div>
        </section>

        {/* Dosage */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <h3 className="font-display text-sm font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
            Dosage
          </h3>
          <div className="bg-white rounded-xl p-4 shadow-soft space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-sm">🇬🇧</span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--charcoal)' }}>
                {product.dosage}
              </p>
            </div>
            <div className="border-t pt-2" style={{ borderColor: 'var(--cloud-dark)' }}>
              <div className="flex items-start gap-2">
                <span className="text-sm">🇻🇳</span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--charcoal-muted)' }}>
                  {product.dosageVi}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Warnings */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <h3 className="font-display text-sm font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
            ⚠️ Warnings
          </h3>
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: 'var(--amber-light)', border: '1px solid rgba(232, 168, 56, 0.2)' }}
          >
            {product.warnings.map((warning, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-xs mt-0.5" style={{ color: 'var(--amber-dark)' }}>•</span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--charcoal)' }}>
                  {warning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Side Effects */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <h3 className="font-display text-sm font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
            Possible Side Effects
          </h3>
          <div className="bg-white rounded-xl p-4 shadow-soft">
            {product.sideEffects.map((effect, i) => (
              <div key={i} className="flex items-start gap-2 mb-1 last:mb-0">
                <span className="text-xs mt-0.5" style={{ color: 'var(--charcoal-muted)' }}>•</span>
                <p className="text-xs" style={{ color: 'var(--charcoal-light)' }}>
                  {effect}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA — Order */}
        <section className={`mt-6 mb-4 ${mounted ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <div className="flex gap-2.5">
            <a
              href={`https://wa.me/+84905456789?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: '#25D366' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </a>
            <a
              href="https://zalo.me/0905456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: '#0068FF' }}
            >
              Zalo
            </a>
          </div>

          {/* Disclaimer */}
          <div
            className="mt-4 p-3 rounded-xl text-center"
            style={{ background: 'var(--amber-light)', border: '1px solid rgba(232, 168, 56, 0.15)' }}
          >
            <p className="text-[10px] leading-relaxed" style={{ color: 'var(--charcoal-muted)' }}>
              ℹ️ This is for informational purposes only. Always consult a licensed pharmacist before purchasing medication. GUDBRO does not sell or dispense medication.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
