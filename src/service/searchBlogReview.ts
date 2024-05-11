import axios from 'axios';

const CLINET_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
const CLINET_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;

const getHtml = async (storeName: string, address: string) => {
  // 네이버 API를 활용하는 방법
  try {
    const response = await axios.get('/v1/search/blog.json', {
      params: {
        query: `${storeName}+${address}`,
        sort: 'sim', // 검색 결과 정렬 방법(sim: 정확도 순)
        display: 10, // 한 번에 표시할 검색 결과
      },
      headers: {
        'X-Naver-Client-Id': CLINET_ID,
        'X-Naver-Client-Secret': CLINET_PW,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`크롤링 에러${error}`);
  }
};

export default async function searchBlogReview(storeName: string, address: string) {
  const data = await getHtml(storeName, address);
  console.log(data.items);
}
