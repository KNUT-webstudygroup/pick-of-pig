import styled from 'styled-components';
import Image from 'next/image';
import { IconContainerProps } from '@/types/icon.interface';

function IconContainer({
  width = 40,
  height = 40,
  text,
  iconPath,
  iconColor,
  onClick = 'NULL',
}: IconContainerProps) {
  return (
    <IconContainerStyled onClick={onClick}>
      <Image
        src={iconPath}
        alt={`${text} icon`}
        width={width}
        height={height}
        style={{ fill: iconColor }}
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
  // cursor: pointer;
`;

export default IconContainer;
