import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
}

// ============================================================================
// GET - Fetch payment settings
// ============================================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Fetch payment settings
    const { data: settings, error: settingsError } = await supabase
      .from('merchant_payment_settings')
      .select('*')
      .eq('merchant_id', merchantId)
      .single();

    // If no settings exist, return defaults
    if (settingsError && settingsError.code === 'PGRST116') {
      return NextResponse.json({
        settings: null,
        isNew: true,
        message: 'No payment settings configured yet',
      });
    }

    if (settingsError) {
      console.error('Error fetching payment settings:', settingsError);
      return NextResponse.json({ error: settingsError.message }, { status: 500 });
    }

    // Fetch supported cryptocurrencies
    const { data: supportedCryptos, error: cryptoError } = await supabase
      .from('supported_cryptocurrencies')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (cryptoError) {
      console.error('Error fetching supported cryptos:', cryptoError);
    }

    return NextResponse.json({
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

        createdAt: settings.created_at,
        updatedAt: settings.updated_at,
      },
      supportedCryptos: supportedCryptos || [],
      isNew: false,
    });
  } catch (error) {
    console.error('Error in GET /api/settings/payments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Update payment settings
// ============================================================================

export async function PUT(request: Request) {
  try {
    const body: PaymentSettingsRequest = await request.json();

    if (!body.merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
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
        return NextResponse.json(
          { error: 'Validation failed', details: validationErrors },
          { status: 400 }
        );
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
      console.error('Error saving payment settings:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      settings: data,
      message: 'Payment settings saved successfully',
    });
  } catch (error) {
    console.error('Error in PUT /api/settings/payments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// POST - Create initial payment settings (alternative to PUT)
// ============================================================================

export async function POST(request: Request) {
  // Delegate to PUT for upsert behavior
  return PUT(request);
}
