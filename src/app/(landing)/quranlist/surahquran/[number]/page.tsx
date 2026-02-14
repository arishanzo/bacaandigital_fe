"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getBySurah } from "@/app/services/quran.services";
import { ayatDetail } from "@/app/types";
import AudioQuran from "@/app/(landing)/components/audioquran/audioquran";


const SurahPage = () => {
    const verseRefs = useRef<(HTMLDivElement | null)[]>([])
    const audioRef =  React.useRef<HTMLAudioElement | null>(null);
    const { number } = useParams();
    const router = useRouter();
    const [bySurah, setBySurah] = useState<ayatDetail | null>(null);
    const [displayText, setDisplayText] = useState("");


    const [cureentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [wordProgress, setWordProgress] = useState(0);

    

    const handleTimeUpdate = () => {
      if(audioRef.current){
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progressPercent = (current / duration) * 100;
        setProgress(progressPercent);
        setWordProgress(progressPercent);
      }
    };

    const handleEnded = () => {
      if(cureentIndex < (bySurah?.ayat.length || 0) -1){
         setCurrentIndex((prev) => prev + 1);
         setProgress(0);
         setWordProgress(0);
      } else {
        setIsPlaying(false);
      }
    };

    
  useEffect(() => {
    
    const fullText = bySurah?.ayat[cureentIndex]?.teksArab;
    const audio = audioRef.current;
    if(audio){
    const updateText = () => {
      if (!audio.duration || !fullText) return;

      const progress = audio.currentTime / audio.duration;
      const charCount = Math.floor(progress * fullText.length);

      setDisplayText(fullText.slice(0, charCount));
    };
  
    audio.addEventListener("timeupdate", updateText);
    return () => audio.removeEventListener("timeupdate", updateText);
  }
  }, [cureentIndex, bySurah]);

   useEffect(() => {
    if(verseRefs.current.length === 0) return;

    if(isPlaying){
    verseRefs.current[cureentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  }, [cureentIndex]);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !bySurah?.ayat[cureentIndex]) return;

      audio.src = bySurah.ayat[cureentIndex].audio?.['05'];
      audio.load();
      
      if (isPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }, [cureentIndex, bySurah, isPlaying]);

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
            <div key={ayatItem.nomorAyat}
              ref={(el) => {
                verseRefs.current[ayatItem.nomorAyat - 1] = el;
              }}
            
            className={`bg-white rounded-2xl p-6 shadow-sm ${isPlaying && cureentIndex === ayatItem.nomorAyat - 1 ? 'border-1 border-emerald-300 shadow-xl ' : 'border border-slate-200'
            } hover:shadow-xl  hover:border-emerald-300 transition-all duration-300 mb-4`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button 
                  onClick={() => {
                    const newIndex = ayatItem.nomorAyat - 1;
                    if (cureentIndex === newIndex && isPlaying) {
                      audioRef.current?.pause();
                      setIsPlaying(false);
                    } else {
                      setCurrentIndex(newIndex);
                      setIsPlaying(true);
                      audioRef.current?.play();
                    }
                  }}
                  className="p-2 border border-slate-300 rounded-md hover:bg-emerald-50 hover:border-emerald-400 transition-colors group">
                     {isPlaying && cureentIndex === ayatItem.nomorAyat - 1 ? (
                      <svg className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  <button className="p-2 border border-slate-300 rounded-md hover:bg-emerald-50 hover:border-emerald-400 transition-colors group">
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
                  {isPlaying && cureentIndex === ayatItem.nomorAyat -1 ? displayText : ayatItem.teksArab}
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

              {isPlaying && cureentIndex === ayatItem.nomorAyat - 1 && (
                <div className="w-full mt-4 overflow-hidden">
                  <AudioQuran progress={progress} audioRef={audioRef as React.RefObject<HTMLAudioElement>} audioName={ayatItem.audio?.['05'] || ''} surah={bySurah.namaLatin}/>
                  </div>
              )}
            </div>

            
          ))}

          {bySurah?.ayat && bySurah.ayat.length > 0 && (
            <audio
              ref={audioRef}
              src={bySurah.ayat[cureentIndex]?.audio?.['05']}
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
            />
          )}
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