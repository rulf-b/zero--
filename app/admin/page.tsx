"use client";
import { useState, useEffect, useRef } from "react";
import { usePrices } from '@/lib/PricesContext';
import { useRouter } from 'next/navigation';
import Admin2UserPage from './admin2-user/page';
// import Admin2LogPage from './admin2-log/page';

// Sabit değerler
const BRANDS = ['Samsung', 'LG', 'Sony', 'Philips', 'Vestel', 'TCL', 'Hisense'];
const SIZES = ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '85"'];
const ISSUES = ['Kırık Ekran', 'Siyah Ekran', 'Arka Aydınlatma Sorunları', 'Ölü Piksel', 'Renk Sorunları', 'Güç Yok', 'Diğer'];

const AUTHOR_OPTIONS = ['Zero TV Servisi', 'Teknoloji Editörü'];

// İngilizce sorunları Türkçeye çeviren yardımcı fonksiyon
function getTurkishIssue(issue: any) {
  switch(issue) {
    case 'Cracked Screen': return 'Kırık Ekran';
    case 'Black Screen': return 'Siyah Ekran';
    case 'Backlight Issues': return 'Arka Aydınlatma Sorunları';
    case 'Dead Pixels': return 'Ölü Piksel';
    case 'Color Problems': return 'Renk Sorunları';
    case 'No Power': return 'Güç Yok';
    case 'Other': return 'Diğer';
    default: return issue;
  }
}

// Tip tanımı ekle
interface TestimonialStats {
  tvsCount: number;
  tvsLabel: string;
  tvsSub: string;
  lastModel: string;
  rating: string;
  ratingLabel: string;
  ratingSub: string;
  ratingQuote: string;
  ratingQuoteAuthor: string;
  successRate: number;
  successLabel: string;
  successSub: string;
  successQuote: string;
  warranty: number;
  warrantyLabel: string;
  warrantySub: string;
  warrantyQuote: string;
}

interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  workingHours: { day: string; hours: string }[];
  description: string;
  homepageHero: any;
  testimonialStats: TestimonialStats;
  testimonials: Testimonial[];
  about?: {
    valuesTitle?: string;
    valuesSubtitle?: string;
    values?: { title: string; description: string }[];
    storyTitle?: string;
    story?: string[];
    image?: string;
    teamImage?: string;
    teamText?: string;
    stats?: { number: string; label: string }[];
    certifications?: {
      title?: string;
      subtitle?: string;
      items?: string[];
      description?: string;
    };
  };
}

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [section, setSection] = useState("applications");
  const { prices, updatePrice, refreshPrices, loading } = usePrices();
  const router = useRouter();
  
  // Fiyat yönetimi state'leri
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [priceRange, setPriceRange] = useState({ start: '', end: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPriceRange, setCurrentPriceRange] = useState<string | null>(null);

  // Genel fiyat aralığı state'leri
  const [generalPriceRange, setGeneralPriceRange] = useState({ start: '', end: '' });

  // Başvuru yönetimi için state
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // Marka yönetimi state'leri
  const [brands, setBrands] = useState<any[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [newBrand, setNewBrand] = useState({ name: '', logo: '' });
  const [editingBrand, setEditingBrand] = useState<any>(null);

  // Model yönetimi state'leri
  const [tvModels, setTvModels] = useState<any[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);
  const [newModel, setNewModel] = useState({ brand: '', model: '' });
  const [editingModel, setEditingModel] = useState<any>(null);

  // Site ayarları state'leri
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    companyName: 'Zero TV Servisi',
    phone: '+90 552 558 79 05',
    email: 'zero@ledtvpaneli.com',
    address: 'İstanbul, Türkiye',
    whatsapp: '+90 552 558 79 05',
    workingHours: [
      { day: 'Pazartesi', hours: '08:00 - 18:00' },
      { day: 'Salı', hours: '08:00 - 18:00' },
      { day: 'Çarşamba', hours: '08:00 - 18:00' },
      { day: 'Perşembe', hours: '08:00 - 18:00' },
      { day: 'Cuma', hours: '08:00 - 18:00' },
      { day: 'Cumartesi', hours: '08:00 - 17:00' },
      { day: 'Pazar', hours: 'Kapalı' }
    ],
    description: 'TV tamir ve servis hizmetleri',
    homepageHero: {
      title: 'Sürekli Gelişen Teknoloji',
      subtitle: 'En modern TV modelleri ile hizmetinizdeyiz.',
      stats: {
        years: 15,
        yearsLabel: 'Yıllık Deneyim',
        repairedTVs: 1000,
        repairedTVsLabel: 'Onarılan TV Sayısı',
        support: '7/24',
        supportLabel: 'Destek'
      }
    },
    testimonialStats: {
      tvsCount: 5000,
      tvsLabel: 'Onarılan TV',
      tvsSub: 'Tüm marka ve modeller',
      lastModel: 'En son: Samsung 55NU7100',
      rating: '4.9/5',
      ratingLabel: 'Ortalama Puan',
      ratingSub: 'Google & WhatsApp yorumları',
      ratingQuote: "Harika hizmet, 2 saatte TV'im yenilendi!",
      ratingQuoteAuthor: 'Ahmet Y.',
      successRate: 99,
      successLabel: 'Başarı Oranı',
      successSub: 'Yüksek müşteri memnuniyeti',
      successQuote: 'Tüm süreç çok şeffaf ve güven vericiydi. %100 memnuniyet!',
      warranty: 12,
      warrantyLabel: 'Garanti Süresi',
      warrantySub: 'Tüm işlemlerde geçerli',
      warrantyQuote: 'Panel değişiminden sonra 1 yıl boyunca hiç sorun yaşamadım!'
    },
    testimonials: []
  });

  // Blog yönetimi state'leri
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Zero TV Servisi',
    image: '',
    tags: ''
  });
  const [editingBlogPost, setEditingBlogPost] = useState<any>(null);

  // Blog görseli yükleme için ref ve state
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // SSS'leri çek
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingFaq, setEditingFaq] = useState<any>(null);

  const [descModal, setDescModal] = useState<{open: boolean, text: string}>({open: false, text: ''});

  // Yeni state'ler:
  const [admin2User, setAdmin2User] = useState({ username: '', password: '' });
  const [admin2UserLoading, setAdmin2UserLoading] = useState(false);
  const [admin2UserMsg, setAdmin2UserMsg] = useState('');

  // Yorum ekleme için state
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({ name: '', location: '', rating: 5, text: '', service: '', date: '' });

  // component başında
  const [newValue, setNewValue] = useState({ title: '', description: '' });
  const [newStat, setNewStat] = useState({ number: '', label: '' });
  const [newStory, setNewStory] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin1 kontrolü
    try {
      const res1 = await fetch('/api/admin1-users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login.username, password: login.password })
      });
      if (res1.ok) {
        setIsLoggedIn(true);
        setLoginError("");
        return;
      }
    } catch {}
    
    // Admin2 kontrolü
    try {
      const res2 = await fetch('/api/admin-users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login.username, password: login.password })
      });
      if (res2.ok) {
        localStorage.setItem('admin2_logged_in', 'true');
        router.push('/admin2');
        return;
      }
    } catch {}
    
    setLoginError("Kullanıcı adı veya şifre hatalı.");
  };

  // Mevcut fiyatı kontrol et
  const checkCurrentPrice = () => {
    if (!selectedBrand || !selectedSize || !selectedIssue || !prices) {
      setCurrentPriceRange(null);
      setPriceRange({ start: '', end: '' });
      return;
    }

    const brandData = prices[selectedBrand];
    if (brandData && typeof brandData === 'object' && !Array.isArray(brandData)) {
      const sizeData = (brandData as any)[selectedSize];
      if (sizeData && typeof sizeData === 'object') {
        const price = sizeData[selectedIssue];
        if (typeof price === 'string' && price.includes('~')) {
          // Fiyat aralığı formatında kaydedilmiş
          // Sadece rakamları al, tüm ayraçları temizle
          const match = price.match(/₺([0-9.,\s]+)\s*~\s*₺([0-9.,\s]+)/);
          if (match) {
            const start = match[1].replace(/[^0-9]/g, '');
            const end = match[2].replace(/[^0-9]/g, '');
            setCurrentPriceRange(price);
            setPriceRange({ start, end });
            setIsEditing(true);
            return;
          }
        } else if (typeof price === 'number') {
          // Eski format - tek fiyat
          const minPrice = Math.round(price * 0.8);
          const maxPrice = Math.round(price * 1.2);
          const rangeString = `₺${minPrice.toLocaleString()} ~ ₺${maxPrice.toLocaleString()}`;
          setCurrentPriceRange(rangeString);
          setPriceRange({ start: minPrice.toString(), end: maxPrice.toString() });
          setIsEditing(true);
          return;
        }
      }
    }
    
    setCurrentPriceRange(null);
    setPriceRange({ start: '', end: '' });
    setIsEditing(false);
  };

  // Seçim değiştiğinde fiyatı kontrol et
  useEffect(() => {
    checkCurrentPrice();
  }, [selectedBrand, selectedSize, selectedIssue, prices]);

  // Genel fiyat aralığını yükle
  useEffect(() => {
    if (prices?.generalQuoteRange) {
      const range = prices.generalQuoteRange;
      const match = range.match(/₺([0-9.,\s]+)\s*[~-]\s*₺([0-9.,\s]+)/);
      if (match) {
        const start = match[1].replace(/[^0-9]/g, '');
        const end = match[2].replace(/[^0-9]/g, '');
        setGeneralPriceRange({ start, end });
      }
    }
  }, [prices]);

  // Fiyat kaydet
  const savePrice = async () => {
    if (!selectedBrand || !selectedSize || !selectedIssue || !prices) {
      alert('Lütfen tüm alanları seçin');
      return;
    }

    const startPrice = parseInt(priceRange.start);
    const endPrice = parseInt(priceRange.end);
    
    if (isNaN(startPrice) || isNaN(endPrice)) {
      alert('Geçerli fiyat aralığı giriniz');
      return;
    }

    if (startPrice > endPrice) {
      alert('Başlangıç fiyatı bitiş fiyatından büyük olamaz');
      return;
    }

    // Fiyat aralığı formatında kaydet
    const rangeString = `₺${startPrice.toLocaleString()} ~ ₺${endPrice.toLocaleString()}`;

    // Yeni fiyat yapısını güncelle
    const updatedPrices = { ...prices };
    
    // Eğer marka yoksa oluştur
    if (!updatedPrices[selectedBrand] || typeof updatedPrices[selectedBrand] === 'number' || typeof updatedPrices[selectedBrand] === 'string') {
      updatedPrices[selectedBrand] = {};
    }
    
    const brandPrices = updatedPrices[selectedBrand] as any;
    
    // Eğer boyut yoksa oluştur
    if (!brandPrices[selectedSize]) {
      brandPrices[selectedSize] = {};
    }
    
    // Fiyatı güncelle
    brandPrices[selectedSize][selectedIssue] = rangeString;
    
    // API'ye gönder
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrices)
    });
    
    // Context'i güncelle
    updatePrice(selectedBrand as any, brandPrices);
    
    // Fiyatları yenile
    await refreshPrices();
    
    alert('Fiyat başarıyla kaydedildi!');
    setCurrentPriceRange(rangeString);
  };

  // Genel fiyat aralığını kaydet
  const saveGeneralPriceRange = async () => {
    if (!prices) return;

    const startPrice = parseInt(generalPriceRange.start);
    const endPrice = parseInt(generalPriceRange.end);
    
    if (isNaN(startPrice) || isNaN(endPrice)) {
      alert('Geçerli fiyat aralığı giriniz');
      return;
    }

    if (startPrice > endPrice) {
      alert('Başlangıç fiyatı bitiş fiyatından büyük olamaz');
      return;
    }

    const rangeString = `₺${startPrice.toLocaleString()} ~ ₺${endPrice.toLocaleString()}`;
    
    const updatedPrices = { ...prices, generalQuoteRange: rangeString };
    
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrices)
    });
    
    updatePrice('generalQuoteRange' as any, rangeString);
    
    // Fiyatları yenile
    await refreshPrices();
    
    alert('Genel fiyat aralığı kaydedildi!');
  };

  // Yeni fiyat ekle
  const addNewPrice = async () => {
    if (!selectedBrand || !selectedSize || !selectedIssue) {
      alert('Lütfen marka, boyut ve sorun tipini seçin');
      return;
    }

    const startPrice = parseInt(priceRange.start);
    const endPrice = parseInt(priceRange.end);
    
    if (isNaN(startPrice) || isNaN(endPrice)) {
      alert('Geçerli fiyat aralığı giriniz');
      return;
    }

    if (startPrice > endPrice) {
      alert('Başlangıç fiyatı bitiş fiyatından büyük olamaz');
      return;
    }

    // Fiyat aralığı formatında kaydet
    const rangeString = `₺${startPrice.toLocaleString()} ~ ₺${endPrice.toLocaleString()}`;

    if (!prices) return;

    // Yeni fiyat yapısını güncelle
    const updatedPrices = { ...prices };
    
    // Eğer marka yoksa oluştur
    if (!updatedPrices[selectedBrand] || typeof updatedPrices[selectedBrand] === 'number' || typeof updatedPrices[selectedBrand] === 'string') {
      updatedPrices[selectedBrand] = {};
    }
    
    const brandPrices = updatedPrices[selectedBrand] as any;
    
    // Eğer boyut yoksa oluştur
    if (!brandPrices[selectedSize]) {
      brandPrices[selectedSize] = {};
    }
    
    // Fiyatı ekle
    brandPrices[selectedSize][selectedIssue] = rangeString;
    
    // API'ye gönder
    await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPrices)
    });
    
    // Context'i güncelle
    updatePrice(selectedBrand as any, brandPrices);
    
    // Fiyatları yenile
    await refreshPrices();
    
    alert('Yeni fiyat başarıyla eklendi!');
    setCurrentPriceRange(rangeString);
    setIsEditing(true);
  };

  // Başvuruları çek
  useEffect(() => {
    if (section === "applications") {
      setLoadingApps(true);
      fetch("/api/quote")
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setLoadingApps(false);
        });
    }
  }, [section]);

  // Markaları çek
  useEffect(() => {
    if (section === "brands" || section === "prices") {
      setLoadingBrands(true);
      fetch("/api/brands")
        .then((res) => res.json())
        .then((data) => {
          setBrands(data);
          setLoadingBrands(false);
        });
    }
  }, [section]);

  // TV modellerini çek
  useEffect(() => {
    if (section === "models") {
      setLoadingModels(true);
      fetch("/api/tv-models")
        .then((res) => res.json())
        .then((data) => {
          setTvModels(data);
          setLoadingModels(false);
        });
    }
  }, [section]);

  // Site ayarlarını çek
  useEffect(() => {
    if (section === "settings" || section === "about") {
      fetch("/api/site-settings")
        .then((res) => res.json())
        .then((data) => {
          setSiteSettings(data);
        });
    }
  }, [section]);

  // Blog yazılarını çek
  useEffect(() => {
    if (section === "blog") {
      setLoadingBlog(true);
      fetch("/api/blog-posts")
        .then((res) => res.json())
        .then((data) => {
          setBlogPosts(data);
          setLoadingBlog(false);
        });
    }
  }, [section]);

  // SSS'leri çek
  useEffect(() => {
    if (section === "faq") {
      setLoadingFaqs(true);
      fetch("/api/faq")
        .then((res) => res.json())
        .then((data) => {
          setFaqs(data);
          setLoadingFaqs(false);
        });
    }
  }, [section]);

  // Başvuruyu sil
  const deleteApplication = async (id: string) => {
    await fetch("/api/quote", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setApplications((apps) => apps.filter((a) => a.id !== id));
  };

  // Okundu olarak işaretle
  const markAsRead = async (id: string, read: boolean) => {
    await fetch("/api/quote", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setApplications((apps) =>
      apps.map((a) => (a.id === id ? { ...a, read } : a))
    );
  };

  // Marka ekle
  const addBrand = async () => {
    if (!newBrand.name.trim()) {
      alert('Marka adı gerekli');
      return;
    }

    const brandData = {
      name: newBrand.name.trim(),
      logo: newBrand.logo || '/brands/placeholder.svg'
    };

    const updatedBrands = [...brands, brandData];
    
    await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBrands),
    });
    
    setBrands(updatedBrands);
    setNewBrand({ name: '', logo: '' });
    alert('Marka başarıyla eklendi!');
  };

  // Marka güncelle
  const updateBrand = async () => {
    if (!editingBrand || !editingBrand.name.trim()) {
      alert('Marka adı gerekli');
      return;
    }

    const updatedBrands = brands.map(brand => 
      brand.name === editingBrand.originalName ? editingBrand : brand
    );
    
    await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBrands),
    });
    
    setBrands(updatedBrands);
    setEditingBrand(null);
    alert('Marka başarıyla güncellendi!');
  };

  // Marka sil
  const deleteBrand = async (brandName: string) => {
    if (!confirm(`${brandName} markasını silmek istediğinizden emin misiniz?`)) {
      return;
    }

    const updatedBrands = brands.filter(brand => brand.name !== brandName);
    
    await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBrands),
    });
    
    setBrands(updatedBrands);
    alert('Marka başarıyla silindi!');
  };

  // Model ekle
  const addModel = async () => {
    if (!newModel.brand || !newModel.model.trim()) {
      alert('Marka ve model adı gerekli');
      return;
    }

    const modelData = {
      brand: newModel.brand,
      model: newModel.model.trim()
    };

    const updatedModels = [...tvModels, modelData];
    
    await fetch("/api/tv-models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModels),
    });
    
    setTvModels(updatedModels);
    setNewModel({ brand: '', model: '' });
    alert('Model başarıyla eklendi!');
  };

  // Model güncelle
  const updateModel = async () => {
    if (!editingModel || !editingModel.brand || !editingModel.model.trim()) {
      alert('Marka ve model adı gerekli');
      return;
    }

    const updatedModels = tvModels.map(model => 
      model.brand === editingModel.originalBrand && model.model === editingModel.originalModel 
        ? editingModel 
        : model
    );
    
    await fetch("/api/tv-models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModels),
    });
    
    setTvModels(updatedModels);
    setEditingModel(null);
    alert('Model başarıyla güncellendi!');
  };

  // Model sil
  const deleteModel = async (brand: string, model: string) => {
    if (!confirm(`${brand} ${model} modelini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    const updatedModels = tvModels.filter(m => !(m.brand === brand && m.model === model));
    
    await fetch("/api/tv-models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedModels),
    });
    
    setTvModels(updatedModels);
    alert('Model başarıyla silindi!');
  };

  // Site ayarlarını kaydet
  const saveSiteSettings = async () => {
    await fetch("/api/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(siteSettings),
    });
    alert('Site ayarları başarıyla kaydedildi!');
  };

  // Blog yazısı ekle
  const addBlogPost = async () => {
    if (!newBlogPost.title.trim() || !newBlogPost.content.trim()) {
      alert('Başlık ve içerik gerekli');
      return;
    }

    const blogData = {
      id: Date.now().toString(),
      title: newBlogPost.title.trim(),
      content: newBlogPost.content.trim(),
      excerpt: newBlogPost.excerpt.trim(),
      author: newBlogPost.author.trim(),
      date: new Date().toISOString().split('T')[0],
      image: newBlogPost.image || '/blog/default.jpg',
      tags: newBlogPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const updatedPosts = [...blogPosts, blogData];
    
    await fetch("/api/blog-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPosts),
    });
    
    setBlogPosts(updatedPosts);
    setNewBlogPost({
      title: '',
      content: '',
      excerpt: '',
      author: 'Zero TV Servisi',
      image: '',
      tags: ''
    });
    alert('Blog yazısı başarıyla eklendi!');
  };

  // Blog yazısı güncelle
  const updateBlogPost = async () => {
    if (!editingBlogPost || !editingBlogPost.title.trim() || !editingBlogPost.content.trim()) {
      alert('Başlık ve içerik gerekli');
      return;
    }

    const updatedPosts = blogPosts.map(post => 
      post.id === editingBlogPost.id ? editingBlogPost : post
    );
    
    await fetch("/api/blog-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPosts),
    });
    
    setBlogPosts(updatedPosts);
    setEditingBlogPost(null);
    alert('Blog yazısı başarıyla güncellendi!');
  };

  // Blog yazısı sil
  const deleteBlogPost = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    const updatedPosts = blogPosts.filter(post => post.id !== id);
    
    await fetch("/api/blog-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPosts),
    });
    
    setBlogPosts(updatedPosts);
    alert('Blog yazısı başarıyla silindi!');
  };

  // SSS ekle
  const addFaq = async () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      alert('Soru ve cevap gerekli');
      return;
    }
    const updatedFaqs = [...faqs, { ...newFaq, id: Date.now().toString() }];
    await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFaqs),
    });
    setFaqs(updatedFaqs);
    setNewFaq({ question: '', answer: '' });
    alert('SSS başarıyla eklendi!');
  };
  // SSS güncelle
  const updateFaq = async () => {
    if (!editingFaq || !editingFaq.question.trim() || !editingFaq.answer.trim()) {
      alert('Soru ve cevap gerekli');
      return;
    }
    const updatedFaqs = faqs.map(faq => faq.id === editingFaq.id ? editingFaq : faq);
    await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFaqs),
    });
    setFaqs(updatedFaqs);
    setEditingFaq(null);
    alert('SSS başarıyla güncellendi!');
  };
  // SSS sil
  const deleteFaq = async (id: string) => {
    if (!confirm('Bu SSS kaydını silmek istediğinizden emin misiniz?')) return;
    const updatedFaqs = faqs.filter(faq => faq.id !== id);
    await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFaqs),
    });
    setFaqs(updatedFaqs);
    alert('SSS başarıyla silindi!');
  };

  // Blog görseli yükleme fonksiyonu
  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setNewBlogPost((v: any) => ({ ...v, image: data.url }));
    setUploadingImage(false);
  };

  // Bilgileri çek
  useEffect(() => {
    if (isLoggedIn) {
      setAdmin2UserLoading(true);
      fetch('/api/admin-users')
        .then(res => res.json())
        .then(data => {
          if (data.username) setAdmin2User({ username: data.username, password: data.password });
          setAdmin2UserLoading(false);
        })
        .catch(() => setAdmin2UserLoading(false));
    }
  }, [isLoggedIn]);

  // Kaydet fonksiyonu
  const saveAdmin2User = async () => {
    setAdmin2UserLoading(true);
    setAdmin2UserMsg('');
    const res = await fetch('/api/admin-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin2User)
    });
    if (res.ok) {
      setAdmin2UserMsg('Kullanıcı bilgileri güncellendi!');
    } else {
      setAdmin2UserMsg('Hata oluştu!');
    }
    setAdmin2UserLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogin({ username: '', password: '' });
    setLoginError("");
    // Optionally clear any localStorage/session if used
    router.replace('/admin');
  };

  if (loading || !prices) return <div className="text-center py-20">Fiyatlar yükleniyor...</div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 mt-16">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-xs">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Paneli Giriş</h2>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={login.username}
            onChange={(e: any) => setLogin((v: any) => ({ ...v, username: e.target.value }))}
            className="w-full mb-4 px-3 py-2 border rounded"
            autoFocus
          />
          <input
            type="password"
            placeholder="Şifre"
            value={login.password}
            onChange={(e: any) => setLogin((v: any) => ({ ...v, password: e.target.value }))}
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          {loginError && <div className="text-red-600 mb-4 text-sm">{loginError}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Giriş Yap</button>
        </form>
      </div>
    );
  }

  // Günler sabit dizi
  const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">Admin Paneli</h1>
      <div className="flex gap-4 mb-8 flex-wrap">
        <button 
          onClick={() => setSection("applications")} 
          className={`px-4 py-2 rounded ${section === "applications" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Başvurular
        </button>
        <button 
          onClick={() => setSection("prices")} 
          className={`px-4 py-2 rounded ${section === "prices" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Fiyat Yönetimi
        </button>
        <button 
          onClick={() => setSection("brands")} 
          className={`px-4 py-2 rounded ${section === "brands" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Marka Yönetimi
        </button>
        <button 
          onClick={() => setSection("models")} 
          className={`px-4 py-2 rounded ${section === "models" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Model Yönetimi
        </button>
        <button 
          onClick={() => setSection("settings")} 
          className={`px-4 py-2 rounded ${section === "settings" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Site Ayarları
        </button>
        <button 
          onClick={() => setSection("blog")} 
          className={`px-4 py-2 rounded ${section === "blog" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Blog Yönetimi
        </button>
        <button 
          onClick={() => setSection("faq")} 
          className={`px-4 py-2 rounded ${section === "faq" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          SSS Yönetimi
        </button>
        <button 
          onClick={() => setSection("services")} 
          className={`px-4 py-2 rounded ${section === "services" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Hizmetler Yönetimi
        </button>
        <button
          onClick={() => setSection("admin2-user")}
          className={`px-4 py-2 rounded ${section === "admin2-user" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200"}`}
          style={{textDecoration: 'none', display: 'inline-block'}}>
          2. Admin Paneli Kullanıcı Bilgileri
        </button>
        <button 
          onClick={() => setSection("screen-types")}
          className={`px-4 py-2 rounded ${section === "screen-types" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Ekran Tipleri Yönetimi
        </button>
        <button 
          onClick={() => setSection("about")}
          className={`px-4 py-2 rounded ${section === "about" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Hakkımızda Yönetimi
        </button>
        <button 
          onClick={() => setSection("testimonials")}
          className={`px-4 py-2 rounded ${section === "testimonials" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200"}`}
        >
          Yorum Yönetimi
        </button>
        <button 
          onClick={() => setSection("admin2-log")}
          className={`px-4 py-2 rounded ${section === "admin2-log" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200"}`}
          style={{textDecoration: 'none', display: 'inline-block'}}>
          2. Admin Paneli Logları
        </button>
        <button 
          onClick={() => setSection("messages")} 
          className={`px-4 py-2 rounded ${section === "messages" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Mesajlar
        </button>
        <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 rounded">Çıkış Yap</button>
      </div>
      
      <div className="bg-white rounded shadow p-6">
        {section === "applications" && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Ücretsiz Teşhis Başvuruları</h2>
            {loadingApps ? (
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
                      <td className="border p-2 whitespace-nowrap">{getTurkishIssue(app.issue || app.issueType)}</td>
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
        
        {section === "prices" && (
          <div className="space-y-8">
            {/* Genel Fiyat Aralığı */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Genel Fiyat Aralığı</h3>
              <p className="text-sm text-blue-600 mb-4">Bu fiyat aralığı, özel fiyat girilmemiş kombinasyonlar için kullanılır.</p>
              
              <div className="flex gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlangıç Fiyatı (₺)</label>
                  <input
                    type="number"
                    value={generalPriceRange.start}
                    onChange={(e: any) => setGeneralPriceRange((v: any) => ({ ...v, start: e.target.value }))}
                    className="w-32 p-2 border rounded"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bitiş Fiyatı (₺)</label>
                  <input
                    type="number"
                    value={generalPriceRange.end}
                    onChange={(e: any) => setGeneralPriceRange((v: any) => ({ ...v, end: e.target.value }))}
                    className="w-32 p-2 border rounded"
                    placeholder="5000"
                  />
                </div>
                <button
                  onClick={saveGeneralPriceRange}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </div>

            {/* Özel Fiyat Yönetimi */}
            <div>
              <h3 className="text-lg font-bold mb-4">Özel Fiyat Yönetimi</h3>
              <p className="text-sm text-gray-600 mb-6">Belirli marka, boyut ve sorun tipi kombinasyonları için özel fiyat belirleyin.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Marka</label>
                  <select
                    value={selectedBrand}
                    onChange={(e: any) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Marka Seçin</option>
                    {brands.map((brand: any) => (
                      <option key={brand.name} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Boyut</label>
                  <select
                    value={selectedSize}
                    onChange={(e: any) => setSelectedSize(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Boyut Seçin</option>
                    {SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sorun Tipi</label>
                  <select
                    value={selectedIssue}
                    onChange={(e: any) => setSelectedIssue(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Sorun Seçin</option>
                    {ISSUES.map(issue => (
                      <option key={issue} value={issue}>{issue}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setPriceRange({ start: '', end: '' });
                      setIsEditing(false);
                    }}
                    className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Temizle
                  </button>
                </div>
              </div>

              {/* Fiyat Girişi */}
              {selectedBrand && selectedSize && selectedIssue && (
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">
                      {selectedBrand} {selectedSize} - {selectedIssue}
                    </h4>
                    {currentPriceRange && (
                      <span className="text-sm text-gray-600">
                        Mevcut Fiyat: {currentPriceRange}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-2">Başlangıç Fiyatı (₺)</label>
                      <input
                        type="number"
                        value={priceRange.start}
                        onChange={(e: any) => setPriceRange((v: any) => ({ ...v, start: e.target.value }))}
                        className="w-32 p-2 border rounded"
                        placeholder="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bitiş Fiyatı (₺)</label>
                      <input
                        type="number"
                        value={priceRange.end}
                        onChange={(e: any) => setPriceRange((v: any) => ({ ...v, end: e.target.value }))}
                        className="w-32 p-2 border rounded"
                        placeholder="5000"
                      />
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <button
                          onClick={savePrice}
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                          Güncelle
                        </button>
                      ) : (
                        <button
                          onClick={addNewPrice}
                          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                          Ekle
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {priceRange.start && priceRange.end && (
                    <div className="mt-4 p-3 bg-blue-100 rounded">
                      <div className="text-sm text-blue-800">
                        <strong>Fiyat Aralığı:</strong> ₺{parseInt(priceRange.start).toLocaleString()} ~ ₺{parseInt(priceRange.end).toLocaleString()}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Bu fiyat aralığı kullanıcılara gösterilecek
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marka Yönetimi */}
        {section === "brands" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">Marka Yönetimi</h2>
            
            {/* Yeni Marka Ekleme */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold mb-4 text-green-800">Yeni Marka Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Marka Adı</label>
                  <input
                    type="text"
                    value={newBrand.name}
                    onChange={(e: any) => setNewBrand(v => ({ ...v, name: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="Samsung"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Logo Yükle (Opsiyonel)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e: any) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setLoadingBrands(true);
                      const formData = new FormData();
                      formData.append('file', file);
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      });
                      const data = await res.json();
                      setNewBrand((v: any) => ({ ...v, logo: data.url }));
                      setLoadingBrands(false);
                    }}
                    className="w-full p-2 border rounded"
                  />
                  {newBrand.logo && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={newBrand.logo} alt="Logo" className="h-12" />
                      <button
                        type="button"
                        onClick={() => setNewBrand((v: any) => ({ ...v, logo: '' }))}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                      >
                        Görseli Sil
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={addBrand}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Marka Ekle
              </button>
            </div>

            {/* Marka Listesi */}
            <div>
              <h3 className="text-lg font-bold mb-4">Mevcut Markalar</h3>
              {loadingBrands ? (
                <div>Yükleniyor...</div>
              ) : brands.length === 0 ? (
                <div>Marka bulunamadı.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brands.map((brand, index) => (
                    <div key={index} className="border rounded p-4 bg-white">
                      {editingBrand && editingBrand.originalName === brand.name ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingBrand.name}
                            onChange={(e: any) => setEditingBrand(v => ({ ...v, name: e.target.value }))}
                            className="w-full p-2 border rounded"
                          />
                          {/* Logo yükleme alanı */}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e: any) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setLoadingBrands(true);
                              const formData = new FormData();
                              formData.append('file', file);
                              const res = await fetch('/api/upload', {
                                method: 'POST',
                                body: formData
                              });
                              const data = await res.json();
                              setEditingBrand((v: any) => ({ ...v, logo: data.url }));
                              setLoadingBrands(false);
                            }}
                            className="w-full p-2 border rounded"
                          />
                          {editingBrand.logo && (
                            <div className="mt-2 flex items-center gap-2">
                              <img src={editingBrand.logo} alt="Logo" className="h-12" />
                              <button
                                type="button"
                                onClick={() => setEditingBrand((v: any) => ({ ...v, logo: '' }))}
                                className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                              >
                                Görseli Sil
                              </button>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={updateBrand}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Kaydet
                            </button>
                            <button
                              onClick={() => setEditingBrand(null)}
                              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                            >
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{brand.name}</h4>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingBrand({
                                  ...brand,
                                  originalName: brand.name
                                })}
                                className="text-blue-600 text-sm underline"
                              >
                                Düzenle
                              </button>
                              <button
                                onClick={() => deleteBrand(brand.name)}
                                className="text-red-600 text-sm underline"
                              >
                                Sil
                              </button>
                            </div>
                          </div>
                          {brand.logo && (
                            <div className="text-sm text-gray-600">
                              Logo: {brand.logo}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Model Yönetimi */}
        {section === "models" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">TV Model Yönetimi</h2>
            
            {/* Yeni Model Ekleme */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold mb-4 text-green-800">Yeni Model Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Marka</label>
                  <select
                    value={newModel.brand}
                    onChange={(e: any) => setNewModel(v => ({ ...v, brand: e.target.value }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Marka Seçin</option>
                    {brands.map(brand => (
                      <option key={brand.name} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model Adı</label>
                  <input
                    type="text"
                    value={newModel.model}
                    onChange={(e: any) => setNewModel(v => ({ ...v, model: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="55NU7100"
                  />
                </div>
              </div>
              <button
                onClick={addModel}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Model Ekle
              </button>
            </div>

            {/* Model Listesi */}
            <div>
              <h3 className="text-lg font-bold mb-4">Mevcut Modeller</h3>
              {loadingModels ? (
                <div>Yükleniyor...</div>
              ) : tvModels.length === 0 ? (
                <div>Model bulunamadı.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Marka</th>
                        <th className="p-2 border">Model</th>
                        <th className="p-2 border">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tvModels.map((model, index) => (
                        <tr key={index} className="bg-white">
                          {editingModel && editingModel.originalBrand === model.brand && editingModel.originalModel === model.model ? (
                            <>
                              <td className="border p-2">
                                <select
                                  value={editingModel.brand}
                                  onChange={(e: any) => setEditingModel(v => ({ ...v, brand: e.target.value }))}
                                  className="w-full p-1 border rounded"
                                >
                                  {brands.map(brand => (
                                    <option key={brand.name} value={brand.name}>{brand.name}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="border p-2">
                                <input
                                  type="text"
                                  value={editingModel.model}
                                  onChange={(e: any) => setEditingModel(v => ({ ...v, model: e.target.value }))}
                                  className="w-full p-1 border rounded"
                                />
                              </td>
                              <td className="border p-2">
                                <div className="flex gap-2">
                                  <button
                                    onClick={updateModel}
                                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                  >
                                    Kaydet
                                  </button>
                                  <button
                                    onClick={() => setEditingModel(null)}
                                    className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                                  >
                                    İptal
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="border p-2">{model.brand}</td>
                              <td className="border p-2">{model.model}</td>
                              <td className="border p-2">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setEditingModel({
                                      ...model,
                                      originalBrand: model.brand,
                                      originalModel: model.model
                                    })}
                                    className="text-blue-600 text-xs underline"
                                  >
                                    Düzenle
                                  </button>
                                  <button
                                    onClick={() => deleteModel(model.brand, model.model)}
                                    className="text-red-600 text-xs underline"
                                  >
                                    Sil
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Site Ayarları */}
        {section === "settings" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">Site Ayarları</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Genel Bilgiler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Şirket Adı</label>
                  <input
                    type="text"
                    value={siteSettings.companyName}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ ...v, companyName: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="text"
                    value={siteSettings.phone}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ ...v, phone: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <input
                    type="email"
                    value={siteSettings.email}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ ...v, email: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={siteSettings.whatsapp}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ ...v, whatsapp: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Adres</label>
                  <input
                    type="text"
                    value={siteSettings.address}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ ...v, address: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <textarea
                    value={siteSettings.description}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ ...v, description: e.target.value }))}
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
              </div>
              <button
                onClick={saveSiteSettings}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Ayarları Kaydet
              </button>
            </div>

            {/* Homepage Hero Yönetimi */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-bold mb-4 text-yellow-800">Ana Sayfa Hero Alanı</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlık</label>
                  <input
                    type="text"
                    value={siteSettings.homepageHero?.title || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: { ...v.homepageHero, title: e.target.value, stats: { ...v.homepageHero?.stats } }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Alt Başlık</label>
                  <input
                    type="text"
                    value={siteSettings.homepageHero?.subtitle || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: { ...v.homepageHero, subtitle: e.target.value, stats: { ...v.homepageHero?.stats } }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Yıl (Deneyim)</label>
                  <input
                    type="number"
                    value={siteSettings.homepageHero?.stats?.years || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: {
                        ...v.homepageHero,
                        stats: { ...v.homepageHero?.stats, years: Number(e.target.value) }
                      }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Yıl Etiketi</label>
                  <input
                    type="text"
                    value={siteSettings.homepageHero?.stats?.yearsLabel || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: {
                        ...v.homepageHero,
                        stats: { ...v.homepageHero?.stats, yearsLabel: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Onarılan TV Sayısı</label>
                  <input
                    type="number"
                    value={siteSettings.homepageHero?.stats?.repairedTVs || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: {
                        ...v.homepageHero,
                        stats: { ...v.homepageHero?.stats, repairedTVs: Number(e.target.value) }
                      }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Onarılan TV Etiketi</label>
                  <input
                    type="text"
                    value={siteSettings.homepageHero?.stats?.repairedTVsLabel || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: {
                        ...v.homepageHero,
                        stats: { ...v.homepageHero?.stats, repairedTVsLabel: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Destek (örn: 7/24)</label>
                  <input
                    type="text"
                    value={siteSettings.homepageHero?.stats?.support || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: {
                        ...v.homepageHero,
                        stats: { ...v.homepageHero?.stats, support: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Destek Etiketi</label>
                  <input
                    type="text"
                    value={siteSettings.homepageHero?.stats?.supportLabel || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({
                      ...v,
                      homepageHero: {
                        ...v.homepageHero,
                        stats: { ...v.homepageHero?.stats, supportLabel: e.target.value }
                      }
                    }))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <button
                onClick={saveSiteSettings}
                className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
              >
                Hero Alanını Kaydet
              </button>
            </div>

            {/* Testimonial Stats Yönetimi */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Ana Sayfa İstatistik Alanı</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Onarılan TV (Sayı)</label>
                  <input type="number" value={siteSettings.testimonialStats?.tvsCount || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, tvsCount: Number(e.target.value) } }))} className="w-full p-2 border rounded" />
                  <input type="text" value={siteSettings.testimonialStats?.tvsLabel || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, tvsLabel: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Etiket" />
                  <input type="text" value={siteSettings.testimonialStats?.tvsSub || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, tvsSub: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Alt Açıklama" />
                  <input type="text" value={siteSettings.testimonialStats?.lastModel || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, lastModel: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="En son model/metin" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ortalama Puan</label>
                  <input type="text" value={siteSettings.testimonialStats?.rating || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, rating: e.target.value } }))} className="w-full p-2 border rounded" />
                  <input type="text" value={siteSettings.testimonialStats?.ratingLabel || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, ratingLabel: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Etiket" />
                  <input type="text" value={siteSettings.testimonialStats?.ratingSub || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, ratingSub: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Alt Açıklama" />
                  <input type="text" value={siteSettings.testimonialStats?.ratingQuote || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, ratingQuote: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Örnek müşteri yorumu" />
                  <input type="text" value={siteSettings.testimonialStats?.ratingQuoteAuthor || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, ratingQuoteAuthor: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Yorum sahibi" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Başarı Oranı (%)</label>
                  <input type="number" value={siteSettings.testimonialStats?.successRate || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, successRate: Number(e.target.value) } }))} className="w-full p-2 border rounded" />
                  <input type="text" value={siteSettings.testimonialStats?.successLabel || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, successLabel: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Etiket" />
                  <input type="text" value={siteSettings.testimonialStats?.successSub || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, successSub: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Alt Açıklama" />
                  <input type="text" value={siteSettings.testimonialStats?.successQuote || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, successQuote: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Başarı oranı örnek yorumu" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Garanti Süresi (Ay)</label>
                  <input type="number" value={siteSettings.testimonialStats?.warranty || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, warranty: Number(e.target.value) } }))} className="w-full p-2 border rounded" />
                  <input type="text" value={siteSettings.testimonialStats?.warrantyLabel || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, warrantyLabel: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Etiket" />
                  <input type="text" value={siteSettings.testimonialStats?.warrantySub || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, warrantySub: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Alt Açıklama" />
                  <input type="text" value={siteSettings.testimonialStats?.warrantyQuote || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, testimonialStats: { ...v.testimonialStats, warrantyQuote: e.target.value } }))} className="w-full p-2 border rounded mt-2" placeholder="Garanti örnek yorumu" />
                </div>
              </div>
              <button
                onClick={saveSiteSettings}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                İstatistikleri Kaydet
              </button>
            </div>

            {/* Çalışma Saatleri Yönetimi */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Çalışma Saatleri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DAYS.map((day, idx) => {
                  const item = siteSettings.workingHours?.find((d: any) => d.day === day) || { day, hours: '' };
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-32 font-medium">{day}</span>
                      <input
                        type="text"
                        value={item.hours}
                        onChange={e => {
                          const updated = siteSettings.workingHours ? [...siteSettings.workingHours] : [];
                          const i = updated.findIndex((d: any) => d.day === day);
                          if (i > -1) {
                            updated[i] = { ...updated[i], hours: e.target.value };
                          } else {
                            updated.push({ day, hours: e.target.value });
                          }
                          setSiteSettings((s: any) => ({ ...s, workingHours: updated }));
                        }}
                        className="border rounded px-2 py-1 w-40"
                        placeholder="09:00 - 18:00 veya Kapalı"
                      />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={saveSiteSettings}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Çalışma Saatlerini Kaydet
              </button>
            </div>

            {/* Slider Images Yönetimi */}
            <div className="col-span-1 md:col-span-2 mt-8">
              <label className="block text-sm font-bold mb-2 text-yellow-800">Slider Fotoğrafları</label>
              <div className="flex flex-wrap gap-4 mb-4">
                {(siteSettings.homepageHero?.sliderImages || []).map((img: string, idx: number) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Slider ${idx+1}`} className="h-24 w-36 object-cover rounded shadow border" />
                    <button
                      type="button"
                      onClick={() => setSiteSettings((v: any) => ({
                        ...v,
                        homepageHero: {
                          ...v.homepageHero,
                          sliderImages: v.homepageHero.sliderImages.filter((_: string, i: number) => i !== idx)
                        }
                      }))}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                      title="Sil"
                    >
                      ×
                    </button>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => setSiteSettings((v: any) => {
                          const arr = [...v.homepageHero.sliderImages];
                          [arr[idx-1], arr[idx]] = [arr[idx], arr[idx-1]];
                          return { ...v, homepageHero: { ...v.homepageHero, sliderImages: arr } };
                        })}
                        className="absolute bottom-1 left-1 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                        title="Bir yukarı al"
                      >
                        ↑
                      </button>
                    )}
                    {idx < (siteSettings.homepageHero?.sliderImages?.length || 0) - 1 && (
                      <button
                        type="button"
                        onClick={() => setSiteSettings((v: any) => {
                          const arr = [...v.homepageHero.sliderImages];
                          [arr[idx+1], arr[idx]] = [arr[idx], arr[idx+1]];
                          return { ...v, homepageHero: { ...v.homepageHero, sliderImages: arr } };
                        })}
                        className="absolute bottom-1 right-1 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                        title="Bir aşağı al"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                {/* Dosya yükleme */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={el => (window._sliderFileInput = el)}
                  onChange={async (e: any) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setSiteSettings((v: any) => ({ ...v, _sliderUploading: true }));
                    const formData = new FormData();
                    formData.append('file', file);
                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                    const data = await res.json();
                    if (data.url) {
                      setSiteSettings((v: any) => ({
                        ...v,
                        homepageHero: {
                          ...v.homepageHero,
                          sliderImages: [...(v.homepageHero.sliderImages || []), data.url]
                        },
                        _sliderUploading: false
                      }));
                    } else {
                      alert('Yükleme başarısız: ' + (data.error || 'Bilinmeyen hata'));
                      setSiteSettings((v: any) => ({ ...v, _sliderUploading: false }));
                    }
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => (window._sliderFileInput as HTMLInputElement)?.click()}
                  disabled={siteSettings._sliderUploading}
                >
                  {siteSettings._sliderUploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
                </button>
              </div>
            </div>

            {/* Yorumlar Yönetimi */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Ana Sayfa Yorumlar (Slider) Yönetimi</h3>
              {Array.isArray(siteSettings.testimonials) && siteSettings.testimonials.length > 0 && siteSettings.testimonials.map((t, idx) => (
                <div key={idx} className="mb-6 p-4 bg-white rounded shadow flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">İsim</label>
                      <input type="text" value={t.name} onChange={e => setSiteSettings((v: any) => { const arr = [...v.testimonials]; arr[idx].name = e.target.value; return { ...v, testimonials: arr }; })} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Lokasyon</label>
                      <input type="text" value={t.location} onChange={e => setSiteSettings((v: any) => { const arr = [...v.testimonials]; arr[idx].location = e.target.value; return { ...v, testimonials: arr }; })} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Yıldız (1-5)</label>
                      <input type="number" min={1} max={5} value={t.rating} onChange={e => setSiteSettings((v: any) => { const arr = [...v.testimonials]; arr[idx].rating = Number(e.target.value); return { ...v, testimonials: arr }; })} className="w-full p-2 border rounded" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1">Yorum</label>
                      <textarea value={t.text} onChange={e => setSiteSettings((v: any) => { const arr = [...v.testimonials]; arr[idx].text = e.target.value; return { ...v, testimonials: arr }; })} className="w-full p-2 border rounded" rows={2} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Hizmet</label>
                      <input type="text" value={t.service} onChange={e => setSiteSettings((v: any) => { const arr = [...v.testimonials]; arr[idx].service = e.target.value; return { ...v, testimonials: arr }; })} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Tarih</label>
                      <input type="text" value={t.date} onChange={e => setSiteSettings((v: any) => { const arr = [...v.testimonials]; arr[idx].date = e.target.value; return { ...v, testimonials: arr }; })} className="w-full p-2 border rounded" />
                    </div>
                  </div>
                  <button onClick={() => setSiteSettings((v: any) => ({ ...v, testimonials: v.testimonials.filter((_, i) => i !== idx) }))} className="mt-2 md:mt-0 md:ml-4 bg-red-500 text-white px-3 py-1 rounded text-xs">Sil</button>
                </div>
              ))}
              {/* Yeni Yorum Ekleme Alanı */}
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2">Yeni Yorum Ekle</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" placeholder="İsim" value={newTestimonial.name} onChange={e => setNewTestimonial((v: any) => ({ ...v, name: e.target.value }))} className="p-2 border rounded" />
                  <input type="text" placeholder="Lokasyon" value={newTestimonial.location} onChange={e => setNewTestimonial((v: any) => ({ ...v, location: e.target.value }))} className="p-2 border rounded" />
                  <input type="number" min={1} max={5} placeholder="Yıldız" value={newTestimonial.rating} onChange={e => setNewTestimonial((v: any) => ({ ...v, rating: Number(e.target.value) }))} className="p-2 border rounded" />
                  <input type="text" placeholder="Hizmet" value={newTestimonial.service} onChange={e => setNewTestimonial((v: any) => ({ ...v, service: e.target.value }))} className="p-2 border rounded" />
                  <input type="text" placeholder="Tarih" value={newTestimonial.date} onChange={e => setNewTestimonial((v: any) => ({ ...v, date: e.target.value }))} className="p-2 border rounded" />
                  <textarea placeholder="Yorum" value={newTestimonial.text} onChange={e => setNewTestimonial((v: any) => ({ ...v, text: e.target.value }))} className="p-2 border rounded md:col-span-3" rows={2} />
                </div>
                <button onClick={() => {
                  if (!newTestimonial.name || !newTestimonial.text) return;
                  setSiteSettings((v: any) => ({ ...v, testimonials: [...(v.testimonials || []), newTestimonial] }));
                  setNewTestimonial({ name: '', location: '', rating: 5, text: '', service: '', date: '' });
                }} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Ekle</button>
              </div>
              <button onClick={saveSiteSettings} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Yorumları Kaydet</button>
            </div>

            {/* Model Sayfaları İstatistikleri */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-orange-800">Model Sayfaları İstatistikleri</h3>
              <p className="text-sm text-gray-600 mb-4">
                Bu istatistikler tüm marka model sayfalarında gösterilir.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Deneyim (Yıl)</label>
                  <input
                    type="number"
                    value={siteSettings.statistics?.experience || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ 
                      ...v, 
                      statistics: { 
                        ...v.statistics, 
                        experience: Number(e.target.value) 
                      } 
                    }))}
                    className="w-full p-2 border rounded"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Onarılan TV Sayısı</label>
                  <input
                    type="number"
                    value={siteSettings.statistics?.repairedTvs || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ 
                      ...v, 
                      statistics: { 
                        ...v.statistics, 
                        repairedTvs: Number(e.target.value) 
                      } 
                    }))}
                    className="w-full p-2 border rounded"
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Müşteri Memnuniyeti (%)</label>
                  <input
                    type="number"
                    value={siteSettings.statistics?.customerSatisfaction || ''}
                    onChange={(e: any) => setSiteSettings((v: any) => ({ 
                      ...v, 
                      statistics: { 
                        ...v.statistics, 
                        customerSatisfaction: Number(e.target.value) 
                      } 
                    }))}
                    className="w-full p-2 border rounded"
                    placeholder="98"
                  />
                </div>
              </div>
              <button
                onClick={saveSiteSettings}
                className="mt-4 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
              >
                Model Sayfası İstatistiklerini Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Blog Yönetimi */}
        {section === "blog" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">Blog Yönetimi</h2>
            
            {/* Yeni Blog Yazısı Ekleme */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold mb-4 text-green-800">Yeni Blog Yazısı Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Başlık</label>
                  <input
                    type="text"
                    value={newBlogPost.title}
                    onChange={(e: any) => setNewBlogPost((v: any) => ({ ...v, title: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="Blog yazısı başlığı"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Özet</label>
                  <textarea
                    value={newBlogPost.excerpt}
                    onChange={(e: any) => setNewBlogPost((v: any) => ({ ...v, excerpt: e.target.value }))}
                    className="w-full p-2 border rounded"
                    rows={2}
                    placeholder="Blog yazısı özeti"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Yazar</label>
                  <select
                    value={newBlogPost.author}
                    onChange={e => setNewBlogPost((v: any) => ({ ...v, author: e.target.value }))}
                    className="w-full p-2 border rounded mb-2"
                  >
                    {AUTHOR_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    <option value="">Diğer (elle gir)</option>
                  </select>
                  <input
                    type="text"
                    value={newBlogPost.author}
                    onChange={e => setNewBlogPost((v: any) => ({ ...v, author: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="Yazar adı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Resim Yükle</label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={handleBlogImageUpload}
                    className="w-full p-2 border rounded"
                  />
                  {uploadingImage && <div className="text-xs text-blue-600 mt-1">Yükleniyor...</div>}
                  {newBlogPost.image && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={newBlogPost.image} alt="Yüklenen görsel" className="h-24" />
                      <button
                        type="button"
                        onClick={() => setNewBlogPost((v: any) => ({ ...v, image: '' }))}
                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                      >
                        Görseli Sil
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Etiketler (virgülle ayırın)</label>
                  <input
                    type="text"
                    value={newBlogPost.tags}
                    onChange={(e: any) => setNewBlogPost((v: any) => ({ ...v, tags: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="tv tamiri, ekran değişimi, servis"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">İçerik</label>
                  <textarea
                    value={newBlogPost.content}
                    onChange={(e: any) => setNewBlogPost((v: any) => ({ ...v, content: e.target.value }))}
                    className="w-full p-2 border rounded"
                    rows={6}
                    placeholder="Blog yazısı içeriği..."
                  />
                </div>
              </div>
              <button
                onClick={addBlogPost}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Blog Yazısı Ekle
              </button>
            </div>

            {/* Blog Yazıları Listesi */}
            <div>
              <h3 className="text-lg font-bold mb-4">Mevcut Blog Yazıları</h3>
              {loadingBlog ? (
                <div>Yükleniyor...</div>
              ) : blogPosts.length === 0 ? (
                <div>Blog yazısı bulunamadı.</div>
              ) : (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="border rounded p-4 bg-white">
                      {editingBlogPost && editingBlogPost.id === post.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editingBlogPost.title}
                            onChange={(e: any) => setEditingBlogPost((v: any) => ({ ...v, title: e.target.value }))}
                            className="w-full p-2 border rounded font-semibold"
                          />
                          <textarea
                            value={editingBlogPost.excerpt}
                            onChange={(e: any) => setEditingBlogPost((v: any) => ({ ...v, excerpt: e.target.value }))}
                            className="w-full p-2 border rounded"
                            rows={2}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingBlogPost.author}
                              onChange={(e: any) => setEditingBlogPost((v: any) => ({ ...v, author: e.target.value }))}
                              className="w-full p-2 border rounded"
                              placeholder="Yazar"
                            />
                            {/* Görsel yükleme alanı */}
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e: any) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  setUploadingImage(true);
                                  const formData = new FormData();
                                  formData.append('file', file);
                                  const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData
                                  });
                                  const data = await res.json();
                                  setEditingBlogPost((v: any) => ({ ...v, image: data.url }));
                                  setUploadingImage(false);
                                }}
                                className="w-full p-2 border rounded"
                              />
                              {uploadingImage && <div className="text-xs text-blue-600 mt-1">Yükleniyor...</div>}
                              {editingBlogPost.image && (
                                <div className="mt-2 flex items-center gap-2">
                                  <img src={editingBlogPost.image} alt="Yüklenen görsel" className="h-24" />
                                  <button
                                    type="button"
                                    onClick={() => setEditingBlogPost((v: any) => ({ ...v, image: '' }))}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                                  >
                                    Görseli Sil
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <textarea
                            value={editingBlogPost.content}
                            onChange={(e: any) => setEditingBlogPost((v: any) => ({ ...v, content: e.target.value }))}
                            className="w-full p-2 border rounded"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={updateBlogPost}
                              className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                              Kaydet
                            </button>
                            <button
                              onClick={() => setEditingBlogPost(null)}
                              className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{post.title}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingBlogPost(post)}
                                className="text-blue-600 text-sm underline"
                              >
                                Düzenle
                              </button>
                              <button
                                onClick={() => deleteBlogPost(post.id)}
                                className="text-red-600 text-sm underline"
                              >
                                Sil
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{post.excerpt}</p>
                          <div className="text-sm text-gray-500">
                            <span>Yazar: {post.author}</span>
                            <span className="mx-2">•</span>
                            <span>Tarih: {post.date}</span>
                            {post.tags && post.tags.length > 0 && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Etiketler: {post.tags.join(', ')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SSS Yönetimi */}
        {section === "faq" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">Sıkça Sorulan Sorular (SSS) Yönetimi</h2>
            {/* Yeni SSS Ekleme */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold mb-4 text-green-800">Yeni SSS Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Soru</label>
                  <input
                    type="text"
                    value={newFaq.question}
                    onChange={e => setNewFaq(v => ({ ...v, question: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="Soru girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cevap</label>
                  <textarea
                    value={newFaq.answer}
                    onChange={e => setNewFaq(v => ({ ...v, answer: e.target.value }))}
                    className="w-full p-2 border rounded"
                    rows={2}
                    placeholder="Cevap girin"
                  />
                </div>
              </div>
              <button
                onClick={addFaq}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                SSS Ekle
              </button>
            </div>
            {/* SSS Listesi */}
            <div>
              <h3 className="text-lg font-bold mb-4">Mevcut SSS'ler</h3>
              {loadingFaqs ? (
                <div>Yükleniyor...</div>
              ) : faqs.length === 0 ? (
                <div>SSS bulunamadı.</div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border rounded p-4 bg-white">
                      {editingFaq && editingFaq.id === faq.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingFaq.question}
                            onChange={e => setEditingFaq(v => ({ ...v, question: e.target.value }))}
                            className="w-full p-2 border rounded"
                          />
                          <textarea
                            value={editingFaq.answer}
                            onChange={e => setEditingFaq(v => ({ ...v, answer: e.target.value }))}
                            className="w-full p-2 border rounded"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={updateFaq}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Kaydet
                            </button>
                            <button
                              onClick={() => setEditingFaq(null)}
                              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                            >
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{faq.question}</h4>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingFaq(faq)}
                                className="text-blue-600 text-sm underline"
                              >
                                Düzenle
                              </button>
                              <button
                                onClick={() => deleteFaq(faq.id)}
                                className="text-red-600 text-sm underline"
                              >
                                Sil
                              </button>
                            </div>
                          </div>
                          <div className="text-gray-700">{faq.answer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {section === "services" && (
          <ServicesAdmin />
        )}
        {section === "admin2-user" && (
          <Admin2UserPage />
        )}
        {section === "screen-types" && <ScreenTypesAdmin />}
        {section === "about" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold mb-4">Hakkımızda Yönetimi</h2>
            
            {/* İstatistikler Yönetimi */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold mb-4 text-green-800">Hakkımızda Sayfası İstatistikleri</h3>
              <div className="space-y-4">
                {Array.isArray(siteSettings.about?.stats) && siteSettings.about.stats.map((stat: any, idx: number) => (
                  <div key={idx} className="bg-white p-4 rounded border shadow">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        className="flex-1 p-2 border rounded" 
                        placeholder="Sayı (örn: 10+)" 
                        value={stat.number} 
                        onChange={e => setSiteSettings((v: any) => {
                          const arr = [...v.about.stats];
                          arr[idx].number = e.target.value;
                          return { ...v, about: { ...v.about, stats: arr } };
                        })}
                      />
                      <input 
                        type="text" 
                        className="flex-1 p-2 border rounded" 
                        placeholder="Açıklama (örn: Yıllık Deneyim)" 
                        value={stat.label} 
                        onChange={e => setSiteSettings((v: any) => {
                          const arr = [...v.about.stats];
                          arr[idx].label = e.target.value;
                          return { ...v, about: { ...v.about, stats: arr } };
                        })}
                      />
                      <button 
                        onClick={() => setSiteSettings((v: any) => ({ 
                          ...v, 
                          about: { 
                            ...v.about, 
                            stats: v.about.stats.filter((_: any, i: number) => i !== idx) 
                          } 
                        }))} 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <input 
                  type="text" 
                  className="flex-1 p-2 border rounded" 
                  placeholder="Yeni İstatistik Sayısı (örn: 15+)" 
                  value={newStat.number || ''} 
                  onChange={e => setNewStat((v: any) => ({ ...v, number: e.target.value }))}
                />
                <input 
                  type="text" 
                  className="flex-1 p-2 border rounded" 
                  placeholder="Yeni İstatistik Açıklaması" 
                  value={newStat.label || ''} 
                  onChange={e => setNewStat((v: any) => ({ ...v, label: e.target.value }))}
                />
                <button 
                  onClick={() => {
                    if (!newStat.number || !newStat.label) return;
                    setSiteSettings((v: any) => ({ 
                      ...v, 
                      about: { 
                        ...v.about, 
                        stats: [...(v.about.stats || []), newStat] 
                      } 
                    }));
                    setNewStat({ number: '', label: '' });
                  }} 
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Ekle
                </button>
              </div>
              <button onClick={saveSiteSettings} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">İstatistikleri Kaydet</button>
            </div>

            {/* Değerlerimiz Yönetimi */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Değerlerimiz</h3>
              <input type="text" className="w-full p-2 border rounded mb-2" placeholder="Başlık" value={siteSettings.about?.valuesTitle || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, valuesTitle: e.target.value } }))} />
              <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Alt Başlık" value={siteSettings.about?.valuesSubtitle || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, valuesSubtitle: e.target.value } }))} />
              {Array.isArray(siteSettings.about?.values) && siteSettings.about.values.map((val, idx) => (
                <div key={idx} className="mb-4 p-3 bg-white rounded shadow flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <input type="text" className="w-full md:w-1/3 p-2 border rounded mb-2 md:mb-0" placeholder="Başlık" value={val.title} onChange={e => setSiteSettings((v: any) => { const arr = [...v.about.values]; arr[idx].title = e.target.value; return { ...v, about: { ...v.about, values: arr } }; })} />
                  <textarea className="w-full md:w-2/3 p-2 border rounded" placeholder="Açıklama" value={val.description} onChange={e => setSiteSettings((v: any) => { const arr = [...v.about.values]; arr[idx].description = e.target.value; return { ...v, about: { ...v.about, values: arr } }; })} rows={2} />
                  <button onClick={() => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, values: v.about.values.filter((_: any, i: any) => i !== idx) } }))} className="bg-red-500 text-white px-3 py-1 rounded text-xs mt-2 md:mt-0">Sil</button>
                </div>
              ))}
              <div className="flex gap-2 mb-2">
                <input type="text" className="flex-1 p-2 border rounded" placeholder="Yeni Değer Başlığı" value={newValue.title} onChange={e => setNewValue((v: any) => ({ ...v, title: e.target.value }))} />
                <input type="text" className="flex-1 p-2 border rounded" placeholder="Yeni Değer Açıklaması" value={newValue.description} onChange={e => setNewValue((v: any) => ({ ...v, description: e.target.value }))} />
                <button onClick={() => {
                  if (!newValue.title || !newValue.description) return;
                  setSiteSettings((v: any) => ({ ...v, about: { ...v.about, values: [...(v.about.values || []), newValue] } }));
                  setNewValue({ title: '', description: '' });
                }} className="bg-blue-600 text-white px-4 py-2 rounded">Ekle</button>
              </div>
              <button onClick={saveSiteSettings} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Değerleri Kaydet</button>
            </div>
            {/* Hikayemiz Yönetimi */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Hikayemiz</h3>
              <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Başlık" value={siteSettings.about?.storyTitle || ''} onChange={e => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, storyTitle: e.target.value } }))} />
              {Array.isArray(siteSettings.about?.story) && siteSettings.about.story.map((p, idx) => (
                <div key={idx} className="mb-2 flex gap-2 items-start">
                  <textarea className="flex-1 p-2 border rounded" placeholder="Paragraf" value={p} onChange={e => setSiteSettings((v: any) => { const arr = [...v.about.story]; arr[idx] = e.target.value; return { ...v, about: { ...v.about, story: arr } }; })} rows={2} />
                  <button onClick={() => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, story: v.about.story.filter((_: any, i: any) => i !== idx) } }))} className="bg-red-500 text-white px-3 py-1 rounded text-xs">Sil</button>
                </div>
              ))}
              <div className="flex gap-2 mb-2">
                <textarea className="flex-1 p-2 border rounded" placeholder="Yeni Paragraf" value={newStory} onChange={e => setNewStory(e.target.value)} rows={2} />
                <button onClick={() => {
                  if (!newStory) return;
                  setSiteSettings((v: any) => ({ ...v, about: { ...v.about, story: [...(v.about.story || []), newStory] } }));
                  setNewStory('');
                }} className="bg-blue-600 text-white px-4 py-2 rounded">Ekle</button>
              </div>
              <button onClick={saveSiteSettings} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Hikayeyi Kaydet</button>
            </div>

            {/* Sertifikalar & Yeterlilikler Yönetimi */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-purple-800">Sertifikalar & Yeterlilikler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlık</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    placeholder="Sertifikalar & Yeterlilikler" 
                    value={siteSettings.about?.certifications?.title || ''} 
                    onChange={e => setSiteSettings((v: any) => ({ 
                      ...v, 
                      about: { 
                        ...v.about, 
                        certifications: { 
                          ...v.about?.certifications, 
                          title: e.target.value 
                        } 
                      } 
                    }))} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Alt Başlık</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    placeholder="Profesyonelliğe olan bağlılığımız" 
                    value={siteSettings.about?.certifications?.subtitle || ''} 
                    onChange={e => setSiteSettings((v: any) => ({ 
                      ...v, 
                      about: { 
                        ...v.about, 
                        certifications: { 
                          ...v.about?.certifications, 
                          subtitle: e.target.value 
                        } 
                      } 
                    }))} 
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Açıklama Metni</label>
                <textarea 
                  className="w-full p-2 border rounded" 
                  rows={3}
                  placeholder="Tüm teknisyenlerimiz, en güncel TV teknolojileri ve tamir teknikleri konusunda sürekli eğitim almaktadır." 
                  value={siteSettings.about?.certifications?.description || ''} 
                  onChange={e => setSiteSettings((v: any) => ({ 
                    ...v, 
                    about: { 
                      ...v.about, 
                      certifications: { 
                        ...v.about?.certifications, 
                        description: e.target.value 
                      } 
                    } 
                  }))} 
                />
              </div>

              <div className="space-y-2 mb-4">
                <label className="block text-sm font-medium mb-2">Sertifikalar Listesi</label>
                {Array.isArray(siteSettings.about?.certifications?.items) && siteSettings.about.certifications.items.length > 0 ? (
                  siteSettings.about.certifications.items.map((cert: string, idx: number) => (
                    <div key={idx} className="bg-white p-3 rounded border shadow flex items-center gap-2">
                      <input 
                        type="text" 
                        className="flex-1 p-2 border rounded" 
                        placeholder="Sertifika adı"
                        value={cert} 
                        onChange={e => setSiteSettings((v: any) => {
                          const arr = [...(v.about?.certifications?.items || [])];
                          arr[idx] = e.target.value;
                          return { 
                            ...v, 
                            about: { 
                              ...v.about, 
                              certifications: { 
                                ...v.about?.certifications, 
                                items: arr 
                              } 
                            } 
                          };
                        })}
                      />
                      <button 
                        onClick={() => setSiteSettings((v: any) => ({ 
                          ...v, 
                          about: { 
                            ...v.about, 
                            certifications: { 
                              ...v.about?.certifications, 
                              items: (v.about?.certifications?.items || []).filter((_: string, i: number) => i !== idx) 
                            } 
                          } 
                        }))} 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                      >
                        Sil
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-100 p-4 rounded border text-center">
                    <p className="text-gray-600 mb-3">Henüz sertifika eklenmemiş.</p>
                    <button 
                      onClick={() => setSiteSettings((v: any) => ({ 
                        ...v, 
                        about: { 
                          ...v.about, 
                          certifications: { 
                            ...v.about?.certifications, 
                            items: [
                              'Sertifikalı Elektronik Teknisyeni (CET)',
                              'Samsung Yetkili Servis Ortağı',
                              'LG Profesyonel Servis Sertifikası',
                              'Sony Teknik Eğitim Sertifikası',
                              'ISO 9001 Kalite Yönetimi'
                            ]
                          } 
                        } 
                      }))} 
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      Varsayılan Sertifikaları Ekle
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  className="flex-1 p-2 border rounded" 
                  placeholder="Yeni sertifika ekle (örn: Sertifikalı Elektronik Teknisyeni (CET))" 
                  value={newCertification} 
                  onChange={e => setNewCertification(e.target.value)}
                />
                <button 
                  onClick={() => {
                    if (!newCertification.trim()) return;
                    setSiteSettings((v: any) => ({ 
                      ...v, 
                      about: { 
                        ...v.about, 
                        certifications: { 
                          ...v.about?.certifications, 
                          items: [...(v.about?.certifications?.items || []), newCertification.trim()] 
                        } 
                      } 
                    }));
                    setNewCertification('');
                  }} 
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Ekle
                </button>
              </div>
              
              <button onClick={saveSiteSettings} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                Sertifikaları Kaydet
              </button>
            </div>

            {/* Hakkımızda Fotoğrafı */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Hakkımızda Fotoğrafı</h3>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e: any) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      });
                      const data = await res.json();
                      setSiteSettings((v: any) => ({ ...v, about: { ...v.about, image: data.url } }));
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Veya görsel URL'si girin"
                    value={siteSettings.about?.image || ''}
                    onChange={e => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, image: e.target.value } }))}
                  />
                  <label className="block text-sm font-medium mb-2 mt-4">Ekip Fotoğrafı (Yatay, büyük boyutlu)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e: any) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      });
                      const data = await res.json();
                      setSiteSettings((v: any) => ({ ...v, about: { ...v.about, teamImage: data.url } }));
                    }}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Veya ekip fotoğrafı URL'si girin"
                    value={siteSettings.about?.teamImage || ''}
                    onChange={e => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, teamImage: e.target.value } }))}
                  />
                  <label className="block text-sm font-medium mb-2 mt-4">Ekip Açıklama Metni</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={5}
                    placeholder="Ekip açıklama metni (ör: isimler, unvanlar, uzmanlıklar)"
                    value={siteSettings.about?.teamText || ''}
                    onChange={e => setSiteSettings((v: any) => ({ ...v, about: { ...v.about, teamText: e.target.value } }))}
                  />
                </div>
                <div className="flex flex-col gap-4 items-center">
                  {siteSettings.about?.image && (
                    <img src={siteSettings.about.image} alt="Hakkımızda Fotoğrafı" className="h-40 rounded shadow" />
                  )}
                  {siteSettings.about?.teamImage && (
                    <div className="relative w-80 h-40 rounded shadow overflow-hidden">
                      <img src={siteSettings.about.teamImage} alt="Ekip Fotoğrafı" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-2">
                        <div className="text-white text-xs font-bold drop-shadow-lg whitespace-pre-line text-center">
                          {siteSettings.about.teamText}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={saveSiteSettings} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Fotoğrafları ve Metni Kaydet</button>
            </div>
          </div>
        )}
        
        {/* Yorum Yönetimi Bölümü */}
        {section === "testimonials" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Yorum Yönetimi</h2>
            
            {/* Yeni Yorum Ekleme */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-bold mb-4 text-purple-800">Yeni Yorum Ekle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Müşteri Adı"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Konum (örn: Kadıköy, İstanbul)"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newTestimonial.location}
                  onChange={(e) => setNewTestimonial({...newTestimonial, location: e.target.value})}
                />
                <select
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Yıldız)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Yıldız)</option>
                  <option value={3}>⭐⭐⭐ (3 Yıldız)</option>
                  <option value={2}>⭐⭐ (2 Yıldız)</option>
                  <option value={1}>⭐ (1 Yıldız)</option>
                </select>
                <input
                  type="text"
                  placeholder="Hizmet Türü (örn: Samsung TV Ekran Tamiri)"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newTestimonial.service}
                  onChange={(e) => setNewTestimonial({...newTestimonial, service: e.target.value})}
                />
                <input
                  type="date"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newTestimonial.date}
                  onChange={(e) => setNewTestimonial({...newTestimonial, date: e.target.value})}
                />
              </div>
              <textarea
                placeholder="Yorum metni..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={4}
                value={newTestimonial.text}
                onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})}
              />
              <button
                onClick={async () => {
                  if (!newTestimonial.name || !newTestimonial.text) {
                    alert('İsim ve yorum metni zorunludur!');
                    return;
                  }
                  
                  try {
                    const response = await fetch('/api/testimonials', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        ...newTestimonial,
                        comment: newTestimonial.text, // comment ve text alanlarını eşitle
                        id: Date.now().toString(),
                        verified: true
                      })
                    });
                    
                    if (response.ok) {
                      alert('Yorum başarıyla eklendi!');
                      setNewTestimonial({ name: '', location: '', rating: 5, text: '', service: '', date: '' });
                      window.location.reload();
                    } else {
                      alert('Yorum eklenirken hata oluştu!');
                    }
                  } catch (error) {
                    alert('Bir hata oluştu!');
                  }
                }}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Yorumu Ekle
              </button>
            </div>

            {/* Mevcut Yorumlar */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900">Mevcut Yorumlar</h3>
              </div>
              <TestimonialsAdmin />
            </div>
          </div>
        )}
        
        {section === "admin2-log" && <Admin2LogPage />}
        {section === "messages" && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">İletişim Mesajları</h2>
            <MessagesAdmin />
          </div>
        )}
      </div>
      {/* Açıklama Modalı */}
      {descModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <h3 className="text-lg font-bold mb-4">Başvuru Açıklaması</h3>
            <div className="text-gray-800 whitespace-pre-line break-words mb-6" style={{maxHeight: '300px', overflowY: 'auto'}}>{descModal.text}</div>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl" onClick={() => setDescModal({open: false, text: ''})}>&times;</button>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setDescModal({open: false, text: ''})}>Kapat</button>
          </div>
        </div>
      )}
      {descModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setDescModal({open: false, text: ''})}>&times;</button>
            <h3 className="text-xl font-bold mb-4">Detay</h3>
            <div className="p-3 bg-gray-50 rounded border text-gray-800 whitespace-pre-line">{descModal.text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

// --- Hizmetler Yönetimi Bileşeni ---
function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [newService, setNewService] = useState<any>({ title: '', description: '', features: [''], price: '', priceRange: '', icon: '', image: '', href: '', popular: false });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  const saveServices = async (updated: any[]) => {
    setLoading(true);
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    
    // Fiyatları senkronize et - prices.json'ı da güncelle
    try {
      const pricesRes = await fetch('/api/prices');
      const prices = await pricesRes.json();
      
      // Hizmet fiyatlarını prices.json'a yansıt
      updated.forEach(service => {
        // Önceden tanımlı hizmetler için özel mapping
        switch (service.title) {
          case 'TV Ekran Değişimi':
            if (service.priceRange && service.priceRange.includes('₺')) {
              const match = service.priceRange.match(/₺([0-9,]+)/);
              if (match) {
                prices.screenReplacement = match[1].replace(/,/g, '');
              }
            }
            break;
          case 'LED Panel & Arka Aydınlatma Tamiri':
            if (service.priceRange) {
              prices.ledRepairRange = service.priceRange;
            }
            break;
          case 'Anakart & Logic Board Tamiri':
            if (service.priceRange) {
              prices.motherboardRepairRange = service.priceRange;
            }
            break;
          case 'Genel TV Tamiri':
            if (service.priceRange) {
              prices.generalQuoteRange = service.priceRange;
            }
            break;
          default:
            // Yeni hizmetler için dinamik mapping
            if (service.priceRange) {
              // Hizmet adından key oluştur
              const serviceKey = service.title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '')
                .replace(/tamiri|tamir|değişimi|değişim|onarımı|onarım/g, '')
                .trim();
              
              // Fiyat aralığını kaydet
              prices[`${serviceKey}Range`] = service.priceRange;
              
              // Tek fiyat varsa onu da kaydet
              if (service.price && service.price !== 'Fiyat için teklif alın') {
                const priceMatch = service.price.match(/₺([0-9,]+)/);
                if (priceMatch) {
                  prices[serviceKey] = priceMatch[1].replace(/,/g, '');
                }
              }
            }
            break;
        }
      });
      
      // Güncellenmiş fiyatları kaydet
      await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prices)
      });
    } catch (error) {
      console.error('Fiyat senkronizasyonu hatası:', error);
    }
    
    setServices(updated);
    setLoading(false);
  };

  const handleEdit = (idx: number) => setEditing({ ...services[idx], idx });
  const handleDelete = async (idx: number) => {
    if (!window.confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;
    const updated = services.filter((_, i) => i !== idx);
    await saveServices(updated);
  };
  const handleSaveEdit = async () => {
    const updated = [...services];
    updated[editing.idx] = { ...editing };
    delete updated[editing.idx].idx;
    setEditing(null);
    await saveServices(updated);
  };
  const handleAdd = async () => {
    if (!newService.title.trim()) return alert('Başlık gerekli');
    const updated = [...services, { ...newService, id: Date.now().toString() }];
    setNewService({ title: '', description: '', features: [''], price: '', priceRange: '', icon: '', image: '', href: '', popular: false });
    await saveServices(updated);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Ana Sayfa Hizmetler Yönetimi</h2>
      {loading ? <div>Yükleniyor...</div> : (
        <>
          {/* Yeni Hizmet Ekle */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold mb-4 text-green-800">Yeni Hizmet Ekle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input type="text" value={newService.title} onChange={e => setNewService((v: any) => ({ ...v, title: e.target.value }))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <input type="text" value={newService.description} onChange={e => setNewService((v: any) => ({ ...v, description: e.target.value }))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fiyat</label>
                <input type="text" value={newService.price} onChange={e => setNewService((v: any) => ({ ...v, price: e.target.value }))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fiyat Aralığı</label>
                <input type="text" value={newService.priceRange} onChange={e => setNewService((v: any) => ({ ...v, priceRange: e.target.value }))} className="w-full p-2 border rounded" placeholder="₺1000 - ₺2000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">İkon (Lucide adı veya emoji)</label>
                <input type="text" value={newService.icon} onChange={e => setNewService((v: any) => ({ ...v, icon: e.target.value }))} className="w-full p-2 border rounded" placeholder="Monitor veya 🖥️" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Görsel (Opsiyonel)</label>
                <input type="file" accept="image/*" onChange={async (e: any) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploadingImage(true);
                  const formData = new FormData();
                  formData.append('file', file);
                  const res = await fetch('/api/upload', { method: 'POST', body: formData });
                  const data = await res.json();
                  setNewService((v: any) => ({ ...v, image: data.url }));
                  setUploadingImage(false);
                }} className="w-full p-2 border rounded" />
                {uploadingImage && <div className="text-xs text-blue-600 mt-1">Yükleniyor...</div>}
                {newService.image && <img src={newService.image} alt="" className="h-12 mt-2" />}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Özellikler</label>
                {newService.features.map((f: string, idx: number) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input type="text" value={f} onChange={e => setNewService((v: any) => {
                      const arr = [...v.features]; arr[idx] = e.target.value; return { ...v, features: arr };
                    })} className="w-full p-2 border rounded" placeholder={`Özellik #${idx+1}`} />
                    <button type="button" onClick={() => setNewService((v: any) => ({ ...v, features: v.features.filter((_: any, i: number) => i !== idx) }))} className="bg-red-500 text-white px-2 rounded">Sil</button>
                  </div>
                ))}
                <button type="button" onClick={() => setNewService((v: any) => ({ ...v, features: [...v.features, ''] }))} className="bg-blue-600 text-white px-4 py-1 rounded mt-2">Özellik Ekle</button>
              </div>
              <div className="flex items-center mt-6">
                <input type="checkbox" id="popular" checked={newService.popular} onChange={e => setNewService((v: any) => ({ ...v, popular: e.target.checked }))} className="mr-2" />
                <label htmlFor="popular" className="text-sm font-medium">Popüler</label>
              </div>
            </div>
            <button onClick={handleAdd} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Hizmet Ekle</button>
          </div>

          {/* Mevcut Hizmetler */}
          <div>
            <h3 className="text-lg font-bold mb-4">Mevcut Hizmetler</h3>
            {services.length === 0 ? <div>Hizmet bulunamadı.</div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, idx) => (
                  <div key={service.id || idx} className="border rounded p-4 bg-white">
                    {editing && editing.idx === idx ? (
                      <div className="space-y-2">
                        <input type="text" value={editing.title} onChange={e => setEditing((v: any) => ({ ...v, title: e.target.value }))} className="w-full p-2 border rounded" />
                        <input type="text" value={editing.description} onChange={e => setEditing((v: any) => ({ ...v, description: e.target.value }))} className="w-full p-2 border rounded" />
                        <input type="text" value={editing.price} onChange={e => setEditing((v: any) => ({ ...v, price: e.target.value }))} className="w-full p-2 border rounded" />
                        <input type="text" value={editing.priceRange} onChange={e => setEditing((v: any) => ({ ...v, priceRange: e.target.value }))} className="w-full p-2 border rounded" placeholder="₺1000 - ₺2000" />
                        <input type="text" value={editing.icon} onChange={e => setEditing((v: any) => ({ ...v, icon: e.target.value }))} className="w-full p-2 border rounded" />
                        <div className="flex gap-2 items-center">
                          <input type="text" value={editing.image} onChange={e => setEditing((v: any) => ({ ...v, image: e.target.value }))} className="w-full p-2 border rounded" />
                          <input type="file" accept="image/*" onChange={async (e: any) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setUploadingImage(true);
                            const formData = new FormData();
                            formData.append('file', file);
                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                            const data = await res.json();
                            setEditing((v: any) => ({ ...v, image: data.url }));
                            setUploadingImage(false);
                          }} />
                          {uploadingImage && <div className="text-xs text-blue-600 ml-2">Yükleniyor...</div>}
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Özellikler</label>
                          {editing.features.map((f: string, fidx: number) => (
                            <div key={fidx} className="flex gap-2 mb-2">
                              <input type="text" value={f} onChange={e => setEditing((v: any) => {
                                const arr = [...v.features]; arr[fidx] = e.target.value; return { ...v, features: arr };
                              })} className="w-full p-2 border rounded" />
                              <button type="button" onClick={() => setEditing((v: any) => ({ ...v, features: v.features.filter((_: any, i: number) => i !== fidx) }))} className="bg-red-500 text-white px-2 rounded">Sil</button>
                            </div>
                          ))}
                          <button type="button" onClick={() => setEditing((v: any) => ({ ...v, features: [...v.features, ''] }))} className="bg-blue-600 text-white px-4 py-1 rounded mt-2">Özellik Ekle</button>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleSaveEdit} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Kaydet</button>
                          <button onClick={() => setEditing(null)} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">İptal</button>
                        </div>
                        <div className="flex items-center mt-2">
                          <input type="checkbox" id={`popular-edit-${editing.idx}`} checked={!!editing.popular} onChange={e => setEditing((v: any) => ({ ...v, popular: e.target.checked }))} className="mr-2" />
                          <label htmlFor={`popular-edit-${editing.idx}`} className="text-sm font-medium">Popüler</label>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{service.title}</h4>
                          <div className="flex gap-1">
                            <button onClick={() => handleEdit(idx)} className="text-blue-600 text-sm underline">Düzenle</button>
                            <button onClick={() => handleDelete(idx)} className="text-red-600 text-sm underline">Sil</button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{service.description}</div>
                        <div className="text-sm text-blue-700 mb-2">{service.price}</div>
                        <div className="text-xs text-gray-500 mb-2">{service.features && service.features.join(', ')}</div>
                        {service.image && <img src={service.image} alt="" className="h-12 mt-2" />}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// --- Ekran Tipleri Yönetimi Bileşeni ---
function ScreenTypesAdmin() {
  const [screenTypes, setScreenTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [newType, setNewType] = useState<any>({ name: '', description: '', priceRange: '' });

  useEffect(() => {
    fetch('/api/services/screen-types')
      .then(res => res.json())
      .then(data => {
        setScreenTypes(data);
        setLoading(false);
      });
  }, []);

  const saveScreenTypes = async (updated: any[]) => {
    setLoading(true);
    await fetch('/api/services/screen-types', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    setScreenTypes(updated);
    setLoading(false);
  };

  const handleEdit = (idx: number) => setEditing({ ...screenTypes[idx], idx });
  const handleDelete = async (idx: number) => {
    if (!window.confirm('Bu ekran tipini silmek istediğinizden emin misiniz?')) return;
    const updated = screenTypes.filter((_: any, i: number) => i !== idx);
    await saveScreenTypes(updated);
  };
  const handleSaveEdit = async () => {
    const updated = [...screenTypes];
    updated[editing.idx] = { ...editing };
    delete updated[editing.idx].idx;
    setEditing(null);
    await saveScreenTypes(updated);
  };
  const handleAdd = async () => {
    if (!newType.name.trim()) return alert('Ekran tipi adı gerekli');
    const updated = [...screenTypes, { ...newType, id: Date.now().toString() }];
    setNewType({ name: '', description: '', priceRange: '' });
    await saveScreenTypes(updated);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Ekran Tipleri Yönetimi</h2>
      {loading ? <div>Yükleniyor...</div> : (
        <>
          {/* Yeni Ekran Tipi Ekle */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold mb-4 text-green-800">Yeni Ekran Tipi Ekle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Adı</label>
                <input type="text" value={newType.name} onChange={e => setNewType((v: any) => ({ ...v, name: e.target.value }))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <input type="text" value={newType.description} onChange={e => setNewType((v: any) => ({ ...v, description: e.target.value }))} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fiyat Aralığı</label>
                <input type="text" value={newType.priceRange} onChange={e => setNewType((v: any) => ({ ...v, priceRange: e.target.value }))} className="w-full p-2 border rounded" placeholder="₺1000 - ₺2000" />
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Ekle
            </button>
          </div>

          {/* Ekran Tipleri Listesi */}
          <div>
            <h3 className="text-lg font-bold mb-4">Mevcut Ekran Tipleri</h3>
            {screenTypes.length === 0 ? (
              <div>Ekran tipi bulunamadı.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {screenTypes.map((type, index) => (
                  <div key={type.id || index} className="border rounded p-4 bg-white">
                    {editing && editing.idx === index ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editing.name}
                          onChange={e => setEditing((v: any) => ({ ...v, name: e.target.value }))}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="text"
                          value={editing.description}
                          onChange={e => setEditing((v: any) => ({ ...v, description: e.target.value }))}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="text"
                          value={editing.priceRange}
                          onChange={e => setEditing((v: any) => ({ ...v, priceRange: e.target.value }))}
                          className="w-full p-2 border rounded"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Kaydet
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{type.name}</h4>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600 text-sm underline"
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-600 text-sm underline"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{type.description}</div>
                        <div className="text-sm text-blue-600">{type.priceRange}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// --- 2. Admin Paneli Logları ---
function Admin2LogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin2-log')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      });
  }, []);

  const deleteLog = async (timestamp: string) => {
    if (!window.confirm('Bu log kaydını silmek istediğinize emin misiniz?')) return;
    await fetch('/api/admin2-log', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp }),
    });
    setLogs(logs => logs.filter(log => log.timestamp !== timestamp));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">2. Admin Paneli Logları</h2>
      {loading ? <div>Yükleniyor...</div> : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Tarih</th>
                <th className="border px-2 py-1">Kullanıcı</th>
                <th className="border px-2 py-1">Aksiyon</th>
                <th className="border px-2 py-1">Detay</th>
                <th className="border px-2 py-1">Sil</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="border px-2 py-1">{log.user}</td>
                  <td className="border px-2 py-1">{log.action}</td>
                  <td className="border px-2 py-1">
                    <pre className="whitespace-pre-wrap break-all text-xs bg-gray-50 p-2 rounded max-w-xs overflow-x-auto">{JSON.stringify(log.details, null, 2)}</pre>
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <button className="text-xs text-red-600 underline" onClick={() => deleteLog(log.timestamp)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// En sona ekle:
function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => { setMessages(data); setLoading(false); });
  }, []);
  if (loading) return <div>Yükleniyor...</div>;
  if (messages.length === 0) return <div>Mesaj yok.</div>;
  return (
    <div>
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
                  onClick={async () => {
                    await fetch('/api/messages', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: msg.id, read: !msg.read })
                    });
                    setMessages((prev) => prev.map(m => m.id === msg.id ? { ...m, read: !m.read } : m));
                  }}
                >
                  {msg.read ? "Yeniden işaretle" : "Okundu yap"}
                </button>
              </td>
              <td className="border p-2 whitespace-nowrap">
                <button
                  className="text-xs text-red-600 underline"
                  onClick={async () => {
                    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;
                    await fetch('/api/messages', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: msg.id })
                    });
                    setMessages((prev) => prev.filter(m => m.id !== msg.id));
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
  );
}

// Testimonials Admin Bileşeni
function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<{open: boolean, testimonial: any}>({open: false, testimonial: null});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (response.ok) {
        alert('Yorum silindi!');
        fetchTestimonials();
      } else {
        alert('Yorum silinirken hata oluştu!');
      }
    } catch (error) {
      alert('Bir hata oluştu!');
    }
  };

  const updateTestimonial = async (updatedTestimonial: any) => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTestimonial)
      });
      
      if (response.ok) {
        alert('Yorum güncellendi!');
        setEditModal({open: false, testimonial: null});
        fetchTestimonials();
      } else {
        alert('Yorum güncellenirken hata oluştu!');
      }
    } catch (error) {
      alert('Bir hata oluştu!');
    }
  };

  if (loading) return <div className="p-6 text-center">Yorumlar yükleniyor...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">İsim</th>
            <th className="border border-gray-300 p-3 text-left">Konum</th>
            <th className="border border-gray-300 p-3 text-left">Puan</th>
            <th className="border border-gray-300 p-3 text-left">Hizmet</th>
            <th className="border border-gray-300 p-3 text-left">Yorum</th>
            <th className="border border-gray-300 p-3 text-left">Tarih</th>
            <th className="border border-gray-300 p-3 text-left">Durum</th>
            <th className="border border-gray-300 p-3 text-left">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial: any) => (
            <tr key={testimonial.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{testimonial.name}</td>
              <td className="border border-gray-300 p-3">{testimonial.location}</td>
              <td className="border border-gray-300 p-3">
                <div className="flex items-center">
                  {'⭐'.repeat(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating})</span>
                </div>
              </td>
              <td className="border border-gray-300 p-3 max-w-xs">
                <div className="truncate" title={testimonial.service}>
                  {testimonial.service}
                </div>
              </td>
              <td className="border border-gray-300 p-3 max-w-xs">
                <div className="truncate" title={testimonial.comment || testimonial.text}>
                  {testimonial.comment || testimonial.text}
                </div>
              </td>
              <td className="border border-gray-300 p-3">{testimonial.date}</td>
              <td className="border border-gray-300 p-3">
                <span className={`px-2 py-1 rounded text-xs ${testimonial.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {testimonial.verified ? 'Onaylandı' : 'Bekliyor'}
                </span>
              </td>
              <td className="border border-gray-300 p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditModal({open: true, testimonial})}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Düzenleme Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Yorumu Düzenle</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Müşteri Adı"
                className="w-full p-3 border rounded-lg"
                value={editModal.testimonial?.name || ''}
                onChange={(e) => setEditModal({
                  ...editModal,
                  testimonial: {...editModal.testimonial, name: e.target.value}
                })}
              />
              <input
                type="text"
                placeholder="Konum"
                className="w-full p-3 border rounded-lg"
                value={editModal.testimonial?.location || ''}
                onChange={(e) => setEditModal({
                  ...editModal,
                  testimonial: {...editModal.testimonial, location: e.target.value}
                })}
              />
              <select
                className="w-full p-3 border rounded-lg"
                value={editModal.testimonial?.rating || 5}
                onChange={(e) => setEditModal({
                  ...editModal,
                  testimonial: {...editModal.testimonial, rating: parseInt(e.target.value)}
                })}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Yıldız)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Yıldız)</option>
                <option value={3}>⭐⭐⭐ (3 Yıldız)</option>
                <option value={2}>⭐⭐ (2 Yıldız)</option>
                <option value={1}>⭐ (1 Yıldız)</option>
              </select>
              <input
                type="text"
                placeholder="Hizmet Türü"
                className="w-full p-3 border rounded-lg"
                value={editModal.testimonial?.service || ''}
                onChange={(e) => setEditModal({
                  ...editModal,
                  testimonial: {...editModal.testimonial, service: e.target.value}
                })}
              />
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={editModal.testimonial?.date || ''}
                onChange={(e) => setEditModal({
                  ...editModal,
                  testimonial: {...editModal.testimonial, date: e.target.value}
                })}
              />
              <textarea
                placeholder="Yorum metni"
                className="w-full p-3 border rounded-lg"
                rows={4}
                value={editModal.testimonial?.comment || editModal.testimonial?.text || ''}
                onChange={(e) => setEditModal({
                  ...editModal,
                  testimonial: {...editModal.testimonial, comment: e.target.value}
                })}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={editModal.testimonial?.verified || false}
                  onChange={(e) => setEditModal({
                    ...editModal,
                    testimonial: {...editModal.testimonial, verified: e.target.checked}
                  })}
                />
                <label htmlFor="verified">Onaylandı</label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => updateTestimonial(editModal.testimonial)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Güncelle
              </button>
              <button
                onClick={() => setEditModal({open: false, testimonial: null})}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}