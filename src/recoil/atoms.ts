import { atom } from 'recoil';

// export interface IContentTypes {
//   id: number;
// }

// recoil state 생성
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
