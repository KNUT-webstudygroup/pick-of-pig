import IconContainer from '@/ui/icon/icon.container';

interface RandomIconProps {
  openModal: () => void;
}

const RandomIcon: React.FC<RandomIconProps> = ({ openModal }) => (
  <IconContainer
    width={60}
    height={60}
    iconPath="/random.svg"
    // iconColor="var(--light-gray)"
    text="delete"
    onClick={openModal}
  />
);

export default RandomIcon;
