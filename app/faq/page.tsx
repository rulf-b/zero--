"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<{question: string, answer: string}[]>([]);
  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(data => setFaqs(data));
  }, []);

  return (
    <section className="pt-40 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Sıkça Sorulan Sorular</h1>
        <div className="space-y-6 mb-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{faq.question}</h2>
              <p className="text-gray-700 text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 