'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-24 pt-20 text-center">
        <span className="text-5xl">🔍</span>
        <h1 className="font-display mt-4 text-xl font-bold">Product Not Found</h1>
        <Link
          href="/shop"
          className="mt-2 inline-block text-sm font-semibold"
          style={{ color: 'var(--orange)' }}
        >
          ← Back to Shop
        </Link>
      </main>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I'd like to order: ${product.name}${product.sizes ? ' (Size: ___)' : ''}. Price: ${formatVNDPrice(product.price)}`
  );

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Image */}
      <div
        className="animate-fade-in-up relative h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <Link href="/shop" className="glass absolute left-4 top-4 rounded-full p-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <span
          className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold"
          style={{ color: 'var(--charcoal-light)' }}
        >
          {product.category}
        </span>
      </div>

      <div className="mt-4 space-y-4 px-4">
        {/* Name & Price */}
        <section className="animate-fade-in-up delay-100">
          <h1 className="font-display text-xl font-extrabold">{product.name}</h1>
          <div className="mt-1 flex items-center gap-3">
            <span className="font-display text-2xl font-bold" style={{ color: 'var(--orange)' }}>
              {formatVNDPrice(product.price)}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{
                background: product.inStock ? 'var(--success-light)' : '#FEE2E2',
                color: product.inStock ? '#16A34A' : '#DC2626',
              }}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </section>

        {/* Description */}
        <section className="animate-fade-in-up delay-150">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
            {product.description}
          </p>
        </section>

        {/* Sizes */}
        {product.sizes && (
          <section className="animate-fade-in-up delay-200">
            <h2 className="mb-2 text-sm font-bold" style={{ color: 'var(--navy)' }}>
              Available Sizes
            </h2>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold"
                  style={{ borderColor: 'var(--cloud-dark)' }}
                >
                  {size}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="animate-fade-in-up delay-250 space-y-3 pb-4">
          <a
            href={`https://wa.me/84935456789?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-white ${!product.inStock ? 'pointer-events-none opacity-50' : ''}`}
            style={{ background: '#25D366' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </a>
          <a
            href={`https://zalo.me/84935456789`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-white ${!product.inStock ? 'pointer-events-none opacity-50' : ''}`}
            style={{ background: '#0068FF' }}
          >
            Order on Zalo
          </a>
          <p className="text-center text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
            Items can also be purchased in person at the gym reception.
          </p>
        </section>
      </div>
    </main>
  );
}
