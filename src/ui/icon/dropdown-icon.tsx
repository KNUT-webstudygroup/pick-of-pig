import IconContainer from "@/ui/icon/icon.container";

interface DropdownIconProps {
  onClick: () => void;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ onClick }) => (
  // TODO: show info modal
  <IconContainer
    width={60}
    height={60}
    iconPath="/dropdown.svg"
    // iconColor="var(--light-gray)"
    text="delete"
    onClick={onClick}
  />
);
export default DropdownIcon;
