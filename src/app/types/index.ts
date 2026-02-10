export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface Surah {
 nomor: number;
 nama: string;
 nama_latin: string;
 jumlah_ayat: number;
 tempat_turun: "mekah" | "madinah";
 arti: string;
 deksripsi: string;
 audio: string;
}

export interface tafsir {
    _id: number;
    surah: string;
    ayat: number;
    tafsir: string;
}

export interface TafsirDetail {
  status: boolean;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  tafsir: tafsir[]; // di sini type Tafsir dipakai
};



export interface ayatDetail {
nomor: number;
 nama: string;
 nama_latin: string;
 jumlah_ayat: number;
 tempat_turun: "mekah" | "madinah";
 arti: string;
 deksripsi: string;
 audio: string;
 status: boolean;
 ayat: {
  _id: number;
    surah: string;
    nomor: number;
    ar: string;
    tr: string;
    idn: string;
 }[];
}