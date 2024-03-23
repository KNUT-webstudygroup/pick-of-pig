import IconContainer from '@/ui/icon/icon.container';

interface SearchBarIconProps {
  moveBasket: () => void;
}

const ShopIcon: React.FC<SearchBarIconProps> = ({ moveBasket }) => (
  <IconContainer
    width={50}
    height={50}
    iconPath="/shop.svg"
    iconColor=""
    text="pig"
    onClick={moveBasket}
  />
);

export default ShopIcon;
