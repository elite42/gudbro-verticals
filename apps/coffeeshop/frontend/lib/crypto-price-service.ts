/**
 * Crypto Price Service
 *
 * Handles cryptocurrency price fetching and conversion for crypto payments.
 *
 * KEY CONCEPT:
 * - Fetches real-time crypto prices from CoinGecko (free, no API key)
 * - Converts fiat amounts to cryptocurrency amounts
 * - Supports mBTC display format to avoid long decimals
 * - 60-second cache for price volatility
 */

// ============================================================================
// Types
// ============================================================================

export interface CryptoPrices {
  prices: Record<string, number>; // symbol -> price in EUR
  lastUpdated: number;
}

export interface CryptoInfo {
  symbol: string;
  name: string;
  network: string;
  coingeckoId: string;
  decimals: number;
  color: string;
}

export type PriceDisplayUnit = 'standard' | 'milli' | 'micro';

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'gudbro-crypto-prices';
const CACHE_DURATION = 60 * 1000; // 60 seconds for crypto (volatile)
const PRICE_BUFFER_PERCENT = 0.5; // 0.5% buffer for price volatility

// Supported cryptocurrencies with CoinGecko IDs
export const SUPPORTED_CRYPTOS: Record<string, CryptoInfo> = {
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'bitcoin',
    coingeckoId: 'bitcoin',
    decimals: 8,
    color: '#F7931A',
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'ethereum',
    coingeckoId: 'ethereum',
    decimals: 18,
    color: '#627EEA',
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    network: 'ethereum',
    coingeckoId: 'usd-coin',
    decimals: 6,
    color: '#2775CA',
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether',
    network: 'ethereum',
    coingeckoId: 'tether',
    decimals: 6,
    color: '#26A17B',
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    network: 'solana',
    coingeckoId: 'solana',
    decimals: 9,
    color: '#9945FF',
  },
  TON: {
    symbol: 'TON',
    name: 'Toncoin',
    network: 'ton',
    coingeckoId: 'the-open-network',
    decimals: 9,
    color: '#0088CC',
  },
  BNB: {
    symbol: 'BNB',
    name: 'BNB',
    network: 'bsc',
    coingeckoId: 'binancecoin',
    decimals: 18,
    color: '#F3BA2F',
  },
};

// Fallback prices in EUR (approximate, for offline mode)
const FALLBACK_PRICES: CryptoPrices = {
  prices: {
    BTC: 85000,
    ETH: 3200,
    USDC: 0.92,
    USDT: 0.92,
    SOL: 180,
    TON: 5.5,
    BNB: 620,
  },
  lastUpdated: 0,
};

// ============================================================================
// Cache Functions
// ============================================================================

function getCachedPrices(): CryptoPrices | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const prices: CryptoPrices = JSON.parse(stored);

    // Check if cache is still valid (60 seconds)
    const now = Date.now();
    if (now - prices.lastUpdated > CACHE_DURATION) {
      return null;
    }

    return prices;
  } catch (error) {
    console.error('[CryptoPrice] Failed to load cached prices:', error);
    return null;
  }
}

function cachePrices(prices: CryptoPrices): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
  } catch (error) {
    console.error('[CryptoPrice] Failed to cache prices:', error);
  }
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch prices from CoinGecko API
 * Free tier: 10-30 calls/minute, no API key needed
 */
async function fetchFromCoinGecko(): Promise<CryptoPrices | null> {
  try {
    const ids = Object.values(SUPPORTED_CRYPTOS)
      .map((c) => c.coingeckoId)
      .join(',');

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn('[CryptoPrice] CoinGecko API error:', response.status);
      return null;
    }

    const data = await response.json();

    // Map CoinGecko IDs back to symbols
    const prices: Record<string, number> = {};
    for (const [symbol, info] of Object.entries(SUPPORTED_CRYPTOS)) {
      const price = data[info.coingeckoId]?.eur;
      if (price) {
        prices[symbol] = price;
      }
    }

    return {
      prices,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error('[CryptoPrice] CoinGecko fetch failed:', error);
    return null;
  }
}

/**
 * Fetch prices from Supabase (cached by backend)
 */
async function fetchFromSupabase(): Promise<CryptoPrices | null> {
  try {
    const { supabase, isSupabaseConfigured } = await import('./supabase');

    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    const { data, error } = await supabase
      .from('crypto_prices')
      .select('symbol, price_eur, fetched_at')
      .order('fetched_at', { ascending: false })
      .limit(Object.keys(SUPPORTED_CRYPTOS).length);

    if (error || !data || data.length === 0) {
      return null;
    }

    const prices: Record<string, number> = {};
    for (const row of data) {
      prices[row.symbol] = row.price_eur;
    }

    return {
      prices,
      lastUpdated: new Date(data[0].fetched_at).getTime(),
    };
  } catch (error) {
    console.error('[CryptoPrice] Supabase fetch failed:', error);
    return null;
  }
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Get current crypto prices (from cache or API)
 */
export async function getCryptoPrices(): Promise<CryptoPrices> {
  // Try cache first
  const cached = getCachedPrices();
  if (cached) {
    return cached;
  }

  // Try CoinGecko
  const coingeckoPrices = await fetchFromCoinGecko();
  if (coingeckoPrices) {
    cachePrices(coingeckoPrices);
    return coingeckoPrices;
  }

  // Try Supabase as backup
  const supabasePrices = await fetchFromSupabase();
  if (supabasePrices) {
    cachePrices(supabasePrices);
    return supabasePrices;
  }

  // Fallback to hardcoded prices
  console.warn('[CryptoPrice] Using fallback prices');
  return {
    ...FALLBACK_PRICES,
    lastUpdated: Date.now(),
  };
}

/**
 * Convert fiat amount to cryptocurrency
 *
 * @param fiatAmount - Amount in fiat currency (EUR)
 * @param cryptoSymbol - Cryptocurrency symbol (BTC, ETH, etc.)
 * @param prices - Optional pre-fetched prices
 * @param bufferPercent - Price buffer for volatility (default 0.5%)
 */
export function convertFiatToCrypto(
  fiatAmount: number,
  cryptoSymbol: string,
  prices?: CryptoPrices,
  bufferPercent: number = PRICE_BUFFER_PERCENT
): number {
  const priceData = prices || getCachedPrices() || FALLBACK_PRICES;
  const cryptoPrice = priceData.prices[cryptoSymbol];

  if (!cryptoPrice) {
    console.warn(`[CryptoPrice] No price found for ${cryptoSymbol}`);
    return 0;
  }

  // Add buffer for price volatility (customer pays slightly more to ensure payment covers)
  const adjustedPrice = cryptoPrice * (1 - bufferPercent / 100);

  return fiatAmount / adjustedPrice;
}

/**
 * Format crypto amount for display
 *
 * @param amount - Crypto amount
 * @param symbol - Cryptocurrency symbol
 * @param displayUnit - 'standard', 'milli', or 'micro'
 */
export function formatCryptoAmount(
  amount: number,
  symbol: string,
  displayUnit: PriceDisplayUnit = 'standard'
): string {
  const crypto = SUPPORTED_CRYPTOS[symbol];
  if (!crypto) {
    return `${amount.toFixed(8)} ${symbol}`;
  }

  // Apply unit multiplier
  let displayAmount = amount;
  let unitPrefix = '';

  if (displayUnit === 'milli' && (symbol === 'BTC' || symbol === 'ETH')) {
    displayAmount = amount * 1000;
    unitPrefix = 'm'; // mBTC, mETH
  } else if (displayUnit === 'micro' && symbol === 'BTC') {
    displayAmount = amount * 1000000;
    unitPrefix = 'μ'; // μBTC (sats)
  }

  // Determine decimal places based on amount size
  let decimals: number;
  if (displayAmount >= 1000) {
    decimals = 0;
  } else if (displayAmount >= 100) {
    decimals = 1;
  } else if (displayAmount >= 10) {
    decimals = 2;
  } else if (displayAmount >= 1) {
    decimals = 3;
  } else if (displayAmount >= 0.01) {
    decimals = 4;
  } else {
    decimals = 6;
  }

  // For stablecoins, always show 2 decimals
  if (symbol === 'USDC' || symbol === 'USDT') {
    decimals = 2;
  }

  return `${displayAmount.toFixed(decimals)} ${unitPrefix}${symbol}`;
}

/**
 * Format price showing both fiat and crypto
 * Example: "€12.00 (~0.45 mBTC)"
 */
export function formatDualPrice(
  fiatAmount: number,
  fiatCurrency: string,
  cryptoSymbol: string,
  prices?: CryptoPrices,
  displayUnit: PriceDisplayUnit = 'milli'
): string {
  const cryptoAmount = convertFiatToCrypto(fiatAmount, cryptoSymbol, prices);
  const cryptoFormatted = formatCryptoAmount(cryptoAmount, cryptoSymbol, displayUnit);

  const fiatFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fiatCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(fiatAmount);

  return `${fiatFormatted} (~${cryptoFormatted})`;
}

/**
 * Get crypto info by symbol
 */
export function getCryptoInfo(symbol: string): CryptoInfo | undefined {
  return SUPPORTED_CRYPTOS[symbol];
}

/**
 * Get all supported cryptocurrency symbols
 */
export function getSupportedSymbols(): string[] {
  return Object.keys(SUPPORTED_CRYPTOS);
}

/**
 * Manually refresh crypto prices
 */
export async function refreshCryptoPrices(): Promise<CryptoPrices> {
  // Clear cache to force refresh
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }

  const prices = await getCryptoPrices();

  // Dispatch event for UI updates
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('crypto-prices-updated'));
  }

  return prices;
}

/**
 * Get last update timestamp
 */
export function getLastUpdateTime(): Date | null {
  const cached = getCachedPrices();
  return cached ? new Date(cached.lastUpdated) : null;
}

/**
 * Check if prices need refresh
 */
export function needsRefresh(): boolean {
  const cached = getCachedPrices();
  if (!cached) return true;

  const now = Date.now();
  return now - cached.lastUpdated > CACHE_DURATION;
}

/**
 * Get price age in seconds
 */
export function getPriceAge(): number | null {
  const cached = getCachedPrices();
  if (!cached) return null;

  return Math.round((Date.now() - cached.lastUpdated) / 1000);
}

// ============================================================================
// Block Explorer URLs
// ============================================================================

const EXPLORER_URLS: Record<string, { name: string; txUrl: string; addressUrl: string }> = {
  bitcoin: {
    name: 'Mempool',
    txUrl: 'https://mempool.space/tx/{hash}',
    addressUrl: 'https://mempool.space/address/{address}',
  },
  ethereum: {
    name: 'Etherscan',
    txUrl: 'https://etherscan.io/tx/{hash}',
    addressUrl: 'https://etherscan.io/address/{address}',
  },
  solana: {
    name: 'Solscan',
    txUrl: 'https://solscan.io/tx/{hash}',
    addressUrl: 'https://solscan.io/address/{address}',
  },
  ton: {
    name: 'Tonscan',
    txUrl: 'https://tonscan.org/tx/{hash}',
    addressUrl: 'https://tonscan.org/address/{address}',
  },
  bsc: {
    name: 'BscScan',
    txUrl: 'https://bscscan.com/tx/{hash}',
    addressUrl: 'https://bscscan.com/address/{address}',
  },
  polygon: {
    name: 'PolygonScan',
    txUrl: 'https://polygonscan.com/tx/{hash}',
    addressUrl: 'https://polygonscan.com/address/{address}',
  },
};

/**
 * Get block explorer URL for a transaction
 */
export function getExplorerTxUrl(network: string, txHash: string): string | null {
  const explorer = EXPLORER_URLS[network];
  if (!explorer) return null;
  return explorer.txUrl.replace('{hash}', txHash);
}

/**
 * Get block explorer URL for an address
 */
export function getExplorerAddressUrl(network: string, address: string): string | null {
  const explorer = EXPLORER_URLS[network];
  if (!explorer) return null;
  return explorer.addressUrl.replace('{address}', address);
}

/**
 * Get explorer name for a network
 */
export function getExplorerName(network: string): string | null {
  return EXPLORER_URLS[network]?.name || null;
}
