export const config = { runtime: 'edge' };
export default async function handler(req) {
  const { email, password } = await req.json();
  if (!email || !password) return new Response('Missing credentials', { status: 400 });
  const dbKey = `user:${email}`;
  const res = await fetch(`${process.env.KV_URL}/${dbKey}`);
  if (res.status !== 200) return new Response('User not found', { status: 404 });
  const user = await res.json();
  if (user.password !== password) return new Response('Incorrect password', { status: 401 });
  return new Response('Login successful', { status: 200 });
}