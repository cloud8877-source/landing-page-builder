import { NextRequest, NextResponse } from 'next/server';

// Rate limiter modified for Cloud Functions compatibility
// In serverless environments, we use a simplified approach since each instance is stateless
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Use a simple in-memory store that will be per-instance
// In production, this should be replaced with Redis or Firestore-based rate limiting
const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Custom error message
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
}

export const RATE_LIMIT_CONFIGS = {
  // API endpoints
  AI_GENERATE: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute
    message: 'Too many AI generation requests. Please try again later.',
  },
  CONTACT_FORM: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 5, // 5 contact submissions per 5 minutes
    message: 'Too many contact form submissions. Please wait before submitting again.',
  },
  FILE_UPLOAD: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20, // 20 file uploads per minute
    message: 'Too many file upload attempts. Please try again later.',
  },
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 auth requests per 15 minutes
    message: 'Too many authentication attempts. Please try again later.',
  },
  GENERAL: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
    message: 'Rate limit exceeded. Please try again later.',
  },
};

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  // Try various headers for the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  if (clientIP) {
    return clientIP.trim();
  }

  // Fallback to request IP or unknown
  return request.ip || 'unknown';
}

/**
 * Check if the request is within rate limits
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;

  // Get or create rate limit record
  let record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Create new record or expired record
    record = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, record);

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: record.resetTime,
    };
  }

  // Check if within limits
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // Increment counter
  record.count++;
  rateLimitStore.set(key, record);

  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Rate limiting middleware for API routes
 */
export function rateLimit(config: RateLimitConfig) {
  return (request: NextRequest): NextResponse | null => {
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const identifier = `${ip}:${userAgent.substring(0, 50)}`; // Include partial user agent for uniqueness

    const result = checkRateLimit(identifier, config);

    if (!result.allowed) {
      return NextResponse.json(
        {
          error: config.message || 'Rate limit exceeded',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    return null; // Continue with the request
  };
}

/**
 * Clean up expired rate limit records
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  const keysToDelete: string[] = [];

  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(key => rateLimitStore.delete(key));
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Rate limiting middleware for specific API types
 */
export const withRateLimit = {
  aiGenerate: rateLimit(RATE_LIMIT_CONFIGS.AI_GENERATE),
  contactForm: rateLimit(RATE_LIMIT_CONFIGS.CONTACT_FORM),
  fileUpload: rateLimit(RATE_LIMIT_CONFIGS.FILE_UPLOAD),
  auth: rateLimit(RATE_LIMIT_CONFIGS.AUTH),
  general: rateLimit(RATE_LIMIT_CONFIGS.GENERAL),
};

/**
 * Apply rate limiting to API route handler
 */
export function withRateLimitMiddleware(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const rateLimitResult = rateLimit(config)(request);

    if (rateLimitResult) {
      return rateLimitResult;
    }

    try {
      const response = await handler(request);

      // Add rate limit headers to the response
      const ip = getClientIP(request);
      const userAgent = request.headers.get('user-agent') || 'unknown';
      const identifier = `${ip}:${userAgent.substring(0, 50)}`;

      const rateLimitCheck = checkRateLimit(identifier, config);
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitCheck.remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(rateLimitCheck.resetTime).toISOString());

      return response;

    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}