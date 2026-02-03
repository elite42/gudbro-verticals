// ============================================================================
// Payment Settings Types
// ============================================================================

export interface CryptoWallet {
  address: string;
  enabled: boolean;
  network?: string;
}

export interface CryptoWallets {
  [symbol: string]: CryptoWallet;
}

export interface PaymentSettings {
  merchantId: string;
  // Fiat
  stripeEnabled: boolean;
  stripeAccountId: string;
  paypalEnabled: boolean;
  paypalClientId: string;
  applePayEnabled: boolean;
  googlePayEnabled: boolean;
  samsungPayEnabled: boolean;
  // Crypto
  cryptoEnabled: boolean;
  cryptoWallets: CryptoWallets;
  cryptoShowPricesInMenu: boolean;
  cryptoPriceDisplayUnit: 'standard' | 'milli' | 'micro';
  cryptoPaymentTimeoutMinutes: number;
  // Tax
  taxEnabled: boolean;
  taxPercentage: number;
  taxDisplayMode: 'inclusive' | 'exclusive';
  taxLabel: string;
  // Tips
  tipsEnabled: boolean;
  tipPresets: number[];
  tipAllowCustom: boolean;
  tipCalculationBase: 'pre_tax' | 'post_tax';
  // Service Charge
  serviceChargeEnabled: boolean;
  serviceChargePercentage: number;
  serviceChargeLabel: string;
  serviceChargeCalculationBase: 'pre_tax' | 'post_tax';
}

export interface SupportedCrypto {
  symbol: string;
  name: string;
  network: string;
  color: string;
  address_regex: string;
  address_example: string;
  explorer_name: string;
  explorer_address_url_template: string;
}

export type ActiveTab = 'fiat' | 'crypto' | 'taxTips';
