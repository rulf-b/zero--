'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';

// Rate limiting helper functions
const RATE_LIMIT_KEY = 'contact_form_submissions';
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds

const checkRateLimit = (): { allowed: boolean; remainingTime?: number } => {
  if (typeof window === 'undefined') return { allowed: true };
  
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  
  if (!stored) {
    return { allowed: true };
  }
  
  const submissions = JSON.parse(stored);
  const validSubmissions = submissions.filter((time: number) => now - time < TIME_WINDOW);
  
  if (validSubmissions.length >= MAX_SUBMISSIONS) {
    const oldestSubmission = Math.min(...validSubmissions);
    const remainingTime = TIME_WINDOW - (now - oldestSubmission);
    return { allowed: false, remainingTime };
  }
  
  return { allowed: true };
};

const recordSubmission = () => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  
  let submissions = stored ? JSON.parse(stored) : [];
  submissions = submissions.filter((time: number) => now - time < TIME_WINDOW);
  submissions.push(now);
  
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(submissions));
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limit kontrolü
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setIsRateLimited(true);
      setRemainingTime(rateLimitCheck.remainingTime || 0);
      return;
    }
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        recordSubmission();
        setIsSubmitted(true);
      } else {
        alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Mesajınız Başarıyla Gönderildi!
        </h3>
        <p className="text-gray-600 mb-6">
          Bizimle iletişime geçtiğiniz için teşekkürler. Mesai saatleri içinde 2 saat içinde size dönüş yapacağız.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Yeni Bir Mesaj Gönder
        </Button>
      </Card>
    );
  }

  if (isRateLimited) {
    const minutes = Math.ceil(remainingTime / (60 * 1000));
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Çok Fazla Mesaj Gönderdiniz
        </h3>
        <p className="text-gray-600 mb-6">
          Spam koruma nedeniyle 10 dakika içinde sadece 3 mesaj gönderebilirsiniz. 
          {minutes > 0 && ` ${minutes} dakika sonra tekrar deneyebilirsiniz.`}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Acil durumlarda bizi doğrudan telefonla arayabilirsiniz.
        </p>
        <Button 
          onClick={() => setIsRateLimited(false)}
          variant="outline"
          className="border-orange-600 text-orange-600 hover:bg-orange-50"
        >
          Geri Dön
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Ad Soyad *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adınızı ve soyadınızı girin"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefon Numarası *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+90 5XX XXX XX XX"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresi *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Konu *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Konu Seçin</option>
            <option value="quote">Teklif Talebi</option>
            <option value="repair">TV Tamir Sorgusu</option>
            <option value="warranty">Garanti Hakkında</option>
            <option value="complaint">Şikayet</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mesaj *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Lütfen TV arızanızı veya talebinizi detaylı şekilde yazınız..."
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4"
        >
          Mesajı Gönder
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;