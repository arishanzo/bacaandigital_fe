"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getBySurah, getTafsir } from "@/app/services/quran.services";
import { ayatDetail } from "@/app/types";
import AudioQuran from "@/app/(landing)/components/audioquran/audioquran";


const SurahPage = () => {
  
    const verseRefs = useRef<(HTMLDivElement | null)[]>([])
    const audioRef =  React.useRef<HTMLAudioElement | null>(null);
    const { number } = useParams();
    const router = useRouter();


    const [bySurah, setBySurah] = useState<any | null>(null);
    const [tafsirData, setTafsirData] = useState<any>(null);
    const [displayText, setDisplayText] = useState("");

    const [saveSurah, setSaveSurah] = useState<any | null>(null);
    const [activeSaveSurah, setActiveSaveSurah] = useState(false);

    


    const handleSimpanSurat = (e: React.MouseEvent, nomorAyat: number) => {
      e.preventDefault();
    
        const isSaved = saveSurah?.nomorSurah === bySurah?.nomor && saveSurah?.nomorAyat === nomorAyat;

      if (isSaved) {
        setActiveSaveSurah(false);
        setSaveSurah(null);
        alert('Tafisr telah dihapus dari simpanan!');
        localStorage.removeItem('savedTafsir');
      } else {

      const savedTafsir = localStorage.getItem('savedTafsir');
      
      const savedTafsirArray = savedTafsir ? JSON.parse(savedTafsir) : [];

      const ayatToSave = {
        nomorSurah: bySurah?.nomor,
        namaSurah: bySurah?.namaLatin,
        nomorAyat: nomorAyat,
      };

      savedTafsirArray.push(ayatToSave);
      setSaveSurah(ayatToSave);
      localStorage.setItem('savedTafsir', JSON.stringify(savedTafsirArray));
      alert(`Tafsir ${nomorAyat} dari Surah ${bySurah?.namaLatin} telah disimpan!`);
      setActiveSaveSurah(true);
    }
   }

    const handleGoToAyat = (nomorAyat: number) => {
      if(bySurah?.namaLatin === saveSurah.namaSurah) {
        const target = document.getElementById(`ayat-${nomorAyat}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' , block: 'center'});
        }
      } else {
        router.push(`/quranlist/surahquran/${saveSurah.nomorSurah}#ayat-${nomorAyat}`);
      }
   };






    const toArabicNumber = (num: number) => {
      const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    };

    useEffect(() => {
        if (!number) return;

        const fetchTafsir = async () => {
            try {
                const data = await getTafsir(Number(number));
                setTafsirData(data);
             } catch (error){
               console.error("Error fetching tafsir:", error);
            }
        };
        
        const fetchSurah = async () => {
            try {
                const data = await getBySurah(Number(number));
                setBySurah(data);
             } catch (error){
               console.error("Error fetching surahs:", error);
            }
        };

         

      const savedFavorites = localStorage.getItem('savedTafsir');
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites);
          const savedTafsirObj = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
          setSaveSurah(savedTafsirObj);

          setActiveSaveSurah(true);
          

        } catch (error) {
          console.error("Error parsing savedTafsir:", error);
        }
      }

      fetchSurah();
      fetchTafsir();
  }, [number]);


  useEffect(() => {
    if (bySurah && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [bySurah]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {bySurah ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tombol Kembali dan Next */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => router.back()}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <svg className="w-5 h-5 text-emerald-600 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">Kembali</span>
            </button>
            
            {Number(number) < 114 && (
              <button 
                onClick={() => router.push(`/quranlist/tafsir/tafsirquran/${Number(number) + 1}`)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-md transition-all group"
              >
                <span className="text-sm font-semibold">Selanjutnya</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Header Surah */}
          <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative text-center text-white">
              <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: 'Arial' }}>{bySurah.nama}</h1>
              <h2 className="text-2xl font-semibold mb-2">{bySurah.namaLatin}</h2>
              <p className="text-emerald-50 text-sm">
                {bySurah.tempatTurun} • {bySurah.jumlahAyat} Ayat • Surah ke {bySurah.nomor}
              </p>
            </div>
          </div>

          {/* Bismillah */}
          {Number(number) !== 1 && Number(number) !== 9 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-6">
              <p className="text-4xl text-center text-slate-800" style={{ fontFamily: 'Arial' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Ayat List */}
          {bySurah?.ayat?.map((ayatItem: any) => (
            <div 
            id={`ayat-${ayatItem.nomorAyat}`}
            key={ayatItem.nomorAyat}
              ref={(el) => {
                verseRefs.current[ayatItem.nomorAyat - 1] = el;
              }}
            
            className={`rounded-2xl p-6 shadow-sm ${activeSaveSurah && saveSurah.nomorAyat === ayatItem.nomorAyat && Number(number) === saveSurah.nomorSurah  ? 'border-2 border-emerald-300 shadow-xl bg-gray-50' : 'bg-white border border-slate-200'} hover:shadow-xl  hover:border--300 transition-all duration-300 mb-4`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                
                  <button 

                  onClick={(e) => handleSimpanSurat(e, ayatItem.nomorAyat)}
                  
                  className={`p-2 
                  ${activeSaveSurah  && saveSurah.nomorAyat === ayatItem.nomorAyat? 'bg-emerald-50 border-emerald-400 border-1' : 'border border-slate-300'}
                  rounded-md hover:bg-emerald-50 hover:border-emerald-400 transition-colors group`}>
                    <svg className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-3xl leading-loose text-right mb-6" style={{ direction: 'rtl' }}>

                
                <span 
                  className={`transition-colors duration-300`}
                >
                  {ayatItem.teksArab}
                </span>
                {' '}
                <span className="relative inline-flex items-center justify-center w-10 h-10 mx-2">
                  <svg className="absolute w-10 h-10" viewBox="0 0 50 50" fill="none">
                    <path d="M25 2 L48 15 L48 35 L25 48 L2 35 L2 15 Z" fill="#059669" stroke="#047857" strokeWidth="1.5"/>
                    <path d="M25 8 L42 18 L42 32 L25 42 L8 32 L8 18 Z" fill="#10b981" opacity="0.3"/>
                  </svg>
                  <span className="relative text-white font-bold text-sm z-10">{toArabicNumber(ayatItem.nomorAyat)}</span>
                </span>
              </p>

               <p className="text-base  leading-relaxed text-slate-400 italic pt-4 mb-2">
                {ayatItem.teksLatin} 
              </p>
              <p className="text-base leading-relaxed text-slate-600 italic pt-4 border-t border-slate-200">
               <b>Artinya:</b> {ayatItem.teksIndonesia}
              </p>

                <p className="text-base leading-relaxed text-slate-600 italic pt-4 ">
               <b>Tafisr: </b> {tafsirData?.tafsir?.find((t: any) => t.ayat === ayatItem.nomorAyat)?.teks || 'Memuat Tafsir mohon tunggu....'}
              </p>

      { activeSaveSurah && (
  <div 
    onClick={() => handleGoToAyat(saveSurah.nomorAyat)} 
    className="cursor-pointer w-full mt-4 py-2 overflow-hidden border border-emerald-400 rounded-full bg-green-50 flex"
  >
    <span 
      className="p-2 pl-8 text-green-600 font-semibold hover:underline flex items-center gap-2 group"
    >
      Lanjutkan Membaca Tafsir {saveSurah.namaSurah} Ayat ke - {saveSurah.nomorAyat}
      <svg 
        className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </span>
  </div>
)}


            </div>

            

          ))}


                        
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-emerald-600 text-xl font-semibold">Loading...</p>
        </div>
      )}
    </div>
  )

}

  export default SurahPage;