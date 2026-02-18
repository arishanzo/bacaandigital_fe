"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSurah } from "@/app/services/quran.services";
import { Surah } from "@/app/types";
import MenuHeader from "../components/menuheader/menuheader";
import CardHeader from "../components/cardheader/cardheader";
import { Header } from "../layouts/header";


const QuranIndex = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      <Header />

      <div className="max-w-7xl justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <MenuHeader />
       <CardHeader />


        {/* Menu Geser */}
        <div className="mb-8 flex items-center gap-4">

           <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex py-2 gap-3 min-w-max px-1">
                <a href="/quranlist" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-sm shadow-md transition">
                Surah
              </a>
              <a href="/quranlist/tafsir" className="px-6 py-2.5 bg-white text-slate-700 rounded-full font-semibold text-sm border border-slate-200 hover:border-emerald-300 transition">
                Tafsir
              </a>

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

           {/* Search Bar */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari surah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-green-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm text-slate-700 placeholder-slate-400 transition"
            />
          </div>
        </div>

        
        {/* Surah Favorit */}
        {favorites.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
           
              Surah Favorit
            </h3>
               <div className="flex-1 overflow-x-scroll scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <div className="flex gap-3 min-w-max px-1">
               {surahs.filter(surah => favorites.includes(surah.nomor)).map((surah) => (
                <Link
                  key={surah.nomor}
                  href={`/quranlist/surahquran/${surah.nomor}`}
                  className="group"
                >
              <button className="px-6 py-2.5 bg-white text-slate-700 rounded-full font-semibold text-sm border border-slate-200 hover:border-emerald-300 transition">
                       {surah.namaLatin}
              </button>
            </Link>
               ))};
            </div>
          </div>

          </div>
        )}

        

        {/* Grid Surah */}
        {!surahs?.length ? (
    // Skeleton Loading
    Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-5 mb-2 shadow-sm border border-slate-200 animate-pulse"
      >
        <div className="flex justify-between">
          <div className="space-y-3 w-full">
            <div className="h-5 bg-slate-200 rounded w-2/3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3 mt-4"></div>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    ))
  ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.filter(surah => 
              surah?.namaLatin?.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((surah) => (
            <Link
              key={surah.nomor}
              href={`/quranlist/surahquran/${surah.nomor}`}
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
                    {surah.namaLatin}
                  </h2>
                   <h4 className="text-sm text-bold text-slate-600 mb-3">
                    {surah.arti}
                  </h4>
                  <p className="text-sm text-slate-500 mb-3">
                    {surah.tempatTurun} • {surah.jumlahAyat} Ayat
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
          )}

      </div> 
    </div>
  );
}

export default QuranIndex;
