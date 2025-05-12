import { encode as encodeBase64 } from 'https://deno.land/std@0.181.0/encoding/base64.ts';

export const config = { runtime: 'edge' };
export default async function handler(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password || password.length < 6)
      return new Response('Invalid input', { status: 400 });
    const dbKey = `user:${email}`;
    const existing = await fetch(`${process.env.KV_URL}/${dbKey}`);
    if (existing.status === 200)
      return new Response('User already exists', { status: 409 });

    // Hash password with SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log('Registering user:', email, 'with hash:', hashHex);

    await fetch(`${process.env.KV_URL}/${dbKey}`,
      {
        method: 'PUT',
        body: JSON.stringify({ email, password: hashHex })
      }
    );
    return new Response('Registered successfully', { status: 200 });
  } catch (err) {
    console.log('Register error:', err);
    return new Response('Server error', { status: 500 });
  }
}