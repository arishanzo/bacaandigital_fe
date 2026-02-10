"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "../../../../services/api";
import { getAllSurah } from "@/app/services/quran.services";
import { Surah } from "@/app/types";


const quranIndex = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchSurahs = async () => {
  
      try {
        const data = await getAllSurah();
        if(data){
          setSurahs(data);
        }
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };

    const savedFavorites = localStorage.getItem('favoriteSurahs');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    fetchSurahs();
  }, []);

  const toggleFavorite = (e: React.MouseEvent, surahId: number) => {
    e.preventDefault();
    const newFavorites = favorites.includes(surahId)
      ? favorites.filter(id => id !== surahId)
      : [...favorites, surahId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSurahs', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Top Header */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Badi Islamic</h2>
          </div>
          <button className="ml-auto p-2 hover:bg-white/50 rounded-xl transition">
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2}/>
              <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2}/>
              <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2}/>
              <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2}/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl justify-center mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Menu Icon Geser */}
        <div className="mb-12 overflow-x-scroll scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex gap-4 px-1 lg:justify-center">
            <button className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg min-w-[100px] transition hover:scale-105">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs font-semibold text-white">Al-Qur'an</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm min-w-[100px] transition hover:border-emerald-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-slate-700">Jadwal Sholat</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm min-w-[100px] transition hover:border-emerald-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span className="text-xs font-semibold text-slate-700">Imsak/Buka</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm min-w-[100px] transition hover:border-emerald-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="text-xs font-semibold text-slate-700">Doa Harian</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm min-w-[100px] transition hover:border-emerald-300">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-slate-700">Tahlil</span>
            </button>
          </div>
        </div>

        {/* Card Panduan Baca Al-Quran */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">Panduan Baca Al-Qur'an</h2>
                <p className="text-emerald-50 mb-4">Pelajari cara membaca dengan benar dan tartil</p>
                <button className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition">
                  <span>Lihat Panduan</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <svg className="w-28 h-28 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Menu Geser */}
        <div className="mb-8 flex items-center gap-4">

           <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max px-1">
              <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-sm shadow-md transition">
                Al-Qur'an
              </button>
              <button className="px-6 py-2.5 bg-white text-slate-700 rounded-full font-semibold text-sm border border-slate-200 hover:border-emerald-300 transition">
                Tafsir
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">{favorites.length}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700"></span>
            </button>
          </div>
         
        </div>

        {/* Grid Surah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.map((surah) => (
            <Link
              key={surah.nomor}
              href={`/quran/surah/${surah.nomor}`}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1">
                {/* Love Badge */}
                <button onClick={(e) => toggleFavorite(e, surah.nomor)} className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md hover:scale-110 transition">
                  <svg className="w-5 h-5 text-white" fill={favorites.includes(surah.nomor) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Content */}
                <div className="pr-12">
                  <h2 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">
                    {surah.nama_latin}
                  </h2>
                  <p className="text-sm text-slate-500 mb-3">
                    {surah.tempat_turun} • {surah.jumlah_ayat} Ayat
                  </p>
                  <div className="flex items-center text-emerald-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Baca Surah</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default quranIndex;
