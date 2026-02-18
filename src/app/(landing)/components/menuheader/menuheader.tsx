'use client';
import { useRouter,  usePathname } from 'next/navigation';


export default function MenuHeader() {
  const router = useRouter();
  
  const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean); 

    console.log(parts)
  return (
    <>
    {/* Menu Icon Geser */}
        <div className="mb-12 overflow-x-scroll scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex gap-4 px-1 p-2 lg:justify-center">
            <a href="/quranlist" className={`flex flex-col items-center gap-2 p-2 ${parts[0] === 'quranlist' ||  !parts[0] ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white'}  rounded-2xl shadow-sm min-w-[100px] transition hover:scale-105 `}>
              <svg className={`w-6 h-6  ${parts[0] === 'quranlist'  ||  !parts[0]  ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className={`text-xs ${parts[0] === 'quranlist' ||  !parts[0]  ? 'text-white' : 'text-slate-700'}`}>Al-Qur'an</span>
            </a>
            <a href="/jadwalsholat" className={`flex flex-col items-center gap-2 p-2 ${parts[0] === 'jadwalsholat' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white'}  rounded-2xl shadow-md min-w-[100px] transition hover:scale-105 `}>
              <svg className={`w-6 h-6  ${parts[0] === 'jadwalsholat' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-xs ${parts[0] === 'jadwalsholat' ? 'text-white' : 'text-slate-700'}`}>Jadwal Sholat</span>
            </a>
            
            <a href="/imsakiyah" className={`flex flex-col items-center gap-2 p-2 ${parts[0] === 'imsakiyah' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white'}  rounded-2xl shadow-md min-w-[100px] transition hover:scale-105 `}>
              <svg className={`w-6 h-6  ${parts[0] === 'imsakiyah' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span className={`text-xs ${parts[0] === 'imsakiyah' ? 'text-white' : 'text-slate-700'}`}>Imsak/Buka</span>
            </a>

            <a href="/doaharian" className={`flex flex-col items-center gap-2 p-2 ${parts[0] === 'doaharian' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white'}  rounded-2xl shadow-md min-w-[100px] transition hover:scale-105 `}>
              <svg className={`w-6 h-6  ${parts[0] === 'doaharian' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className={`text-xs ${parts[0] === 'doaharian' ? 'text-white' : 'text-slate-700'}`}>Doa Harian</span>
            </a>
            <a  href="" className={`flex flex-col items-center gap-2 p-2 ${parts[0] === 'tahlil' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white'}  rounded-2xl shadow-md min-w-[100px] transition hover:scale-105 `}>
              <svg className={`w-6 h-6  ${parts[0] === 'tahlil' ? 'text-white' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              <span className={`text-xs ${parts[0] === 'tahlil' ? 'text-white' : 'text-slate-700'}`}>Tahlil</span>
            </a>
          </div>
        </div>
        </>
        )
 }