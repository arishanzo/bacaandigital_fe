import { fetchAPI } from "../lib/api"
import {ayatDetail, FormDataSholat, jadwalSholat, Surah, TafsirDetail } from "../types"




export const getProvinsi = async (): Promise<string[]> => {
    const response = await fetchAPI<{data: string[]}>("/jadwalsholat/provinsi");
    return response.data;
}

export const postKabKota = async (provinsi: string): Promise<string[]> => {
    const response = await fetchAPI<{data: string[]}>('/jadwalsholat/kabkota', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ provinsi })
    });
    return response.data;
}


export const postJadwalSholat = async(formdataSholat: FormDataSholat): Promise<jadwalSholat> => {
    const response = await fetchAPI<{data: jadwalSholat}>('/jadwalsholat/shalat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdataSholat)
    });
    return response.data;
}
