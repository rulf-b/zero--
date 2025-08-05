"use client";
import React, { useState, useEffect } from "react";

export default function Admin2UserPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin2UserLoading, setAdmin2UserLoading] = useState(false);
  const [admin2UserMsg, setAdmin2UserMsg] = useState('');

  useEffect(() => {
    setAdmin2UserLoading(true);
    fetch('/api/admin-users')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Unauthorized');
        }
      })
      .then(data => {
        if (data.username) setUsername(data.username);
        setAdmin2UserLoading(false);
      })
      .catch(() => {
        setAdmin2UserLoading(false);
        setAdmin2UserMsg('Yetkisiz erişim. Lütfen giriş yapın.');
      });
  }, []);

  const saveAdmin2User = async () => {
    setAdmin2UserLoading(true);
    setAdmin2UserMsg('');
    const body: any = { username };
    if (password) body.password = password;
    const res = await fetch('/api/admin-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      setAdmin2UserMsg('Kullanıcı bilgileri güncellendi!');
      setPassword(''); // şifreyi sıfırla
    } else {
      setAdmin2UserMsg('Hata oluştu!');
    }
    setAdmin2UserLoading(false);
  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded p-4 my-8 max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2 text-orange-800">2. Admin Paneli Kullanıcı Bilgileri</h3>
      {admin2UserLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); saveAdmin2User(); }} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Yeni Şifre (değiştirmek için doldurun)</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Yeni şifre" />
          </div>
          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" disabled={admin2UserLoading}>Kaydet</button>
          {admin2UserMsg && <div className="text-sm mt-2 text-orange-700">{admin2UserMsg}</div>}
        </form>
      )}
    </div>
  );
}