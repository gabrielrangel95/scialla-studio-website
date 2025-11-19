import { RateLimiterMemory } from "rate-limiter-flexible";

// In-memory rate limiter (no Redis required)
// Limits: 5 submissions per hour per IP address
const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of requests
  duration: 60 * 60, // Per 1 hour
  blockDuration: 60 * 60, // Block for 1 hour if exceeded
});

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remainingPoints?: number;
  msBeforeNext?: number;
}> {
  try {
    const result = await rateLimiter.consume(ip);
    return {
      allowed: true,
      remainingPoints: result.remainingPoints,
      msBeforeNext: result.msBeforeNext,
    };
  } catch (error) {
    // Rate limit exceeded
    if (error instanceof Error && "msBeforeNext" in error) {
      const rateLimitError = error as {
        msBeforeNext: number;
      };
      return {
        allowed: false,
        msBeforeNext: rateLimitError.msBeforeNext,
      };
    }
    // Unknown error - allow request but log it
    console.error("Rate limiter error:", error);
    return { allowed: true };
  }
}
