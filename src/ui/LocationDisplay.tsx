import { currentAddressState } from "@/recoil/atoms";
import CurrentLocationIcon from "@/ui/icon/current-location-icon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useEffect } from "react";

const LocationDisplay = () => {
  const currentAddress = useRecoilValue(currentAddressState);
  useEffect(() => {
    console.log("currentAddress", currentAddress);
  }, [currentAddress]);

  return (
    <HeaderStyled>
      <AddressContainer>{currentAddress}</AddressContainer>
      <IconContainer>
        <CurrentLocationIcon />
      </IconContainer>
    </HeaderStyled>
  );
};
export default LocationDisplay;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // position: fixed;
  // top: 150px;
  // right: 20px;
  width: 240px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  background-color: #ffb9b4;
  color: #3a3a3a;
  z-index: 1;
  padding: 10px 15px;
`;

const AddressContainer = styled.div`
  white-space: nowrap; // 텍스트를 한 줄로 표시
  overflow: hidden; // 내용이 넘칠 경우 숨김
  text-overflow: ellipsis; // 내용이 넘칠 경우 생략 부호(...) 표시
  flex-grow: 1;
`;

const IconContainer = styled.div`
  padding-left: 10px; // 아이콘과 텍스트 사이에 간격 추가
`;
