import { atom } from "recoil";

// export interface IContentTypes {
//   id: number;
// }

// recoil state 생성
export const categoryList = atom<string[]>({
  key: "category",
  default: [],
});

export const optionList = atom<string[]>({
  key: "options",
  default: [],
});

export const searchAddressState = atom<string>({
  key: "searchAddress",
  default: "",
});

export const searchClickState = atom<boolean>({
  key: "searchClick",
  default: false,
});
