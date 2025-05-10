export const config = { runtime: 'edge' };
export default async function handler(req) {
  const { email, password } = await req.json();
  if (!email || !password || password.length < 6)
    return new Response('Invalid input', { status: 400 });
  const dbKey = `user:${email}`;
  const existing = await fetch(`${process.env.KV_URL}/${dbKey}`);
  if (existing.status === 200)
    return new Response('User already exists', { status: 409 });
  await fetch(`${process.env.KV_URL}/${dbKey}`, {
    method: 'PUT',
    body: JSON.stringify({ email, password })
  });
  return new Response('Registered successfully', { status: 200 });
}