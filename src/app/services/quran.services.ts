
import { fetchAPI } from "../lib/api"
import {ayatDetail, Surah, TafsirDetail } from "../types"

export const getAllSurah = async (): Promise<Surah[]> => {
    const response = await fetchAPI<{data: Surah[]}>("/quran/surahs");
    return response.data;
}

export const getBySurah = async(nomor: number): Promise<ayatDetail> => {
    const response = await fetchAPI<{data: ayatDetail}>(`/quran/surah/${nomor}`);
    return response.data;
}

export const getTafsir = async(nomor: number): Promise<TafsirDetail> => {
    const respone = await fetchAPI<{data: TafsirDetail}>(`/quran/surah/tafsir/${nomor}`)
    return respone.data;
}