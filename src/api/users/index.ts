import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { instanceAxios, setAuthorizationToken, ResponseType } from 'api';
import { AuthUser, GetCurrentUser } from './models';

export const userApi = {
  auth(email: string, password: string, rememberMe: boolean) {
    return instanceAxios
      .post<ResponseType<AuthUser>>('/user/authentication', { email, password, rememberMe })
      .then((r) => {
        if (r.data.result != null) {
          localStorage.setItem('Authorization', r.data.result.token);
          setAuthorizationToken(r.data.result.token);
        }

        return r.data;
      });
  },
  getCurrentUser() {
    return instanceAxios.get<ResponseType<GetCurrentUser>>('/user/getCurrentUser').then((r) => {
      if (r.data.result !== null) {
        localStorage.setItem('Authorization', r.data.result.token);
        setAuthorizationToken(r.data.result.token);
      }

      return r.data;
    });
  },
  addUser(
    userName: string,
    email: string,
    password: string,
    avatarImage: UploadChangeParam<UploadFile> | undefined,
  ) {
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('email', email);
    formData.append('password', password);

    if (avatarImage !== undefined) {
      formData.append('avatarImage', avatarImage.file.originFileObj as Blob);
    }

    return instanceAxios
      .post<ResponseType>('/user/add', formData)
      .then(() => ({ success: true, errorMessage: '' }))
      .catch((error) => ({ success: false, errorMessage: error.response.data }));
  },
  subscribeToUser(userId: string) {
    return instanceAxios.put(`/user/subscribeUser?subscribedUserId=${userId}`);
  },
  unsubscribeUser(userId: string) {
    return instanceAxios.delete(`/user/unsubscribe?unsubscribedUserId=${userId}`);
  },
  updateUser(userName: string, description: string) {
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('description', description);

    return instanceAxios.put<ResponseType>('/user/update', formData);
  },
};

export * from './models';
