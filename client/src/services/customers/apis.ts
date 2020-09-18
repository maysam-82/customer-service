import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
});

export async function getData<T>(url: string): Promise<T> {
    const response = await axiosInstance.get(url);
    return response.data;
}
