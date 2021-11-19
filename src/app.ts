import { RequestConfig, history } from 'umi';
import { getToken } from '@/utils/util';

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      // console.log('resData', resData);
      // if (resData.toString() !== '[object Object]') {
      //   // history.push('/login');
      //   // window.location.reload();
      //   return {
      //     success: false,
      //     errorMessage: '后台错误！'
      //   }
      // }
      return {
        success: resData.code === 0,
        errorMessage: resData.message,
      };
    },
  },
  requestInterceptors: [
    (url: string, options: Record<string, any>) => {
      const token = getToken();
      options.headers.Authorization = token;
      return {
        url,
        options,
      };
    },
  ],
  // parseResponse: false,
  // getResponse: true,
  // responseInterceptors: [
  //   (response, options) => {
  //     console.log('responseInterceptors', response,options);
  //     return {
  //       data: 1
  //     };
  //   }
  // ]
};
