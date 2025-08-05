import fs from 'fs';
import path from 'path';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'security';
  message: string;
  ip?: string;
  userAgent?: string;
  userId?: string;
  endpoint?: string;
  method?: string;
}

const LOG_DIR = path.join(process.cwd(), 'logs');
const SECURITY_LOG_FILE = path.join(LOG_DIR, 'security.log');
const APP_LOG_FILE = path.join(LOG_DIR, 'app.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function writeLog(filePath: string, entry: LogEntry) {
  const logLine = JSON.stringify(entry) + '\n';
  fs.appendFileSync(filePath, logLine);
}

export function logSecurity(message: string, req?: any, userId?: string) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: 'security',
    message,
    ip: req?.headers?.get?.('x-forwarded-for') || req?.headers?.get?.('x-real-ip') || 'unknown',
    userAgent: req?.headers?.get?.('user-agent') || 'unknown',
    userId,
    endpoint: req?.url || 'unknown',
    method: req?.method || 'unknown'
  };
  
  writeLog(SECURITY_LOG_FILE, entry);
}

export function logInfo(message: string, req?: any) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: 'info',
    message,
    ip: req?.headers?.get?.('x-forwarded-for') || req?.headers?.get?.('x-real-ip'),
    endpoint: req?.url,
    method: req?.method
  };
  
  writeLog(APP_LOG_FILE, entry);
}

export function logError(message: string, error?: any, req?: any) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: 'error',
    message: `${message} - ${error?.message || error || ''}`,
    ip: req?.headers?.get?.('x-forwarded-for') || req?.headers?.get?.('x-real-ip'),
    endpoint: req?.url,
    method: req?.method
  };
  
  writeLog(APP_LOG_FILE, entry);
}
