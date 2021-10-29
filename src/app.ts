import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      // console.log('resData', resData);
      return {
        success: resData.code === 0,
        errorMessage: resData.message,
      };
    },
  },
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
