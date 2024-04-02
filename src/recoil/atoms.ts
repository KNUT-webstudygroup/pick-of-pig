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
export const mapState = atom<google.maps.Map<HTMLElement>>({
  key: 'mapState',
  default: selector({
    key: 'mapStateDefault',
    get: () => createMap(), // createMap 함수를 호출하여 초기값 설정
  }),
});

export const categoryList = atom<string[]>({
  key: 'category',
  default: [],
});

export const optionList = atom<string[]>({
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
