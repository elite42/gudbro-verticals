import { SignJWT, jwtVerify } from 'jose';
import { addHours } from 'date-fns';

/**
 * Guest JWT Token Payload
 * Embedded in the token after successful booking verification
 */
export interface GuestTokenPayload {
  bookingId: string;
  propertyId: string;
  checkoutDate: string;
  accessTier?: 'browse' | 'full'; // undefined treated as 'full' for backward compat
  roomCode?: string;
}

function getSecret(): Uint8Array {
  const secret = process.env.GUEST_JWT_SECRET;
  if (!secret) {
    throw new Error('GUEST_JWT_SECRET is not set. Add it to .env.local');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Sign a guest JWT token after successful booking verification
 *
 * Token expires at checkout date + 24 hours to give guests
 * buffer time on their last day.
 *
 * @param payload - Guest booking identifiers
 * @returns Signed JWT string
 */
export async function signGuestToken(payload: {
  bookingId: string | null; // null for no-booking room sessions
  propertyId: string;
  checkoutDate: string;
  accessTier?: 'browse' | 'full';
  roomCode?: string;
}): Promise<string> {
  const checkoutDate = new Date(payload.checkoutDate);
  const expiresAt = addHours(checkoutDate, 24);

  return new SignJWT({
    bookingId: payload.bookingId,
    propertyId: payload.propertyId,
    checkoutDate: payload.checkoutDate,
    ...(payload.accessTier && { accessTier: payload.accessTier }),
    ...(payload.roomCode && { roomCode: payload.roomCode }),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSecret());
}

/**
 * Verify a guest JWT token and return its payload
 *
 * @param token - JWT string from Authorization header
 * @returns Decoded payload with bookingId, propertyId, checkoutDate
 * @throws On invalid or expired token
 */
export async function verifyGuestToken(token: string): Promise<GuestTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return {
    bookingId: payload.bookingId as string,
    propertyId: payload.propertyId as string,
    checkoutDate: payload.checkoutDate as string,
    accessTier: (payload.accessTier as 'browse' | 'full') || 'full',
    roomCode: (payload.roomCode as string) || undefined,
  };
}
