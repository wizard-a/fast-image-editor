import request from '@/utils/request';

export async function login(userName: string, pwd: string) {
  return request('/api/user/login', {
    data: {
      login_name: userName,
      pwd: pwd,
    },
    method: 'POST',
  });
}
