"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBySurah } from "@/app/services/quran.services";
import { ayatDetail } from "@/app/types";
import AudioQuran from "@/app/(landing)/components/audioquran/audioquran";


const SurahPage = () => {
    const { number } = useParams();
    const router = useRouter();
    const [bySurah, setBySurah] = useState<ayatDetail | null>(null);

    const toArabicNumber = (num: number) => {
      const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return num.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    };

    useEffect(() => {
        if (!number) return;
        
        const fetchSurah = async () => {
            try {
                const data = await getBySurah(Number(number));
                setBySurah(data);
             } catch (error){
               console.error("Error fetching surahs:", error);
            }
        };

        fetchSurah();
  }, [number]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {bySurah ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tombol Kembali dan Next */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <svg className="w-5 h-5 text-emerald-600 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">Kembali</span>
            </button>
            
            {Number(number) < 114 && (
              <button 
                onClick={() => router.push(`/quranlist/surahquran/${Number(number) + 1}`)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-md transition-all group"
              >
                <span className="text-sm font-semibold">Surah Selanjutnya</span>
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
          {bySurah?.ayat?.map((ayatItem) => (
            <div key={ayatItem.nomorAyat} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 mb-4">
              <div className="flex items-center justify-between mb-4">
                <button className="p-2 border border-slate-300 rounded-md hover:bg-emerald-50 hover:border-emerald-400 transition-colors group">
                  <svg className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              <p className="text-3xl leading-loose text-right text-slate-800 mb-6" style={{ direction: 'rtl' }}>
                {ayatItem.teksArab} <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white font-semibold text-sm shadow-md mx-2">{toArabicNumber(ayatItem.nomorAyat)}</span>
              </p>

               <p className="text-base  leading-relaxed text-slate-400 italic pt-4 mb-2">
                {ayatItem.teksLatin} 
              </p>
              <p className="text-base leading-relaxed text-slate-600 italic pt-4 border-t border-slate-200">
               <b>Artinya:</b> {ayatItem.teksIndonesia}
              </p>
             
             {/* Audio Quran Component */}
              <div className="mt-4">
                {/* <AudioQuran  /> */}
                </div>
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