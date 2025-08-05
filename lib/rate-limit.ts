import fs from 'fs';
import path from 'path';

interface RateLimitEntry {
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
}

interface RateLimitData {
  [key: string]: RateLimitEntry;
}

const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', 'rate-limits.json');
const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 15 * 60 * 1000; // 15 minutes
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

function readRateLimits(): RateLimitData {
  try {
    const data = fs.readFileSync(RATE_LIMIT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeRateLimits(data: RateLimitData) {
  const dir = path.dirname(RATE_LIMIT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data, null, 2));
}

function cleanupOldEntries(data: RateLimitData): RateLimitData {
  const now = Date.now();
  const cleaned: RateLimitData = {};
  
  for (const [key, entry] of Object.entries(data)) {
    // Keep entries that are still within block time or have recent activity
    if (entry.blockedUntil && entry.blockedUntil > now) {
      cleaned[key] = entry;
    } else if (now - entry.lastAttempt < CLEANUP_INTERVAL) {
      cleaned[key] = entry;
    }
  }
  
  return cleaned;
}

export function checkRateLimit(identifier: string): { allowed: boolean; timeUntilReset?: number } {
  const data = readRateLimits();
  const now = Date.now();
  const entry = data[identifier];
  
  if (!entry) {
    return { allowed: true };
  }
  
  // Check if still blocked
  if (entry.blockedUntil && entry.blockedUntil > now) {
    return { 
      allowed: false, 
      timeUntilReset: Math.ceil((entry.blockedUntil - now) / 1000) 
    };
  }
  
  // Check if within rate limit
  if (entry.count >= MAX_ATTEMPTS && now - entry.lastAttempt < BLOCK_TIME) {
    // Update blocked until time
    const blockedUntil = entry.lastAttempt + BLOCK_TIME;
    data[identifier] = { ...entry, blockedUntil };
    writeRateLimits(cleanupOldEntries(data));
    
    return { 
      allowed: false, 
      timeUntilReset: Math.ceil((blockedUntil - now) / 1000) 
    };
  }
  
  return { allowed: true };
}

export function recordAttempt(identifier: string, success: boolean) {
  const data = readRateLimits();
  const now = Date.now();
  
  if (success) {
    // Remove entry on successful attempt
    delete data[identifier];
  } else {
    // Increment failed attempts
    const entry = data[identifier] || { count: 0, lastAttempt: 0 };
    data[identifier] = {
      count: entry.count + 1,
      lastAttempt: now
    };
  }
  
  writeRateLimits(cleanupOldEntries(data));
}
