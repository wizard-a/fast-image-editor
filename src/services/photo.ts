import request from '@/utils/request';

/**
 *
 * @param pageIndex
 * @param pageSize
 * @param source 1 为系统 2为个人
 * @returns
 */
export async function getPage(
  pageIndex: number,
  pageSize: number,
  source: 1 | 2 = 1,
) {
  return request('/api/upload/getPage', {
    params: {
      pageIndex,
      pageSize,
      source,
    },
    method: 'GET',
  });
}
