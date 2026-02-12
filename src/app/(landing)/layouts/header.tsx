export function Header() {

    return (
        <>
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
        </>
    )
}