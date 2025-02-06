// import { axiosInstance, axiosPrivate } from './axios.service';

export interface UserData {
  accessToken: string;
  role: string;
}

// export interface ApiResponse<T> {
//   data: T;
// }

// export async function updateUser(userId: string, formData: FormData): Promise<any> {
//   try {
//     const { data } = await axiosPrivate.put<ApiResponse<any>>(`/user/${userId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return data.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || error.response?.statusText);
//   }
// }

// export async function onBoardUser(formData: FormData): Promise<any> {
//   try {
//     const { data } = await axiosInstance.post<ApiResponse<any>>('/auth', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return data.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || error.response?.statusText);
//   }
// }

export const handleLoginSuccess = (userData: UserData): void => {
  localStorage.setItem('token', userData.accessToken);
  localStorage.setItem('role', userData.role);
};
