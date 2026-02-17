'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CardHeader() {
    const [savedSurah, setSavedSurah] = useState<any | null>(null);
const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem('savedAyat');
        if (saved) {
            const parsed = JSON.parse(saved);
            const savedAyatObj = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
            setSavedSurah(savedAyatObj);
        }
    }, []);

    const handleSurah = (nomorAyat: number) => {
      if(nomorAyat) {
        router.push(`/quranlist/surahquran/${savedSurah?.nomorSurah}#ayat-${nomorAyat}`);
      } else {
        router.push(`/quranlist/surahquran/1`);
      }
   };


    return (
<>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative flex items-center justify-between">
              <div className="text-white">
                <h2 className="md:text-2xl text-xl font-bold mb-2">
                    {savedSurah ? 'Lanjutkan Membaca' : 'Mulai Baca Al-Quran'}
                </h2>
                <p className="text-emerald-50 mb-4">
                    {savedSurah ? `Surah ${savedSurah?.namaSurah} Ayat ke ${savedSurah.nomorAyat}` : 'Bacalah Al-Quran dengan tartil'}
                </p>
                <button 
                onClick={(e) => handleSurah(savedSurah?.nomorAyat)}
                className="cursor-pointer inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition">
                  <span>{savedSurah ? 'Lanjutkan' : 'Mulai Baca'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <svg className="md:w-28 md:h-28  w-18 h-18 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="white"/>
              </svg>
            </div>
          </div>
        </div>
</>
    )

}