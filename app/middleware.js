import { NextResponse } from 'next/server';

/**
 * Middleware function to handle CORS and other request modifications
 */
export function middleware(request) {
  const response = NextResponse.next();

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

/**
 * Configure routes that should trigger this middleware
 */
export const config = {
  matcher: [
    '/api/:path*',
  ],
};