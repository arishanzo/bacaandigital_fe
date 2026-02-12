export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface Surah {
 nomor: number;
 nama: string;
 namaLatin: string;
 jumlahAyat: number;
 tempatTurun: "mekah" | "madinah";
 arti: string;
 deksripsi: string;
 audioFull: string;
}

export interface TafsirDetail {
   nomor: number;
 nama: string;
 namaLatin: string;
 jumlahAyat: number;
 tempatTurun: "mekah" | "madinah";
 arti: string;
 deksripsi: string;
 audioFull: string;
  tafsir: {
    _id: number;
    surah: string;
    ayat: number;
    tafsir: string;
  }
};



export interface ayatDetail {
 nomor: number;
 nama: string;
 namaLatin: string;
 jumlahAyat: number;
 tempatTurun: "mekah" | "madinah";
 arti: string;
 deksripsi: string;
 audioFull: string;
 ayat: {
  nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: string;
 }[];
}