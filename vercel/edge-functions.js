// shared edge function helpers for Vercel setup

import { jwtVerify } from 'jose';

export async function verifyJWTFromRequest(req) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const match = cookie.match(/token=([^;]+)/);
    if (!match) return null;
    const token = match[1];
    const secret = (process.env.JWT_SECRET || 'dev_secret').padEnd(32, '0').slice(0, 32);
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
  } catch (err) {
    console.log('JWT verification failed:', err);
    return null;
  }
}