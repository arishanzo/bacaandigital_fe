"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBySurah } from "@/app/services/quran.services";
import { ayatDetail } from "@/app/types";


const SurahPage = () => {
    const router = useRouter();
    const { number } = router.query;
    const [bySurah, setBySurah] = useState<ayatDetail | null>(null);

    useEffect(() => {
        if (!number) return;
        
        const fetchSurah = async () => {
            try {
                const data = await getBySurah(Number(number));
                setBySurah(data[0]);
             } catch (error){
               console.error("Error fetching surahs:", error);
            }
        };

        fetchSurah();
  }, [number]);

  return (
     <div style={{ padding: 20 }}>
      {bySurah ? (
        <>
      <h1>{bySurah.nama_latin}</h1>

        {bySurah?.ayat?.map((ayatItem) => (

      <div key={ayatItem.nomor}>
      <div key={`${ayatItem.nomor}-${ayatItem.nomor}`} style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 24 }}>{ayatItem.ar}</p>
        <p>{ayatItem.idn}</p>
      </div>

  </div>
))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

}

  export default SurahPage;