import { fetchAPI } from "../lib/api"
import { FormDataImsyakiyah, jadwalImsakiyah } from "../types"




export const getProvinsi = async (): Promise<string[]> => {
    const response = await fetchAPI<{data: string[]}>("/jadwalimsakiyah/provinsi");
    return response.data;
}

export const postKabKota = async (provinsi: string): Promise<string[]> => {
    const response = await fetchAPI<{data: string[]}>('/jadwalimsakiyah/kabkota', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ provinsi })
    });
    return response.data;
}


export const postJadwalImsakiyah = async(formdataImsakiyah: FormDataImsyakiyah): Promise<jadwalImsakiyah> => {
    const response = await fetchAPI<{data: jadwalImsakiyah}>('/jadwalimsakiyah/imsakiyah', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdataImsakiyah)
    });
    return response.data;
}
