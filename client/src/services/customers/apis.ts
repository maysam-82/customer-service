import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
});

export async function getData<T>(url: string): Promise<T> {
    const response = await axiosInstance.get<T>(url);
    return response.data;
}

export async function deleteData(url: string) {
    const response = await axiosInstance.delete(url);
    return response.data;
}

export async function postData<T>(url: string, data: T): Promise<T> {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
}

export async function editData<T>(url: string, data: T): Promise<T> {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
}
