import { request } from 'umi';

async function MyRequest(url: string, options: any) {
  const result = await request(url, options);
  console.log('result', result);
  if (result) {
    return result.data;
  }
  return null;
}

export default MyRequest;
