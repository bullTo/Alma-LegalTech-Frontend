import { NextResponse } from 'next/server';

// Mock login API
export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === 'admin') {
    return NextResponse.json({ message: 'Login successful', isAuthenticated: true });
  } else {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
}
