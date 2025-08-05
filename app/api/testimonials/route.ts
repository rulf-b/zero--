import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'testimonials.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const testimonials = JSON.parse(fileContents);
    
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json({ error: 'Failed to load testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'testimonials.json');
    
    let testimonials = [];
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      testimonials = JSON.parse(fileContents);
    }
    
    // Yeni testimonial ekle
    const newTestimonial = {
      id: (testimonials.length + 1).toString(),
      ...body,
      date: new Date().toISOString().split('T')[0],
      verified: false // Yeni yorumlar varsayılan olarak doğrulanmamış
    };
    
    testimonials.push(newTestimonial);
    
    fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
    
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'testimonials.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'No testimonials found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let testimonials = JSON.parse(fileContents);
    
    // Testimonial'ı güncelle
    const index = testimonials.findIndex((t: any) => t.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    testimonials[index] = { ...testimonials[index], ...body };
    
    fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
    
    return NextResponse.json(testimonials[index], { status: 200 });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    const dataDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDirectory, 'testimonials.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'No testimonials found' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    let testimonials = JSON.parse(fileContents);
    
    // Testimonial'ı sil
    const index = testimonials.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    const deletedTestimonial = testimonials.splice(index, 1)[0];
    
    fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
    
    return NextResponse.json({ message: 'Testimonial deleted successfully', deletedTestimonial }, { status: 200 });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}