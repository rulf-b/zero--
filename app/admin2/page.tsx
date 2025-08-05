'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Log helper
async function logAdmin2Action(action: string, details: any) {
  await fetch('/api/admin2-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      user: 'admin2',
      action,
      details
    })
  });
}

export default function Admin2Panel() {
  const router = useRouter();
  const [section, setSection] = useState<'applications' | 'messages'>('applications');
  const [applications, setApplications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [descModal, setDescModal] = useState<{open: boolean, text: string}>({open: false, text: ''});
  const [authChecked, setAuthChecked] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Cookie'den token kontrolü yap
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin-users');
        if (res.ok) {
          setAuthChecked(true);
        } else {
          setAuthChecked(false);
        }
      } catch {
        setAuthChecked(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    setLoading(true);
    if (section === 'applications') {
      fetch('/api/quote')
        .then(res => res.json())
        .then(data => {
          setApplications(data);
          setLoading(false);
        });
    } else if (section === 'messages') {
      fetch('/api/messages')
        .then(res => res.json())
        .then(data => {
          setMessages(data);
          setLoading(false);
        });
    }
  }, [authChecked, section]);

  const handleLogout = () => {
    // Cookie'yi temizle
    document.cookie = 'admin2_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setAuthChecked(false);
    setLogin({ username: '', password: '' });
    setLoginError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin-users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: login.username, password: login.password })
    });
    if (res.ok) {
      setAuthChecked(true);
      setLoginError('');
      return;
    }
    setLoginError('Kullanıcı adı veya şifre hatalı.');
  };

  const deleteApplication = async (id: string) => {
    await fetch('/api/quote', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setApplications(applications => applications.filter(a => a.id !== id));
    await logAdmin2Action('Başvuru Sil', { id });
  };

  const markAsRead = async (id: string, read: boolean) => {
    await fetch('/api/quote', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read }),
    });
    setApplications(applications =>
      applications.map(a => (a.id === id ? { ...a, read } : a))
    );
    await logAdmin2Action('Başvuru Okundu Durumu Değiştir', { id, read });
  };

  // Mesajlar için sil/okundu
  const deleteMessage = async (id: string) => {
    await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMessages(messages => messages.filter(m => m.id !== id));
    await logAdmin2Action('Mesaj Sil', { id });
  };
  const markMessageRead = async (id: string, read: boolean) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read }),
    });
    setMessages(messages =>
      messages.map(m => (m.id === id ? { ...m, read } : m))
    );
    await logAdmin2Action('Mesaj Okundu Durumu Değiştir', { id, read });
  };

  // --- KOŞULLU RENDER ---
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 mt-16">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-xs">
          <h2 className="text-2xl font-bold mb-6 text-center">2. Admin Paneli Giriş</h2>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={login.username}
            onChange={e => setLogin(v => ({ ...v, username: e.target.value }))}
            className="w-full mb-4 px-3 py-2 border rounded"
            autoFocus
          />
          <input
            type="password"
            placeholder="Şifre"
            value={login.password}
            onChange={e => setLogin(v => ({ ...v, password: e.target.value }))}
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          {loginError && <div className="text-red-600 mb-4 text-sm">{loginError}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Giriş Yap</button>
        </form>
      </div>
    );
  }
  if (loading) return <div className="text-center py-20">{section === 'applications' ? 'Başvurular' : 'Mesajlar'} yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">2. Admin Paneli</h1>
      <div className="flex gap-4 mb-8 flex-wrap">
        <button onClick={() => setSection('applications')} className={`px-4 py-2 rounded ${section === 'applications' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Başvurular</button>
        <button onClick={() => setSection('messages')} className={`px-4 py-2 rounded ${section === 'messages' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Mesajlar</button>
        <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 rounded">Çıkış Yap</button>
      </div>
      <div className="bg-white rounded shadow p-6">
        {section === 'applications' && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Ücretsiz Teşhis Başvuruları</h2>
            {loading ? (
              <div>Yükleniyor...</div>
            ) : applications.length === 0 ? (
              <div>Başvuru yok.</div>
            ) : (
              <table className="w-full text-sm border min-w-[900px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border whitespace-nowrap">Ad Soyad</th>
                    <th className="p-2 border whitespace-nowrap">Telefon</th>
                    <th className="p-2 border whitespace-nowrap">E-posta</th>
                    <th className="p-2 border whitespace-nowrap">Marka</th>
                    <th className="p-2 border whitespace-nowrap">Model</th>
                    <th className="p-2 border whitespace-nowrap">Sorun</th>
                    <th className="p-2 border whitespace-nowrap">Açıklama</th>
                    <th className="p-2 border whitespace-nowrap">Lokasyon</th>
                    <th className="p-2 border whitespace-nowrap">Tarih</th>
                    <th className="p-2 border whitespace-nowrap">Durum</th>
                    <th className="p-2 border whitespace-nowrap">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className={app.read ? "bg-gray-50" : "bg-yellow-50"}>
                      <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '180px'}}>
                        {app.name && app.name.length > 24 ? (
                          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: app.name})}>Detay</button>
                        ) : (
                          app.name
                        )}
                      </td>
                      <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '140px'}}>
                        {app.phone && app.phone.length > 18 ? (
                          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: app.phone})}>Detay</button>
                        ) : (
                          app.phone
                        )}
                      </td>
                      <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '180px'}}>
                        {app.email && app.email.length > 24 ? (
                          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: app.email})}>Detay</button>
                        ) : (
                          app.email
                        )}
                      </td>
                      <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '120px'}}>
                        {(app.brand || app.tvBrand) && (app.brand || app.tvBrand).length > 18 ? (
                          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: app.brand || app.tvBrand})}>Detay</button>
                        ) : (
                          app.brand || app.tvBrand
                        )}
                      </td>
                      <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '120px'}}>
                        {(app.model || app.tvModel) && (app.model || app.tvModel).length > 18 ? (
                          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: app.model || app.tvModel})}>Detay</button>
                        ) : (
                          app.model || app.tvModel
                        )}
                      </td>
                      <td className="border p-2 whitespace-nowrap">{app.issue || app.issueType}</td>
                      <td className="border p-2 max-w-xs" style={{maxWidth: '300px'}}>
                        {app.issueDescription || app.description ? (
                          (app.issueDescription || app.description).length > 60 ? (
                            <>
                              <span className="truncate inline-block align-middle" style={{maxWidth: '180px', verticalAlign: 'middle', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{app.issueDescription || app.description}</span>
                              <button className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: app.issueDescription || app.description})}>Detay</button>
                            </>
                          ) : (
                            app.issueDescription || app.description
                          )
                        ) : ''}
                      </td>
                      <td className="border p-2 whitespace-nowrap">{app.location}</td>
                      <td className="border p-2 whitespace-nowrap">{app.createdAt ? new Date(app.createdAt).toLocaleString() : "-"}</td>
                      <td className="border p-2 whitespace-nowrap">
                        {app.read ? "Okundu" : "Yeni"}
                        <button
                          className="ml-2 text-xs text-blue-600 underline"
                          onClick={() => markAsRead(app.id, !app.read)}
                        >
                          {app.read ? "Yeniden işaretle" : "Okundu yap"}
                        </button>
                      </td>
                      <td className="border p-2 whitespace-nowrap">
                        <button
                          className="text-xs text-red-600 underline"
                          onClick={() => deleteApplication(app.id)}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {section === 'messages' && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">İletişim Mesajları</h2>
            <table className="w-full text-sm border min-w-[900px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border whitespace-nowrap">Ad Soyad</th>
                  <th className="p-2 border whitespace-nowrap">Telefon</th>
                  <th className="p-2 border whitespace-nowrap">E-posta</th>
                  <th className="p-2 border whitespace-nowrap">Konu</th>
                  <th className="p-2 border whitespace-nowrap">Mesaj</th>
                  <th className="p-2 border whitespace-nowrap">Tarih</th>
                  <th className="p-2 border whitespace-nowrap">Durum</th>
                  <th className="p-2 border whitespace-nowrap">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className={msg.read ? "bg-gray-50" : "bg-yellow-50"}>
                    <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '180px'}}>
                      {msg.name && msg.name.length > 24 ? (
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: msg.name})}>Detay</button>
                      ) : (
                        msg.name
                      )}
                    </td>
                    <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '140px'}}>
                      {msg.phone && msg.phone.length > 18 ? (
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: msg.phone})}>Detay</button>
                      ) : (
                        msg.phone
                      )}
                    </td>
                    <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '180px'}}>
                      {msg.email && msg.email.length > 24 ? (
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: msg.email})}>Detay</button>
                      ) : (
                        msg.email
                      )}
                    </td>
                    <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '120px'}}>
                      {msg.subject && msg.subject.length > 18 ? (
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: msg.subject})}>Detay</button>
                      ) : (
                        msg.subject
                      )}
                    </td>
                    <td className="border p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '300px'}}>
                      {msg.message && msg.message.length > 60 ? (
                        <>
                          <span className="truncate inline-block align-middle" style={{maxWidth: '180px', verticalAlign: 'middle', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{msg.message}</span>
                          <button className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200" onClick={() => setDescModal({open: true, text: msg.message})}>Detay</button>
                        </>
                      ) : (
                        msg.message
                      )}
                    </td>
                    <td className="border p-2 whitespace-nowrap">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : '-'}</td>
                    <td className="border p-2 whitespace-nowrap">{msg.read ? "Okundu" : "Yeni"}
                      <button
                        className="ml-2 text-xs text-blue-600 underline"
                        onClick={() => markMessageRead(msg.id, !msg.read)}
                      >
                        {msg.read ? "Yeniden işaretle" : "Okundu yap"}
                      </button>
                    </td>
                    <td className="border p-2 whitespace-nowrap">
                      <button
                        className="text-xs text-red-600 underline"
                        onClick={() => {
                          if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;
                          deleteMessage(msg.id);
                        }}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {descModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
              <h3 className="text-lg font-bold mb-4">Detay</h3>
              <div className="text-gray-800 whitespace-pre-line break-words mb-6" style={{maxHeight: '300px', overflowY: 'auto'}}>{descModal.text}</div>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl" onClick={() => setDescModal({open: false, text: ''})}>&times;</button>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setDescModal({open: false, text: ''})}>Kapat</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 