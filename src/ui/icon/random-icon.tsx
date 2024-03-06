import IconContainer from '@/ui/icon/icon.container';

interface RandomIconProps {
  openRandom: () => void;
}

const RandomIcon: React.FC<RandomIconProps> = ({ openRandom }) => (
  <IconContainer
    width={60}
    height={60}
    iconPath="/random.svg"
      // iconColor="var(--light-gray)"
    text="delete"
    onClick={openRandom}
  />
);

export default RandomIcon;
