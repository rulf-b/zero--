"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const SamsungPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];
  const [siteSettings, setSiteSettings] = useState<any>(null);


  const samsungModels = [
    "32T5300",
    "32T5300AD",
    "40T5300",
    "43AU7000",
    "43BU8000",
    "43CU7000",
    "43CU8000",
    "43CU8500",
    "43DU7000",
    "43LS01T",
    "43LS05B (The Sero)",
    "43LS05T (The Sero)",
    "48JS9000",
    "49KS8500",
    "49KS9000",
    "49LS01T",
    "49MU8000",
    "49MU8009",
    "49MU9000",
    "49NU7300",
    "49NU8000",
    "49Q60R",
    "49Q6FN",
    "49Q7C",
    "49Q7F",
    "49RU7300",
    "50AU7000",
    "50AU7100",
    "50AU7200",
    "50AU8000",
    "50AU9000",
    "50BU8000",
    "50BU8100",
    "50BU8500",
    "50CU7000",
    "50CU7200",
    "50CU8000",
    "50CU8100",
    "50CU8500",
    "50DU7000",
    "50DU7200",
    "50DU8500",
    "50LS01B",
    "50NU7400",
    "50Q60A",
    "50Q60B",
    "50Q60C",
    "50Q60D",
    "50Q60T",
    "50Q67A",
    "50Q67B",
    "50Q67C",
    "50Q67D",
    "50Q80T",
    "50QN90A",
    "50QN90B",
    "50RU7400",
    "50RU7440",
    "50TU7000",
    "50TU8000",
    "50TU8500",
    "55AU7000",
    "55AU7100",
    "55AU7200",
    "55AU8000",
    "55AU9000",
    "55BU8000",
    "55BU8100",
    "55BU8500",
    "55CU7000",
    "55CU7100",
    "55CU7200",
    "55CU8000",
    "55CU8100",
    "55CU8500",
    "55DU7000",
    "55DU7200",
    "55DU8500",
    "55JS8500",
    "55JS9000",
    "55JU7500",
    "55KS7590",
    "55KS9000",
    "55KS9090",
    "55KS9500",
    "55LS003",
    "55LS01B",
    "55LS01BG",
    "55LS01R",
    "55LS01T",
    "55LS03A",
    "55LS03B",
    "55LS03BG",
    "55LS03D",
    "55LS03N",
    "55LS03R",
    "55LS03T",
    "55MU7000",
    "55MU7350",
    "55MU7500",
    "55MU8000",
    "55MU9000",
    "55MU9500",
    "55NU7100",
    "55NU7300",
    "55NU7400",
    "55NU7500",
    "55NU8000",
    "55NU8500",
    "55Q60A",
    "55Q60B",
    "55Q60C",
    "55Q60D",
    "55Q60R",
    "55Q60T",
    "55Q67A",
    "55Q67B",
    "55Q67C",
    "55Q67D",
    "55Q80T",
    "55QN90A",
    "55QN90B",
    "55RU7400",
    "55RU7440",
    "55TU7000",
    "55TU8000",
    "55TU8500",
    "55JS8500",
    "55JS9000",
    "55JU7500",
    "55KS7590",
    "55KS9000",
    "55KS9090",
    "55KS9500",
    "55LS003",
    "55LS01B",
    "55LS01BG",
    "55LS01R",
    "55LS01T",
    "55LS03A",
    "55LS03B",
    "55LS03BG",
    "55LS03D",
    "55LS03N",
    "55LS03R",
    "55LS03T",
    "55MU7000",
    "55MU7350",
    "55MU7500",
    "55MU8000",
    "55MU9000",
    "55MU9500",
    "55NU7100",
    "55NU7300",
    "55NU7400",
    "55NU7500",
    "55NU8000",
    "55NU8500",
    "55Q60A",
    "55Q60B",
    "55Q60C",
    "55Q60D",
    "55Q60R",
    "55Q60T",
    "55Q67A",
    "55Q67B",
    "55Q67C",
    "55Q67D",
    "55Q6FN",
    "55Q700T",
    "55Q70A",
    "55Q70B",
    "55Q70C",
    "55Q70D",
    "55Q70R",
    "55Q70T",
    "55Q80A",
    "55Q80B",
    "55Q80C",
    "55Q80D",
    "55Q80R",
    "55Q80T",
    "55Q8C",
    "55Q8CN",
    "55Q95T",
    "55QN700B",
    "55QN700C",
    "55QN85A",
    "55QN85B",
    "55QN85C",
    "55QN85D",
    "55QN90A",
    "55QN90B",
    "55QN90C",
    "55QN90D",
    "55QN95B",
    "55RU7090",
    "55RU7100",
    "55RU7105",
    "55RU7172",
    "55RU7300",
    "55RU7400",
    "55RU7440",
    "55RU8000",
    "55S90C",
    "55S90D",
    "55S95B",
    "55S95C",
    "55TU7000",
    "55TU8000",
    "55TU8300",
    "55TU8500",
    "58AU7000",
    "58CU7000U",
    "58CU7100",
    "58Q60T",
    "58RU7100",
    "58TU7000",
    "58TU7100",
    "60AU8000",
    "60BU8000",
    "60KS8000",
    "65AU7000",
    "65AU7172",
    "65AU7200",
    "65AU8000",
    "65AU9000",
    "65AU9072",
    "65BU8000",
    "65BU8100",
    "65BU8500",
    "65CU7000",
    "65CU7200",
    "65CU8000",
    "65CU8100",
    "65CU8500",
    "65DU7000",
    "65DU7200",
    "65DU8100",
    "65DU8500",
    "65HU8200",
    "65HU8500",
    "65JS8500",
    "65JS8590",
    "65JS9000",
    "65JS9500",
    "65JU7500",
    "65KS8000",
    "65KS8500",
    "65KS9000",
    "65KS9500",
    "65LS003",
    "65LS03A",
    "65LS03B",
    "65LS03BG",
    "65LS03D",
    "65LS03R",
    "65LS03T",
    "65MU7000",
    "65MU7400",
    "65MU8000",
    "65MU9000",
    "65MU9500",
    "65NU7100",
    "65NU7500",
    "65NU8000",
    "65NU8500",
    "65Q60A",
    "65Q60B",
    "65Q60C",
    "65Q60D",
    "65Q60R",
    "65Q60T",
    "65Q67A",
    "65Q67B",
    "65Q67C",
    "65Q67D",
    "65Q6FN",
    "65Q700T",
    "65Q70A",
    "65Q70B",
    "65Q70C",
    "65Q70D",
    "65Q70R",
    "65Q70T",
    "65Q70TCT",
    "65Q7C",
    "65Q7F",
    "65Q7FN",
    "65Q800T",
    "65Q80A",
    "65Q80B",
    "65Q80C",
    "65Q80D",
    "65Q80R",
    "65Q80T",
    "65Q8C",
    "65Q8CN",
    "65Q900R",
    "65Q90R",
    "65Q950T",
    "65Q9F",
    "65Q9FN",
    "65QN700B",
    "65QN700C",
    "65QN800AT",
    "65QN800B",
    "65QN800C",
    "65QN800D",
    "65QN85A",
    "65QN85B",
    "65QN85C",
    "65QN85D",
    "65QN900A",
    "65QN900B",
    "65QN90A",
    "65QN90B",
    "65QN90C",
    "65QN90D",
    "65QN95B",
    "65RU7300",
    "65RU7400",
    "65RU7440",
    "65S90C",
    "65S90D",
    "65S95B",
    "65S95C",
    "65S95D",
    "65TU7000",
    "65TU7092",
    "65TU8000",
    "65TU8300",
    "65TU8500",
    "70AU7100",
    "70AU8000",
    "70AU8089",
    "70CU7100",
    "70DU7100",
    "70RU7100",
    "70TU7100",
    "75AU7000",
    "75AU7100",
    "75AU8000",
    "75AU9000",
    "75BU8000",
    "75BU8500",
    "75CU7100",
    "75CU8000",
    "75CU8500",
    "75DU7100",
    "75DU8000",
    "75JU7000",
    "75KS8090",
    "75LS03A",
    "75LS03B",
    "75LS03BG",
    "75LS03D",
    "75LS03T",
    "75MU7000",
    "75MU8000",
    "75NU7100",
    "75NU8000",
    "75Q60A",
    "75Q60B",
    "75Q60C",
    "75Q60D",
    "75Q60R",
    "75Q60T",
    "75Q6FN",
    "75Q70A",
    "75Q70B",
    "75Q70C",
    "75Q70D",
    "75Q70R",
    "75Q70T",
    "75Q7F",
    "75Q7FN",
    "75Q800T",
    "75Q80B",
    "75Q80C",
    "75Q80D",
    "75Q80T",
    "75Q8C",
    "75Q900R",
    "75Q90R",
    "75Q950T",
    "75Q95T",
    "75QN700C",
    "75QN800AT",
    "75QN800B",
    "75QN800C",
    "75QN800D",
    "75QN85A",
    "75QN85B",
    "75QN85C",
    "75QN85D",
    "75QN85D",
    "78HU8500",
    "78JS9500",
    "78JU7500",
    "78KS9500",
    "82MU8000",
    "82NU8000",
    "82Q60R",
    "82Q70R",
    "82Q800T",
    "82Q900R",
    "82RU8000",
    "82TU8000",
    "85AU8000",
    "85BU8000",
    "85CU7100",
    "85CU8000",
    "85DU7100",
    "85DU8000",
    "85HU7500",
    "85HU7590",
    "85LS03B",
    "85LS03BG",
    "85Q60A",
    "85Q60B",
    "85Q60C",
    "85Q60D",
    "85Q60T",
    "85Q70A",
    "85Q70B",
    "85Q70C",
    "85Q70D",
    "85Q70T",
    "85Q80T",
    "85Q950T",
    "85QN85A",
    "85QN85B",
    "85QN85C",
    "85QN85D",
    "85QN900A",
    "85QN900B",
    "85QN900C",
    "85QN900D",
    "85QN90A",
    "85QN90B",
    "85QN90C",
    "85QN90D",
    "85S9",
    "85TU8000",
    "88JS9500",
    "88KS9800",
    "88Q9F",
    "98DU9000",
    "98Q80C",
    "98Q900R",
    "98QN100B",
    "98QN90D",
    "GU50TU8079U",
    "HG55AU800EE",
    "HG65AU800EE",
    "LC24RG50FQMXUF (C24RG5)",
    "LC27HG70QQMXUF (C27HG70)",
    "LC27R500FHMXUF (C27R50)",
    "LC27R500FHPXUF (C27R50)",
    "LC27R500FHRXUF (C27R50)",
    "LC27RG50FQMXUF (C27RG5)",
    "LC32HG70QQMXUF (C32HG70)",
    "LC32R500FHPXUF (C32R500)",
    "LC34F791WQMXUF (C34F791)",
    "LC34H890WGRXUF (C34H890)",
    "LC34H890WJMXUF (C34H890)",
    "LC34J791WTMXUF (34CJ791)",
    "LC34J791WTRXUF (34CJ791)",
    "LC49HG90DMMXUF (C49HG90)",
    "LC49J890DKMXUF (C49J890)",
    "LC49RG90SSMXUF (C49RG90)",
    "LC49RG90SSPXUF (C49RG90)",
    "LC49RG90SSRXUF (C49RG90)",
    "LF22T450FQRXUF (F22T450F)",
    "LF24T350FHRXUF (F24T350F)",
    "LF24T370FWRXUF (F24T370F)",
    "LF24T450FQRXUF (F24T450)",
    "LF27T450FQRXUF (F24T450)",
    "LS22A330NHMXUF (S22A330)",
    "LS22C310EAUXUF (S22C310)",
    "LS22F350FHRXUF (S22F350F)",
    "LS24A400UJUXUF (S24A400)",
    "LS24A400VEUXEN (S24A400)",
    "LS24C310EAUXUF (S24C310)",
    "LS24C312EAUXUF (S24C312)",
    "LS24C332GAUXUF (S24C332)",
    "LS24C360EAUXUF (S24C360)",
    "LS24C362EAUXUF (S24C362)",
    "LS24C432GAUXUF (S24C432)",
    "LS24H850QFMXUF (S24H850)",
    "LS24R350FZRXUF (S24R350)",
    "LS27A600NWMXUF (S27A600)",
    "LS27BM500EUXUF (S27BM500)",
    "LS27BM501EUXUF (S27BM501)",
    "LS27C310EAUXUF (S27C310)",
    "LS27C312EAUXUF (S27C312)",
    "LS27C362EAUXUF (S27C362)",
    "LS27C366EAUXUF (S27C366)",
    "LS27C390EAUXUF (S27C390)",
    "LS27CM500EUXUF (S27CM500)",
    "LS27CM501EUXUF (S27CM501)",
    "LS27DM500EUXUF (S27DM500)",
    "LS27H850QFMXUF (S27H850)",
    "LS32A604NWMXUF (S32A600)",
    "LS32A704NWMXUF (S32A700)",
    "LS32AM500NRXUF (32M50A)",
    "LS32AM700UMXUF (32M70A)",
    "LS32AM700URXUF (32M70A)",
    "LS32BM500EUXUF (S32BM500)",
    "LS32BM501EUXUF (S32BM501)",
    "LS32BM700UUXUF (S32BM700)",
    "LS32BM801UUXUF (32M80)",
    "LS32BM80BUUXUF (32M80)",
    "LS32BM80PUUXUF (32M80)",
    "LS32C390EAUXUF (S32C390)",
    "LS32CM500EUXUF (S32CM500)",
    "LS32CM501EUXUF (S32CM501)",
    "LS32CM801UUXUF (32M80C)",
    "LS32CM80BUUXUF (32M80C)",
    "LS32CM80PUUXUF (32M80C)",
    "LS32DM702UUXUF (S32DM702)",
    "LS43BM700UPXUF (S43BM700)",
    "LS43BM700UUXUF (S43BM700)",
    "LS43DM702UUXUF (S43DM702)",
    "LU28R550UQMXUF (U28R55)",
    "LU28R550UQPXUF (U28R55)",
    "LU28R550UQRXUF (U28R55)",
    "LU32D97KQSR/UF",
    "LU32H750UMMXUF (U32H750)",
    "LU32J590UQMXUF (U32J590)",
    "LU32R590CWPXUF (U32R59C)",
    "LU32R590CWRXUF (U32R59C)",
    "Odyssey Ark 55″ LS55BG970NUXUF (S55BG97)",
    "Odyssey Ark 55″ LS55CG97WNUXUF (S55CG97)",
    "Odyssey G3 24″ LF24G35TFWMXUF (F24G35T)",
    "Odyssey G3 24″ LS24AG300NRXUF (S24AG30)",
    "Odyssey G3 24″ LS24AG300NUXUF (S24AG30)",
    "Odyssey G3 24″ LS24AG320NUXUF (S24AG32)",
    "Odyssey G3 24″ LS24DG302EUXUF (S24DG30)",
    "Odyssey G3 27″ LF27G35TFWMXUF",
    "Odyssey G3 27″ LS27AG320NUXUF (S27AG32)",
    "Odyssey G3 27″ LS27DG302EUXUF (S27DG30)",
    "Odyssey G4 25″ LS25BG400EUXUF (S25BG40)",
    "Odyssey G4 27″ LS27BG400EUXUF (S27BG40)",
    "Odyssey G5 27″ LC27G55TQBUXUF (C27G55T)",
    "Odyssey G5 27″ LC27G55TQWRXUF",
    "Odyssey G5 27″ LS27AG500NUXUF (S27AG500)",
    "Odyssey G5 27″ LS27AG550EPXUF (S27AG550)",
    "Odyssey G5 27″ LS27AG550EUXUF (S27AG550)",
    "Odyssey G5 27″ LS27CG510EUXUF (S27CG510)",
    "Odyssey G5 27″ LS27CG552EUXUF (S27CG552)",
    "Odyssey G5 27″ LS27DG502EUXUF (S27DG502)",
    "Odyssey G5 32″ LC32G55TQBUXUF (C32G55T)",
    "Odyssey G5 32″ LC32G55TQWRXUF",
    "Odyssey G5 32″ LS32AG500PPXUF (S32AG500)",
    "Odyssey G5 32″ LS32AG550EPXUF (S32AG55)",
    "Odyssey G5 32″ LS32AG550EUXUF (S32AG55)",
    "Odyssey G5 32″ LS32CG552EUXUF (S32CG552)",
    "Odyssey G5 32″ LS32DG500EUXUF (S32DG50)",
    "Odyssey G5 34″ LC34G55TWWMXUF (C34G55T)",
    "Odyssey G5 34″ LC34G55TWWRXUF (C34G55T)",
    "Odyssey G6 27″ LS27BG652EUXUF",
    "Odyssey G6 32″ LS32BG652EUXUF",
    "Odyssey G7 27″ LC27G75TQSMXUF",
    "Odyssey G7 27″ LC27G75TQSRXUF",
    "Odyssey G7 28″ LS28AG700NUXUF (S28AG70)",
    "Odyssey G7 28″ LS28BG702EPXUF (S28BG70)",
    "Odyssey G7 32″ LC32G75TQSMXUF",
    "Odyssey G7 32″ LC32G75TQSRXUF",
    "Odyssey G7 32″ LS32BG700EUXUF (S32BG70)",
    "Odyssey G9 49″ LC49G95TSSMXUF",
    "Odyssey G9 49″ LC49G95TSSRXUF",
    "Odyssey G9 49″ LS49CG954EUXUF (S49CG954)",
    "Odyssey Neo G7 32″ LS32BG750NPXUF (S32BG75)",
    "Odyssey Neo G7 32″ LS32BG750NUXUF (S32BG75)",
    "Odyssey Neo G7 LS43CG700NUXUF (S43CG700)",
    "Odyssey Neo G8 32″ LS32BG850NPXUF (S32BG85)",
    "Odyssey Neo G8 32″ LS32BG850NUXUF (S32BG85)",
    "Odyssey Neo G9 49″ LS49AG950NUXUF",
    "Odyssey Neo G9 57″ LS57CG952NUXUF (S57CG95)",
    "Odyssey OLED G6 27″ LS27DG602SUXUF (S27DG602)",
    "Odyssey OLED G8 32″ LS32DG802SUXUF (S32DG802)",
    "Odyssey OLED G8 32″ S32DG802",
    "Odyssey OLED G9 49″ LS49CG934SUXUF (S49CG934S)",
    "Odyssey OLED G9 49″ LS49CG950SUXUF (S49CG950S)",
    "Odyssey OLED G9 49″ LS49CG954SUXUF (S49CG954S)",
    "Smart Odyssey OLED G8 LS34BG850SUXUF",
    "ViewFinity S5 34″ LS34C500GAUXUF (S34C500)",
    "ViewFinity S6 24″ LS24D600UAUXUF (S24D600U)",
    "ViewFinity S6 27″ LS27B610EQUXUF (S27B610)",
    "ViewFinity S6 27″ LS27D600UAUXUF (S27D600U)",
    "ViewFinity S6 32″ LS32A600UUPXUF (S32A600U)",
    "55QN855C",
    "ViewFinity S6 34″ LS34C652UAUXUF (S34C652U)",
    "ViewFinity S8 27″ LS27D800UAUXUF (S27D800U)",
    "ViewFinity S8 32″ LS32D800UAUXUF (S32D800U)",
    "ViewFinity S9 27″ LS27C902PAUXUF (S27C902)"
];

  const filteredModels = samsungModels.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const startIndex = (currentPage - 1) * modelsPerPage;
  const endIndex = startIndex + modelsPerPage;
  const currentModels = filteredModels.slice(startIndex, endIndex);

  // Kısaltılmış pagination dizisi oluşturan fonksiyon
  const getPagination = (current: number, total: number) => {
    const delta = 2; // aktif sayfanın sağ-solunda kaç sayfa gösterilecek
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  // Reset to page 1 when search term changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const createModelSlug = (model: string) => {
    return model.toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  
  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Site ayarları yüklenirken hata:', error));
  }, []);


  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/marka_logo/samsung.svg" alt="Samsung Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Samsung</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde Samsung TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Samsung">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Samsung TV Teklifi Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Hemen Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            İstanbul Samsung TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece Samsung orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Samsung TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Samsung servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Samsung tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Samsung TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              Samsung televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal Samsung yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">Samsung TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {samsungModels.length} farklı Samsung TV modelinde uzman servis hizmeti
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Model ara... (örn: 32T5300)"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {currentModels.map((model, index) => (
              <Link 
                key={index} 
                href={`/markalar/samsung/${createModelSlug(model)}`}
                className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border transition-colors group block"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">Samsung {model}</h3>
                    <p className="text-xs text-gray-600 mt-1">Ekran Tamiri Mevcut</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-green-600 font-medium">✓ Tamir Edilebilir</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/ucretsiz-teklif?marka=Samsung&model=${encodeURIComponent(model)}`;
                    }}
                  >
                    Teklif Al
                  </Button>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Önceki</span>
              </Button>
              
              <div className="flex space-x-1">
                {getPagination(currentPage, totalPages).map((item, idx) =>
                  item === '...'
                    ? <span key={"dots-"+idx} className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                    : <Button
                        key={item}
                        variant={currentPage === item ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(Number(item))}
                        className={`w-8 h-8 p-0 ${
                          currentPage === item 
                            ? "bg-blue-600 text-white" 
                            : "border-gray-300 text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {item}
                      </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span>Sonraki</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Results info */}
          <div className="text-center text-gray-600 mb-8">
            <p>
              {filteredModels.length > 0 ? (
                <>
                  Sayfa {currentPage} / {totalPages} - 
                  Toplam {filteredModels.length} model bulundu
                </>
              ) : searchTerm ? (
                "Arama sonucu bulunamadı"
              ) : (
                `Toplam ${samsungModels.length} model mevcut`
              )}
            </p>
          </div>

          {/* No results message */}
          {filteredModels.length === 0 && searchTerm && (
            <div className="text-center py-8 mb-8">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aradığınız model bulunamadı.</p>
              <p className="text-sm text-gray-400 mt-2">
                Tüm Samsung TV modelleri için servis hizmeti vermekteyiz. 
                <Link href="/ucretsiz-teklif?marka=Samsung" className="text-blue-600 hover:underline ml-1">
                  Teklif alın
                </Link>
              </p>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg text-center mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Modelinizi Bulamadınız mı?
            </h3>
            <p className="text-gray-600 mb-6">
              Listede olmayan tüm Samsung TV modelleri için de profesyonel tamiri hizmeti sunuyoruz. 
              Modeliniz için özel teklifimizi alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Samsung">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Ücretsiz Teklif Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  Hemen Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Samsung TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => {
              const districtSlug = district.toLowerCase()
                .replace('ı', 'i').replace('ğ', 'g').replace('ü', 'u')
                .replace('ş', 's').replace('ö', 'o').replace('ç', 'c');
              
              return (
                <div
                  key={district}
                  className="block p-4 bg-white hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 font-medium">{district}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Samsung TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında Samsung servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=Samsung">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Samsung TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SamsungPage;
