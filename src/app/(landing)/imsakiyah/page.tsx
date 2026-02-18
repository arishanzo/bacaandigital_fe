
'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '../layouts/header';
import MenuHeader from '../components/menuheader/menuheader';
import { FormDataImsyakiyah, jadwalImsakiyah } from '@/app/types';
import { getProvinsi, postJadwalImsakiyah, postKabKota } from '@/app/services/jadwalimsyakiyah.services';
import html2canvas from 'html2canvas';

const JadwalImsakiyahPage = () => {
  const captureRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('Kab. Lamongan');
  const [selectedProvince, setSelectedProvince] = useState('Jawa Timur');
  const [notifEnabled, setNotifEnabled] = useState(false);

  const[getJadwalImsakiyah, setGetJadwalImsakiyah] =useState<jadwalImsakiyah | null>(null);
  const[Provinsi, setProvinsi] =useState<any | null>('-- Pilih Provinsi --');
  const [getkab, setGetKab] = useState<string[]>([]);

  const [formDataImsakiyah, setFormDataImsakiyah] = useState<FormDataImsyakiyah>({
    provinsi: selectedProvince, 
            kabkota:  selectedCity,
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
                  'User-Agent': 'JadwalImsakiyahApp/1.0'
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
    
       

          const fetchJadwalImsakiyah = async () => {
              try {
                  const data = await postJadwalImsakiyah(formDataImsakiyah);
                  setGetJadwalImsakiyah(data);
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
        fetchJadwalImsakiyah();
    }, []);


  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Jadwal Imsakiyah', url });
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
  link.download = `jadwal-Imsakiyah-${selectedCity}.png`;
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

  setFormDataImsakiyah(newFormData);

   try {
    const data = await postJadwalImsakiyah(formDataImsakiyah);
    setGetJadwalImsakiyah(data); 
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

  const curentJadwalImsakiyah = getJadwalImsakiyah?.imsakiyah.filter(item =>  Number(item.tanggal) === currentDate.getDate());
   const savedAyatObj = Array.isArray(curentJadwalImsakiyah) ? curentJadwalImsakiyah[curentJadwalImsakiyah.length - 1] : curentJadwalImsakiyah;

    

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
              <h1 className="md:text-5xl text-3xl font-bold">Jadwal Imsakiyah</h1>
            </div>
            <p className="text-emerald-50 md:text-lg text-sm  mb-8">
              {getJadwalImsakiyah?.hijriah} Hijriah / {getJadwalImsakiyah?.masehi} Masehi • {selectedCity}, {selectedProvince}
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
            Waktu Imsakiyah Hari Ini
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              {name: 'Imsyak', time: savedAyatObj?.imsak, icon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' },
              { name: 'Subuh', time: savedAyatObj?.subuh, icon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' },
              { name: 'Maghrib', time: savedAyatObj?.maghrib, icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
            ].map((prayer, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl md:p-4 p-2 text-center hover:shadow-md transition-shadow">
                <svg className="md:w-8 md:h-8 w-5 h-5 mx-auto mb-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={prayer.icon} />
                </svg>
                <div className="text-sm font-semibold text-gray-600 mb-1">{prayer.name}</div>
                <div className="md:text-2xl text-md font-bold text-emerald-600">{prayer.time}</div>
              </div>
            ))}
          </div>
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
        </div>

        
             
         <div ref={captureRef} className=' p-2'>
  
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
    <div className="relative text-center text-white">
      <div className="flex flex-col items-center justify-center gap-2 mb-3">
        
        <div className="flex items-center gap-3 mt-4">

          <h2 className="text-sm font-bold tracking-tight text-white">
            Badi Islamic
          </h2>
        </div>

        <h1 className="md:text-4xl text-lg font-bold text-white">
          Jadwal Imsakiyah {selectedCity}
        </h1>
      </div>

      <p
        className="md:text-lg text-sm mb-8"
        style={{ color: "#d1fae5" }}
      >
        {getJadwalImsakiyah?.hijriah} H / {getJadwalImsakiyah?.masehi} M •{" "}
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
            <th className="mb-1 p-2 text-center font-semibold">Imsyak</th>
            <th className="mb-1 p-2 text-center font-semibold">Shubuh</th>
            <th className="mb-1 p-2 text-center font-semibold">Terbit</th>
            <th className="mb-1 p-2 text-center font-semibold">Maghrib</th>
          </tr>
        </thead>

        <tbody>
          {getJadwalImsakiyah?.imsakiyah?.map((jadwal, index) => {
          

            return (
              <tr
                key={index}
              
              >
                <td
                  className="mb-1 py-1 text-center font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  {jadwal.tanggal}
                </td>

                <td className="mb-1 p-2 text-center" style={{ color: "#374151" , background: "#f4ffe0"}}>
                  {jadwal.imsak}
                </td>
                <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>
                  {jadwal.subuh}
                </td>
                <td className="mb-1 p-2 text-center" style={{ color: "#374151" }}>
                  {jadwal.terbit}
                </td>
                <td className="mb-1 p-2 text-center" style={{ color: "#374151" , background: "#f4ffe0"}}>
                  {jadwal.maghrib}
                </td>
              
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>

     {/* Info Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm">Sumber data: <a className=' text-extrabold' href='https://bimasislam.kemenag.go.id/web/'>Bimas Islam Kementerian Agama RI</a> </p>
        </div>
</div>


     
      </div>
    </div>
  );
}

export default JadwalImsakiyahPage;