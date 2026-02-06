import { supabase } from '@/lib/supabase';
import {
  withErrorHandling,
  successResponse,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface CryptoWallet {
  address: string;
  enabled: boolean;
  network?: string;
  label?: string;
}

interface CryptoWallets {
  [symbol: string]: CryptoWallet;
}

interface PaymentSettingsRequest {
  merchantId: string;

  // Fiat settings
  stripeEnabled?: boolean;
  stripeAccountId?: string;
  stripePublicKey?: string;
  paypalEnabled?: boolean;
  paypalClientId?: string;
  paypalMode?: 'sandbox' | 'live';
  applePayEnabled?: boolean;
  googlePayEnabled?: boolean;
  samsungPayEnabled?: boolean;

  // Local payments (Vietnam)
  vietqrEnabled?: boolean;
  vietqrBankCode?: string;
  vietqrAccountNumber?: string;
  vietqrAccountName?: string;
  momoEnabled?: boolean;
  momoPhone?: string;
  zalopayEnabled?: boolean;
  zalopayAppId?: string;

  // Crypto settings
  cryptoEnabled?: boolean;
  cryptoWallets?: CryptoWallets;
  cryptoShowPricesInMenu?: boolean;
  cryptoPriceDisplayUnit?: 'standard' | 'milli' | 'micro';
  cryptoPaymentTimeoutMinutes?: number;
  cryptoPriceBufferPercent?: number;

  // Tax settings
  taxEnabled?: boolean;
  taxPercentage?: number;
  taxDisplayMode?: 'inclusive' | 'exclusive';
  taxLabel?: string;

  // Tip settings
  tipsEnabled?: boolean;
  tipPresets?: number[];
  tipAllowCustom?: boolean;
  tipCalculationBase?: 'pre_tax' | 'post_tax';

  // Service Charge settings
  serviceChargeEnabled?: boolean;
  serviceChargePercentage?: number;
  serviceChargeLabel?: string;
  serviceChargeCalculationBase?: 'pre_tax' | 'post_tax';
}

// ============================================================================
// GET - Fetch payment settings
// ============================================================================

export const GET = withErrorHandling<unknown>(
  async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      throw new ValidationError('merchantId is required');
    }

    // Fetch payment settings
    const { data: settings, error: settingsError } = await supabase
      .from('merchant_payment_settings')
      .select('*')
      .eq('merchant_id', merchantId)
      .single();

    // If no settings exist, return defaults
    if (settingsError && settingsError.code === 'PGRST116') {
      return successResponse({
        settings: null,
        isNew: true,
        message: 'No payment settings configured yet',
      });
    }

    if (settingsError) {
      throw new DatabaseError('Failed to fetch payment settings', { cause: settingsError });
    }

    // Fetch supported cryptocurrencies
    const { data: supportedCryptos, error: cryptoError } = await supabase
      .from('supported_cryptocurrencies')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (cryptoError) {
      throw new DatabaseError('Failed to fetch supported cryptocurrencies', {
        cause: cryptoError,
      });
    }

    return successResponse({
      settings: {
        id: settings.id,
        merchantId: settings.merchant_id,

        // Fiat
        stripeEnabled: settings.stripe_enabled,
        stripeAccountId: settings.stripe_account_id,
        stripePublicKey: settings.stripe_public_key,
        paypalEnabled: settings.paypal_enabled,
        paypalClientId: settings.paypal_client_id,
        paypalMode: settings.paypal_mode,
        applePayEnabled: settings.apple_pay_enabled,
        googlePayEnabled: settings.google_pay_enabled,
        samsungPayEnabled: settings.samsung_pay_enabled,

        // Local
        vietqrEnabled: settings.vietqr_enabled,
        vietqrBankCode: settings.vietqr_bank_code,
        vietqrAccountNumber: settings.vietqr_account_number,
        vietqrAccountName: settings.vietqr_account_name,
        momoEnabled: settings.momo_enabled,
        momoPhone: settings.momo_phone,
        zalopayEnabled: settings.zalopay_enabled,
        zalopayAppId: settings.zalopay_app_id,

        // Crypto
        cryptoEnabled: settings.crypto_enabled,
        cryptoWallets: settings.crypto_wallets || {},
        cryptoShowPricesInMenu: settings.crypto_show_prices_in_menu,
        cryptoPriceDisplayUnit: settings.crypto_price_display_unit,
        cryptoPaymentTimeoutMinutes: settings.crypto_payment_timeout_minutes,
        cryptoPriceBufferPercent: settings.crypto_price_buffer_percent,

        // Tax
        taxEnabled: settings.tax_enabled ?? false,
        taxPercentage: settings.tax_percentage ?? 0,
        taxDisplayMode: settings.tax_display_mode ?? 'inclusive',
        taxLabel: settings.tax_label ?? 'VAT',

        // Tips
        tipsEnabled: settings.tips_enabled ?? false,
        tipPresets: settings.tip_presets ?? [10, 15, 20],
        tipAllowCustom: settings.tip_allow_custom ?? true,
        tipCalculationBase: settings.tip_calculation_base ?? 'pre_tax',

        // Service Charge
        serviceChargeEnabled: settings.service_charge_enabled ?? false,
        serviceChargePercentage: settings.service_charge_percentage ?? 0,
        serviceChargeLabel: settings.service_charge_label ?? 'Service Charge',
        serviceChargeCalculationBase: settings.service_charge_calculation_base ?? 'pre_tax',

        createdAt: settings.created_at,
        updatedAt: settings.updated_at,
      },
      supportedCryptos: supportedCryptos || [],
      isNew: false,
    });
  },
  { context: 'settings-payments-get', logger: backofficeLogger }
);

// ============================================================================
// PUT - Update payment settings
// ============================================================================

export const PUT = withErrorHandling(
  async (request: Request) => {
    const body: PaymentSettingsRequest = await request.json();

    if (!body.merchantId) {
      throw new ValidationError('merchantId is required');
    }

    // Validate crypto wallet addresses if provided
    if (body.cryptoWallets) {
      const { data: supportedCryptos } = await supabase
        .from('supported_cryptocurrencies')
        .select('symbol, address_regex')
        .eq('is_active', true);

      const validationErrors: string[] = [];

      for (const [symbol, wallet] of Object.entries(body.cryptoWallets)) {
        if (wallet.address && wallet.enabled) {
          const crypto = supportedCryptos?.find((c) => c.symbol === symbol);
          if (crypto?.address_regex) {
            const regex = new RegExp(crypto.address_regex);
            if (!regex.test(wallet.address)) {
              validationErrors.push(`Invalid ${symbol} wallet address`);
            }
          }
        }
      }

      if (validationErrors.length > 0) {
        throw new ValidationError('Crypto wallet validation failed', {
          wallets: validationErrors,
        });
      }
    }

    // Prepare data for upsert
    const upsertData = {
      merchant_id: body.merchantId,

      // Fiat
      stripe_enabled: body.stripeEnabled ?? false,
      stripe_account_id: body.stripeAccountId || null,
      stripe_public_key: body.stripePublicKey || null,
      paypal_enabled: body.paypalEnabled ?? false,
      paypal_client_id: body.paypalClientId || null,
      paypal_mode: body.paypalMode || 'sandbox',
      apple_pay_enabled: body.applePayEnabled ?? false,
      google_pay_enabled: body.googlePayEnabled ?? false,
      samsung_pay_enabled: body.samsungPayEnabled ?? false,

      // Local
      vietqr_enabled: body.vietqrEnabled ?? false,
      vietqr_bank_code: body.vietqrBankCode || null,
      vietqr_account_number: body.vietqrAccountNumber || null,
      vietqr_account_name: body.vietqrAccountName || null,
      momo_enabled: body.momoEnabled ?? false,
      momo_phone: body.momoPhone || null,
      zalopay_enabled: body.zalopayEnabled ?? false,
      zalopay_app_id: body.zalopayAppId || null,

      // Crypto
      crypto_enabled: body.cryptoEnabled ?? false,
      crypto_wallets: body.cryptoWallets || {},
      crypto_show_prices_in_menu: body.cryptoShowPricesInMenu ?? false,
      crypto_price_display_unit: body.cryptoPriceDisplayUnit || 'standard',
      crypto_payment_timeout_minutes: body.cryptoPaymentTimeoutMinutes || 30,
      crypto_price_buffer_percent: body.cryptoPriceBufferPercent || 0.5,

      // Tax
      tax_enabled: body.taxEnabled ?? false,
      tax_percentage: body.taxPercentage ?? 0,
      tax_display_mode: body.taxDisplayMode || 'inclusive',
      tax_label: body.taxLabel || 'VAT',

      // Tips
      tips_enabled: body.tipsEnabled ?? false,
      tip_presets: body.tipPresets || [10, 15, 20],
      tip_allow_custom: body.tipAllowCustom ?? true,
      tip_calculation_base: body.tipCalculationBase || 'pre_tax',

      // Service Charge
      service_charge_enabled: body.serviceChargeEnabled ?? false,
      service_charge_percentage: body.serviceChargePercentage ?? 0,
      service_charge_label: body.serviceChargeLabel || 'Service Charge',
      service_charge_calculation_base: body.serviceChargeCalculationBase || 'pre_tax',

      updated_at: new Date().toISOString(),
    };

    // Upsert (insert or update)
    const { data, error } = await supabase
      .from('merchant_payment_settings')
      .upsert(upsertData, {
        onConflict: 'merchant_id',
      })
      .select()
      .single();

    if (error) {
      throw new DatabaseError('Failed to save payment settings', { cause: error });
    }

    return successResponse({
      settings: data,
      message: 'Payment settings saved successfully',
    });
  },
  { context: 'settings-payments-put', logger: backofficeLogger }
);

// ============================================================================
// POST - Create initial payment settings (alternative to PUT)
// ============================================================================

export const POST = PUT;
