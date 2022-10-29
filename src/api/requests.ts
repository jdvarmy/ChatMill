import requests from './api';

export const fetchRequest = () => requests.get<any>(`some/get/url`);
export const postRequest = (data: any) => requests.post<any>(`some/post/url`, data);
export const putRequest = (data: any) => requests.put<any>(`some/put/url`, data);
export const deleteRequest = (uid: string) => requests.delete<boolean>(`some/delete/url/${uid}`);
