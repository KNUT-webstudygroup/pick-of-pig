import IconContainer from '@/ui/icon/icon.container';

interface ListIconProps {
  openLeftNav: () => void;
}

const ListIcon: React.FC<ListIconProps> = ({ openLeftNav }) =>
  // TODO: show info modal
  (
    <IconContainer
      width={60}
      height={60}
      iconPath="/list.svg"
      // iconColor="var(--light-gray)"
      text="delete"
      onClick={openLeftNav}
    />
  );
export default ListIcon;
