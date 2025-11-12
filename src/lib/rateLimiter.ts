import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

// Create a rate limiter that allows 5 requests per 10 minutes
export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "login_limit",
});

export const registerLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  prefix: "register_limit",
});

export const logoutLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  prefix: "logout_limit",
});
