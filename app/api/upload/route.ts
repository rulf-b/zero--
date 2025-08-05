import { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import { validateFileUpload } from '@/lib/validation';

export const runtime = 'nodejs';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'Dosya bulunamadı.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file
    const validation = validateFileUpload(file);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Sanitize filename and add timestamp
    const ext = path.extname(file.name).toLowerCase();
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, '');
    const fileName = `${Date.now()}-${baseName.substring(0, 20)}${ext}`;
    const filePath = path.join(uploadDir, fileName);
    
    fs.writeFileSync(filePath, buffer);

    // Public URL
    const url = `/uploads/${fileName}`;
    return new Response(JSON.stringify({ url }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Dosya yükleme sırasında hata oluştu.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 