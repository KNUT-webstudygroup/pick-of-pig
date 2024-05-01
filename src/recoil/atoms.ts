import { createMap } from '@/service/map';
import {
  atom, AtomEffect, selector, useSetRecoilState,
} from 'recoil';
import { recoilPersist } from 'recoil-persist';
// export interface IContentTypes {
//   id: number;
// }

// Next.js에서 persistAtom을 쓰기 위한 구성
export const ssrCompletedState = atom({
  key: 'SsrCompleted',
  default: false,
});
export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

const { persistAtom } = recoilPersist();

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

// recoil state 생성
// export const mapState = atom<google.maps.Map<HTMLElement>>({
//   key: 'mapState',
//   default: selector({
//     key: 'mapStateDefault',
//     get: () => createMap(), // createMap 함수를 호출하여 초기값 설정
//   }),
// });
// google map은 서버에서, 혹은 자체적으로 불러오는 class가 아님.
// HTML문서를 통해 Link해야 가능한 사항.
// 따라서, createMap으로 google.map을 호출할 시 에러가 발생함.

export const categoryList = atom<string[]>({
  key: 'category',
  default: [],
});
// 표현과 검색 값 분리
export type CategoryType = {
  display: string; // 유저한테 보여지는 값
  value: string; // 실제 검색 값
};
export const optionList = atom<CategoryType[]>({
  key: 'options',
  default: [],
});

export const searchAddressState = atom<string>({
  key: 'searchAddress',
  default: '',
});

export const searchClickState = atom<boolean>({
  key: 'searchClick',
  default: false,
});

// oauth2.0 key 보관.
export const oauth2Key = atom<string>({
  key: 'oauth',
  default: undefined,
});
