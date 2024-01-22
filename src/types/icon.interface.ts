/**
 * @description - icon 인터페이스
 * @param {string} width - 아이콘 너비
 * @param {string} height - 아이콘 높이
 * @param {string} iconPath - 아이콘 경로
 * @param {string} iconColor - 아이콘 색상
 * @param {string} text - 아이콘 글자 - alt속성 고랴
 */

export interface IconContainerProps {
  width?: number;
  height?: number;
  iconPath: string;
  iconColor?: string;
  text?: string;
  onClick: () => void;
}
