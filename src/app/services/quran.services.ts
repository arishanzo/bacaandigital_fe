
import { fetchAPI } from "../lib/api"
import {ayatDetail, Surah, tafsir, TafsirDetail } from "../types"

export const getAllSurah = async (): Promise<Surah[]> => {
    return await fetchAPI<Surah[]>("/surahs");
}

export const getBySurah = async(nomor: number): Promise<ayatDetail[]> => {
    return await fetchAPI<ayatDetail[]>(`/surah/${nomor}`);
}

export const getTafsir = async(nomor: number): Promise<TafsirDetail[]> => {
    return await fetchAPI<TafsirDetail[]>(`/surah/${nomor}/tafsir`)
}