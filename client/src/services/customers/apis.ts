import axios from 'axios';

export async function getData<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
}

export async function deleteData(url: string) {
    const response = await axios.delete(url);
    return response.data;
}

export async function postData<T>(url: string, data: T): Promise<T> {
    const response = await axios.post<T>(url, data);
    return response.data;
}

export async function editData<T>(url: string, data: T): Promise<T> {
    const response = await axios.put<T>(url, data);
    return response.data;
}
