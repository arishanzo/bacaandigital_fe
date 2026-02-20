
'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '../layouts/header';
import MenuHeader from '../components/menuheader/menuheader';
import { FormDataSholat, jadwalSholat } from '@/app/types';
import { getProvinsi, postJadwalSholat, postKabKota } from '@/app/services/jadwalshoat.services';
import html2canvas from 'html2canvas';

const JadwalSholatPage = () => {
  const captureRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('Kab. Lamongan');
  const [selectedProvince, setSelectedProvince] = useState('Jawa Timur');
  const [notifEnabled, setNotifEnabled] = useState(false);

  const[getJadwalSholat, setGetJadwalSholat] =useState<jadwalSholat | null>(null);
  const[Provinsi, setProvinsi] =useState<any | null>(null);
  const [getkab, setGetKab] = useState<string[]>([]);

  const [formDataSholat, setFormDataSholat] = useState<FormDataSholat>({
    provinsi: selectedProvince, 
            kabkota:  selectedCity, 
            bulan: currentDate.getMonth() + 1, 
            tahun: currentDate.getFullYear()
     });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=id`,
              {
                headers: {
                  'User-Agent': 'JadwalSholatApp/1.0'
                }
              }
            );
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            const city = data.address.city || data.address.county || data.address.town || data.address.village;
            const province = data.address.state;
            if (city) setSelectedCity(city);
            if (province) setSelectedProvince(province);
           
          } catch (error) {
            console.log('Gagal mendapatkan nama lokasi:', error);
          }
        },
        (error) => {
          console.log('Gagal mendapatkan lokasi:', error.message);
        }
      );
    }
  }, []);

    useEffect(() => {
    
       

          const fetchJadwalSholat = async () => {
              try {
                  const data = await postJadwalSholat(formDataSholat);
                  setGetJadwalSholat(data);
               } catch (error){
                 console.error("Error fetching surahs:", error);
              }
          };

        const fetchGetProvinsi = async () => {
             try {
                  const data = await getProvinsi();
                  setProvinsi(data)
               } catch (error){
                 console.error("Error fetching surahs:", error);
              }
        }

        const fetchKab = async () => {
              try {
                  const data = await postKabKota(selectedProvince);
                  setGetKab(data);
               } catch (error){
                 console.error("Error fetching surahs:", error);
              }
          };

          
        fetchKab();
        fetchGetProvinsi();
        fetchJadwalSholat();
    }, []);


  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Jadwal Sholat', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link berhasil disalin!');
    }
  };
  const handleDownloadImage =  async () => {
   if (!captureRef.current) return;

  const element = captureRef.current;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const link = document.createElement('a');
  link.download = `jadwal-sholat-${selectedCity}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const handleKab = async (value: string) => {
  const newFormData = {
    provinsi: selectedProvince,
    kabkota: value, 
    bulan: currentDate.getMonth() + 1,
    tahun: currentDate.getFullYear(),
  };

  setFormDataSholat(newFormData);

   try {
    const data = await postJadwalSholat(formDataSholat);
    setGetJadwalSholat(data); 
    setSelectedCity(value);
  } catch (error) {
    console.error("Error fetching kab/kota:", error);
  }
};

const handleProvinsi = async (value: string) => {
  try {
    const data = await postKabKota(value);
    setGetKab(data); // pastikan data berupa array
    setSelectedProvince(value);
   
  } catch (error) {
    console.error("Error fetching kab/kota:", error);
   
  }
};

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const curentJadwalSholat = getJadwalSholat?.jadwal.filter(item => new Date(item.tanggal_lengkap).getDate() === currentDate.getDate());
   const savedAyatObj = Array.isArray(curentJadwalSholat) ? curentJadwalSholat[curentJadwalSholat.length - 1] : curentJadwalSholat;


    

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
         <Header />
   
         <div className="max-w-7xl justify-center mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <MenuHeader />
          

        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-3">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L10 6H14L12 2M6 6C6 7.11 5.11 8 4 8V18H2V20H22V18H20V8C18.9 8 18 7.11 18 6L15 6.5V8H9V6.5L6 6M6 8H8V18H6V8M10 8H14V18H10V8M16 8H18V18H16V8Z"/>
              </svg>
              <h1 className="md:text-5xl text-3xl font-bold">Jadwal Sholat</h1>
            </div>
            <p className="text-emerald-50 md:text-lg text-sm  mb-8">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()} • {selectedCity}, {selectedProvince}
            </p>
            <div className="flex gap-2 justify-center">
                      <button
            onClick={handleDownloadImage}
            className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-2 hover:bg-white/30 transition-all inline-flex items-center gap-2 border border-white/30"
          >
            {/* Ikon Download */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
            <span className="md:text-sm text-xs font-semibold">
              Unduh Gambar
            </span>
          </button>
              <button 
                onClick={handleShare}
                className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-2 hover:bg-white/30 transition-all inline-flex items-center gap-2 border border-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="md:text-sm  text-xs font-semibold">Bagikan</span>
              </button>
            </div>
          </div>
        </div>

           {/* Today's Prayer Times Card */}
            <div className="bg-white rounded-2xl justify-center items-center shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L10 6H14L12 2M6 6C6 7.11 5.11 8 4 8V18H2V20H22V18H20V8C18.9 8 18 7.11 18 6L15 6.5V8H9V6.5L6 6M6 8H8V18H6V8M10 8H14V18H10V8M16 8H18V18H16V8Z"/>
            </svg>
            Waktu Sholat Hari Ini
          </h2>
         
         {!savedAyatObj ? (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-4 bg-slate-100 animate-pulse text-center"
        >
          <div className="w-8 h-8 bg-slate-300 rounded-full mx-auto mb-3"></div>
          <div className="h-4 bg-slate-300 rounded w-2/3 mx-auto mb-2"></div>
          <div className="h-6 bg-slate-300 rounded w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {[
        { name: 'Subuh', time: savedAyatObj?.subuh },
        { name: 'Dhuha', time: savedAyatObj?.dhuha },
        { name: 'Dzuhur', time: savedAyatObj?.dzuhur },
        { name: 'Ashar', time: savedAyatObj?.ashar },
        { name: 'Maghrib', time: savedAyatObj?.maghrib },
        { name: 'Isya', time: savedAyatObj?.isya }
      ].map((prayer, idx) => (
        <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl md:p-4 p-2 text-center">
          <div className="text-sm font-semibold text-gray-600 mb-1">
            {prayer.name}
          </div>
          <div className="md:text-2xl text-md font-bold text-emerald-600">
            {prayer.time}
          </div>
        </div>
      ))}
    </div>
  )}

        </div>


        {/* Filter Section */}
        <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl shadow-lg p-6 mb-8 border border-emerald-100">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">Pilih Lokasi Lain</h3>
          </div>

          {!getJadwalSholat ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 w-24 bg-slate-300 rounded"></div>
      <div className="h-12 bg-slate-200 rounded-xl"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 w-24 bg-slate-300 rounded"></div>
      <div className="h-12 bg-slate-200 rounded-xl"></div>
    </div>
  </div>
) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wide">Provinsi</label>
              <div className="relative">
                <select 
                  value={selectedProvince}
                  onChange={(e) => handleProvinsi(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all appearance-none cursor-pointer hover:border-emerald-300"
                >
                    
                   <option value='' disabled>-- Pilih Provinsi --</option>
                    {Provinsi?.map((item: any, idx: number) => (
                         <option key={idx}>{item}</option>
                    ) )}
                 
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wide">Kota</label>
              <div className="relative">
                <select 
                  value={selectedCity}
                  onChange={(e) =>  handleKab(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all appearance-none cursor-pointer hover:border-emerald-300"
                >
                   <option value='' disabled>-- Pilih Kabupaten / Kota --</option>
                {getkab?.map((item: any, idx: number) => (
                      <option key={idx}>{item}</option>
                ))}
                 
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
)}
        </div>
        

        
             
         <div ref={captureRef} className='md:p-8 p-2'>
  
  {/* Header Section */}
  <div
    className="relative rounded-3xl shadow-xl overflow-hidden mb-8"
    style={{
      background: "linear-gradient(to right, #059669, #14b8a6)"
    }}
  >
    {/* Decorative Orbs */}
    <div
      className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32"
      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
    ></div>

    <div
      className="absolute bottom-0 left-0 w-48 h-48 rounded-full -ml-24 -mb-24"
      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
    ></div>

    {/* Content */}
    <div className="relative md:mt-8 text-center text-white">
      <div className="flex flex-col items-center justify-center gap-2 mb-3">
        
        <div className="flex items-center gap-3 mt-4">

          <h2 className="text-sm font-bold tracking-tight text-white">
            Badi Islamic
          </h2>
        </div>

        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Jadwal Sholat Kab/Kota {selectedCity}
        </h1>
      </div>

      <p
        className="md:text-lg text-sm mb-8"
        style={{ color: "#d1fae5" }}
      >
        {months[currentDate.getMonth()]} {currentDate.getFullYear()} •{" "}
        {selectedCity}, {selectedProvince}
      </p>
    </div>
  </div>

  {/* Table Section */}
  <div
    className="rounded-2xl shadow-lg overflow-hidden"
    style={{ backgroundColor: "#ffffff" }}
  >
    <div
      ref={scrollRef}
      className="overflow-x-scroll scrollbar-hide"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}
    >
      <table className="w-full">
        <thead>
          <tr
            style={{
              background: "linear-gradient(to right, #059669, #14b8a6)",
              color: "#ffffff"
            }}
          >
            <th className="mb-1 p-2 text-center font-semibold">Tgl</th>
            <th className="mb-1 p-2 text-center font-semibold">Subuh</th>
            <th className="mb-1 p-2 text-center font-semibold">Dhuha</th>
            <th className="mb-1 p-2 text-center font-semibold">Dzuhur</th>
            <th className="mb-1 p-2 text-center font-semibold">Ashar</th>
            <th className="mb-1 p-2 text-center font-semibold">Maghrib</th>
            <th className="mb-1 p-2 text-center font-semibold">Isya</th>
          </tr>
        </thead>

    <tbody>
  { !getJadwalSholat ? (
    Array.from({ length: 8 }).map((_, i) => (
      <tr key={i} className="animate-pulse border-b">
        {Array.from({ length: 7 }).map((__, j) => (
          <td key={j} className="p-3 text-center">
            <div className="h-4 bg-slate-200 rounded w-8 mx-auto"></div>
          </td>
        ))}
      </tr>
    ))
  ) : (
    getJadwalSholat.jadwal.map((jadwal, index) => {
      const isToday =
        new Date(jadwal.tanggal_lengkap).getDate() === currentDate.getDate();

      return (
        <tr
          key={index}
          style={{
            borderBottom: "1px solid #f3f4f6",
            backgroundColor: isToday ? "#d1fae5" : "#ffffff"
          }}
        >
          <td className="mb-1 py-1 text-center font-semibold" style={{ color: "#1f2937" }}>
            {jadwal.tanggal}
          </td>
          <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>{jadwal.subuh}</td>
          <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>{jadwal.dhuha}</td>
          <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>{jadwal.dzuhur}</td>
          <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>{jadwal.ashar}</td>
          <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>{jadwal.maghrib}</td>
          <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>{jadwal.isya}</td>
        </tr>
      );
    })
  )}
</tbody>
      </table>
    </div>
  </div>
</div>


        {/* Info Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">Jadwal sholat dapat berbeda beberapa menit tergantung lokasi Anda</p>
        </div>
      </div>
    </div>
  );
}

export default JadwalSholatPage;