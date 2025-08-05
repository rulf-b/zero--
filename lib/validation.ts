import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı gereklidir').max(50, 'Kullanıcı adı çok uzun'),
  password: z.string().min(1, 'Şifre gereklidir').max(100, 'Şifre çok uzun')
});

export const userUpdateSchema = z.object({
  username: z.string().min(1, 'Kullanıcı adı gereklidir').max(50, 'Kullanıcı adı çok uzun'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır').max(100, 'Şifre çok uzun').optional()
});

// Message schemas
export const messageSchema = z.object({
  name: z.string().min(1, 'İsim gereklidir').max(100, 'İsim çok uzun'),
  email: z.string().email('Geçerli bir email adresi giriniz').max(100, 'Email çok uzun'),
  phone: z.string().max(20, 'Telefon numarası çok uzun').optional(),
  message: z.string().min(1, 'Mesaj gereklidir').max(1000, 'Mesaj çok uzun')
});

// Quote schema
export const quoteSchema = z.object({
  name: z.string().min(1, 'İsim gereklidir').max(100, 'İsim çok uzun'),
  email: z.string().email('Geçerli bir email adresi giriniz').max(100, 'Email çok uzun'),
  phone: z.string().max(20, 'Telefon numarası çok uzun').optional(),
  brand: z.string().min(1, 'Marka gereklidir').max(50, 'Marka adı çok uzun'),
  model: z.string().max(100, 'Model adı çok uzun').optional(),
  problem: z.string().min(1, 'Problem açıklaması gereklidir').max(1000, 'Problem açıklaması çok uzun')
});

// File upload schema
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Dosya boyutu 5MB\'dan büyük olamaz' };
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Sadece resim dosyaları yüklenebilir (JPEG, PNG, WebP, GIF)' };
  }
  
  return { valid: true };
}

// Generic ID validation
export const idSchema = z.object({
  id: z.string().min(1, 'ID gereklidir')
});

// Safe JSON parsing
export function safeJsonParse(text: string): { success: boolean; data?: any; error?: string } {
  try {
    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Geçersiz JSON formatı' };
  }
}
