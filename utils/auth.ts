import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/** True when the request carries a valid admin session cookie. */
export function isAdminRequest(request: NextRequest): boolean {
  const token = request.cookies.get('token')?.value;
  return !!token && !!verifyToken(token);
}

/** Returns a 401 response for non-admin requests, or null when the caller is an admin. */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (isAdminRequest(request)) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

/** `?admin=true` listing requested by a signed-in admin (includes drafts / inactive items). */
export function wantsAdminView(request: NextRequest): boolean {
  return request.nextUrl.searchParams.get('admin') === 'true' && isAdminRequest(request);
}
