import styled from 'styled-components';
import Image from 'next/image';
import { IconContainerProps } from '@/types/icon.interface';

function IconContainer({
  width,
  height,
  text,
  iconPath,
  iconColor,
  onClick,
}: IconContainerProps) {
  return (
    <IconContainerStyled
      onClick={onClick}
      style={{ width, height }}
    >
      <img
        src={iconPath}
        alt={`${text} icon`}
        style={{ fill: iconColor, width: '100%', height: '100%' }}
      />
    </IconContainerStyled>
  );
}

const IconContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default IconContainer;
